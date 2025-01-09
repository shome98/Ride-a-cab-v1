import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnect from "./db/dbConnection.ts";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.ts";
import captainRoutes from "./routes/captain.routes.ts";
import mapRoutes from "./routes/map.routes.ts";
import rideRoutes from "./routes/ride.routes.ts";

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to api!!!");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/captains", captainRoutes);
app.use("/api/v1/maps", mapRoutes);
app.use("api/v1/rides", rideRoutes);

dbConnect()
    .then(()=>console.log("connected"))
    .catch(error => console.log(`MONGODB CONNECTION FAILED!!!. `, error));

export default app;