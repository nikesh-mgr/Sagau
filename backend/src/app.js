import express from "express";

import cors from "cors";

import authRoutes from "./routes/authRoute.js";

const app = express();

// MIDDLEWARE
app.use(cors());

app.use(express.json());

// ROUTES

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/auth", authRoutes);

export default app;
