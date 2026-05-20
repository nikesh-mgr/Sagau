import express from "express";

import cors from "cors";
import clientRoutes from "./routes/clientRoute.js";
import authRoutes from "./routes/authRoute.js";
import workerRoutes from "./routes/workerRoute.js";

const app = express();

// MIDDLEWARE
app.use(cors());

app.use(express.json());

// ROUTES

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/clients", clientRoutes);

export default app;
