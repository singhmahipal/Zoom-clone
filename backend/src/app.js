import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager";

import cors from "cors";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8080);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

const start = async () => {
  app.set("mongo_user");
  const connectionDb = await mongoose.connect("");
  console.log(`MONGO Connected DB host: ${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("LISTEN ON PORT 8080");
  });
};

start();
