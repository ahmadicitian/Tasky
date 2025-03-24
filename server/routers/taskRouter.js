import express from "express";
import { validateRequest } from "../middlewares/validateData.js";

import {
    addTask, deleteTask, getTaskById,
    getTasks, updateTask
} from "../controllers/taskController.js";
import {
    createTaskValidation,
    updateTaskValidation
} from "../validations/taskValidation.js"

const taskRouter = express.Router();

taskRouter.post("/", validateRequest(createTaskValidation), addTask);
//http://localhost:8080/api/v1/task/?itemsPerPage=3
taskRouter.get("/", getTasks);
taskRouter.get("/:id", getTaskById);
taskRouter.put("/:id", validateRequest(updateTaskValidation), updateTask);
taskRouter.delete("/:id", deleteTask);

export default taskRouter;