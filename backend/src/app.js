import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route to check if the server is running
app.get("/", (req, res) => {
  res.send("SkillConnect API Running");
});

// Routes for authentication
app.use("/api/v1/auth", authRoutes);
export default app;
