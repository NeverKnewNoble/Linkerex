const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS middleware
require("dotenv").config(); // Load environment variables
// require("dotenv").config({ path: ".env.local" }); // Load .env.local file
const path = require("path"); //! call path



// ! Import Routes 
const userRoutes = require("./routes/UserRoutes");
const jobRoutes = require("./routes/JobRoutes");
const appliedJobRoutes = require("./routes/AppliedJobRoutes");



const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = 5000; // Port for Express server


// ! Function to connect to MongoDB
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if the database connection fails
  }
};


// ! Start the server
app.prepare()
  .then(async () => {
    console.log("Next.js app prepared");

    // Connect to MongoDB
    await connectDb();

    const server = express();

    // Enable CORS for all routes
    server.use(cors({
      origin: "http://localhost:3000", // Replace with your frontend URL
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true, // Allow cookies and authentication headers
    }));

    // Middleware to parse JSON requests
    server.use(express.json());

    // Middleware to log incoming requests
    server.use((req, res, next) => {
      console.log(`Incoming request: ${req.method} ${req.url}`);
      next();
    });


    //  Register the user routes
    server.use("/api/users", userRoutes);
    server.use("/api/jobs", jobRoutes); // Ensure this matches the imported name
    server.use("/api/applied", appliedJobRoutes);
  
    // Serve static files from the uploads directory
    server.use("/uploads", express.static(path.join(__dirname, "uploads")));


    // Handle all other routes with Next.js
    server.all("*", (req, res) => {
      return handle(req, res);
    });

    // Start listening on the specified port
    server.listen(PORT, (err) => {
      if (err) {
        console.error("Error starting the server:", err);
        throw err;
      }
      console.log(`> Express API ready on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during server initialization:", err);
    process.exit(1); // Exit if the server fails to initialize
  });
