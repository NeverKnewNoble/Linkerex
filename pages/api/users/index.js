import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  await connectDB();

  try {
    if (req.method === "GET") {
      const users = await User.find();
      return res.status(200).json(users);
    }

    if (req.method === "POST") {
      // const { username, email, password, account_type, companyName, companyLocation } = req.body; //! With account type selection details 
      const { username, email, password } = req.body; 
    
      // if (!username || !email || !password || !account_type) {
      //   return res.status(400).json({ error: "Username, email, password, and account type are required" });
      // } //!With account type selection option
    
      if (!username || !email || !password ) {
        return res.status(400).json({ error: "Username, email, password, and account type are required" });
      }

      const newUser = await User.create({
        username,
        email,
        password, 
        //! Acounnt type options
        // account_type, 
        // companyName,
        // companyLocation,
      });
    
      return res.status(201).json(newUser);
    }
    

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error("❌ API Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
