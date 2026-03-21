import express from "express";
import helmet from "helmet";
import cors from "cors";
import projectsRoutes from "./routes/projects.js";
import skillsRoutes from "./routes/skills.js";
import blogsRoutes from "./routes/blogs.js";
import achievementsRoutes from "./routes/achievements.js";
import certificatesRoutes from "./routes/certificates.js";
import contactRoutes from "./routes/contact.js";
import chatRoutes from "./routes/chat.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const allowedOrigins = String(process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (process.env.NODE_ENV === "production" || process.env.RENDER === "true") {
  // Required behind Render's proxy so rate limiting can identify client IPs.
  app.set("trust proxy", 1);
}

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server and health checks without an Origin header.
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      const corsError = new Error("Not allowed by CORS");
      corsError.status = 403;
      return callback(corsError);
    }
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/projects", projectsRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/achievements", achievementsRoutes);
app.use("/api/certificates", certificatesRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);

app.use(errorHandler);

export default app;
