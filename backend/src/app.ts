import express from "express";
import cors from "cors";
import discoverRoutes from "./routes/discover.routes.js";

const app = express();

// Configure middleware for frontend requests.
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);

app.use(express.json());

// Check whether the backend server is running.
app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "COY Discover API is running.",
  });
});

// Register the three assignment APIs.
app.use("/", discoverRoutes);

export default app;
