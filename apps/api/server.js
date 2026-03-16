import dotenv from "dotenv";
import http from "http";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { attachChatSocket } from "./src/ws/chatSocket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  const server = http.createServer(app);
  attachChatSocket({ server });

  server.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start API server:", error);
  process.exit(1);
});
