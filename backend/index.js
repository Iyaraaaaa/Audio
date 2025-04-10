import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";

// Routers
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import inquiryRouter from "./routes/inquiryRouter.js";
import orderRouter from "./routes/orderRouter.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Replaces body-parser

// JWT Middleware
app.use((req, res, next) => {
  let token = req.header("Authorization");
  if (token) {
    token = token.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.warn("Invalid token:", err.message);
      } else {
        req.user = decoded;
      }
      next(); // Always call next
    });
  } else {
    next();
  }
});

// MongoDB Connection
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/inquiries", inquiryRouter);
app.use("/api/orders", /*requireAuth,*/ orderRouter); // Uncomment `requireAuth` to protect

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down gracefully...");
  await mongoose.disconnect();
  server.close(() => {
    console.log("🚪 Server closed");
    process.exit(0);
  });
});
