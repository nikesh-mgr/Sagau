import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import startJobScheduler from "./utils/jobScheduler.js";

import authRoutes from "./routes/authRoute.js";
import clientRoutes from "./routes/clientRoute.js";
import workerRoutes from "./routes/workerRoute.js";
import jobRoutes from "./routes/jobRoute.js";
import applicationRoutes from "./routes/applicationRoute.js";
import agreementRoutes from "./routes/agreementRoute.js";
import reviewRoutes from "./routes/reviewRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";
import notificationRoute from "./routes/notificationRoute.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Body parser
app.use(express.json());

// Cookies
app.use(cookieParser());

// Logger
app.use(morgan("dev"));

// ================= ROUTES =================

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/clients", clientRoutes);

app.use("/api/workers", workerRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/agreements", agreementRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/dashboard", dashboardRoute);

app.use("/api/notifications", notificationRoute);

// ================= ROOT =================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Sagau API Running",
  });
});

// ================= 404 =================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

// ================= ERROR =================

app.use(errorMiddleware);

// ================= JOB CLEANUP =================

// Start automatic job deletion scheduler
startJobScheduler();

export default app;
