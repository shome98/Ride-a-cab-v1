// import http from "http";
// http.createServer((req, res) => {
//     res.writeHead(200, { "content-type": "text/html; charset=UTF-8" })
//     res.write("<h1>Hello there</h1>");
//     res.write("<h2>changed again nodemon working check</h2>")
//     res.end();
// }).listen(4005, () => console.log(`app running at http://localhost:4005`));
// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dbConnect from "./db/dbConnection";
// import dotenv from "dotenv";
// import userRoutes from "./routes/user.routes";
// import captainRoutes from "./routes/captain.routes";
// const app = express();
// dotenv.config();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());
// app.use(cookieParser());
// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/captains", captainRoutes);
// dbConnect()
//     .then(() => app.listen(process.env.PORT, () => console.log(`Server is running at http://localhost:${process.env.PORT}`)))
//     .catch(error => console.log(`MONGODB CONNECTION FAILED!!!. `, error));
import http from "http";
import app from "./app";
import { initializeSocket } from "./socket";
const server = http.createServer(app);
initializeSocket(server);
server.listen(process.env.PORT, () => console.log(`Server is running at http://localhost:${process.env.PORT}`));
