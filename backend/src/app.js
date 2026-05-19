import express from "express";

import cors from "cors";

import authRoutes from "./routes/authRoute.js";

const app = express();

// MIDDLEWARE
app.use(cors());

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);

export default app;
