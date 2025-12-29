import http from "http";
import app from "./app.js";
import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8080;
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: process.env.ALLOWED_ORIGIN?.split(",") ?? "*", methods: ["GET","POST","PATCH","DELETE"] }
});
app.set("io", io);

server.listen(port, () => console.log(`API listening on :${port}`));
