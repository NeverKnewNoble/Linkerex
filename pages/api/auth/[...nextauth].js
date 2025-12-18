import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connectDB from "../../../lib/mongodb"; // Import centralized connection
import User from "../../../models/User"; // Import your User model

// Enhanced error handler to ensure JSON responses
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate credentials exist - NextAuth requires both fields
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Connect to MongoDB
          await connectDB();

          // Find the user in the database
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            return null; // Return null for invalid credentials (NextAuth best practice)
          }

          // Compare passwords
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) {
            return null; // Return null for invalid credentials (NextAuth best practice)
          }

          // Return user object on successful login
          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            account_type: user.account_type || "student",
            company_name: user.companyName,
            company_location: user.companyLocation,
          };
        } catch (err) {
          console.error("Authorize error:", err.message);
          return null; // Return null on error (prevents JSON parse errors)
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Updated to match actual login page
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-change-in-production",
  session: {
    strategy: "jwt", // Use JWT for sessions
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Attach user data to token when user signs in
      if (user) {
        token.user = {
          id: user.id,
          username: user.username,
          email: user.email,
          account_type: user.account_type,
          company_name: user.company_name,
          company_location: user.company_location,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Attach user data from token to session
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});

export default handler;
