import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connectDB from "../../../lib/mongodb"; // Import centralized connection
import User from "../../../models/User"; // Import your User model

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to MongoDB
        await connectDB();

        try {
          // Find the user in the database
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("User not found");
          }

          // Compare passwords
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid email or password");
          }

          // Return user object on successful login
          return { id: user._id, username: user.username, email: user.email, account_type: user.account_type, company_name: user.companyName, company_location: user.companyLocation };
          
        } catch (err) {
          console.error("Authorize error:", err.message);
          throw new Error("Login failed: " + err.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign_up", // Custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Use JWT for sessions
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user; // Attach user to token
      return token;
    },
    async session({ session, token }) {
      session.user = token.user; // Attach user to session
      return session;
    },
  },
});
