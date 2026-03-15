import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start API server:", error);
  process.exit(1);
});
