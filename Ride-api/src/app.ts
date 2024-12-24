import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnect from "./db/dbConnection";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);
dbConnect()
    .then(() => app.listen(process.env.PORT, () => console.log(`Server is running at http://localhost:${process.env.PORT}`)))
    .catch(error => console.log(`MONGODB CONNECTION FAILED!!!. `, error));