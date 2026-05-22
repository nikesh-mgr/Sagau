import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoute.js";
import clientRoutes from "./routes/clientRoute.js";
import workerRoutes from "./routes/workerRoute.js";
import jobRoutes from "./routes/jobRoute.js";
import applicationRoutes from "./routes/applicationRoute.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

// SECURITY MIDDLEWARE
app.use(helmet());

// CORS
app.use(cors());

// BODY PARSER
app.use(express.json());

// COOKIE PARSER
app.use(cookieParser());

// LOGGER
app.use(morgan("dev"));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// HEALTH CHECK
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Sagau API Running",
  });
});

// ERROR MIDDLEWARE
app.use(errorMiddleware);

export default app;
