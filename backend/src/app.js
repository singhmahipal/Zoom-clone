import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

console.log("🔍 Environment Check:");
console.log("MONGO_URL:", process.env.MONGO_URL ? "✅ Loaded" : "❌ MISSING");
console.log("PORT:", process.env.PORT || "8080 (default)");

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8080);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error(
        "❌ MONGO_URL not found!\n" +
        "Make sure .env file exists in: " + path.join(__dirname, "../.env")
      );
    }

    app.set("mongo_user");
    const connectionDb = await mongoose.connect(process.env.MONGO_URL);
    console.log(`✅ MONGO Connected DB host: ${connectionDb.connection.host}`);
    
    server.listen(app.get("port"), () => {
      console.log(`✅ Server running on http://localhost:${app.get("port")}`);
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

start();