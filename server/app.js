import express from "express";
import dotenv from 'dotenv';
import { config } from "dotenv";
import cors from 'cors';
import { connection } from "./db_Connection/connection.js";
import taskRouter from "./routers/taskRouter.js";
import { errorMiddleware } from "./middlewares/errorHandling.js";

export const app = express();
dotenv.config();
config({ path: "./config.env" });
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/task", taskRouter);

connection();
app.use(errorMiddleware);