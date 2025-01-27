import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";

dotenv.config(); // Configure environment variables
connectDB(); // Connect to MongoDB

const _dirname = path.resolve(); // Fix for ES module
const app = express(); // Initialize express app

// Middleware
app.use(cors({ origin: "https://ecom-25.onrender.com/", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Serve React frontend
app.use(express.static(path.join(_dirname, "/client/build")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
});

// Default route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
