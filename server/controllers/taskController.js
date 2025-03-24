import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorHandling.js";
import { Task } from "../models/taskSchema.js"

export const addTask = catchAsyncError(async (req, res, next) => {
    const { title, description, priority, createdAt } = req.body;

    //* Check if the task already exists
    const existingTask = await Task.findOne({ title });
    if (existingTask) {
        return next(new ErrorHandler("Task already exists", 400));
    }

    const addedTask = await Task.create({ title, description, priority, createdAt });
    res.status(200).json({
        success: true,
        message: "Task added!",
        task: addedTask
    });
});

export const getTasks = catchAsyncError(async (req, res, next) => {
    const { page = 1,
        itemsPerPage = 10,
        searchBy
    } = req.query;
    console.log("Search Query:", searchBy);
    //^ Calculate the number of items to skip based on the page and itemsPerPage
    const skip = (page - 1) * itemsPerPage;

    //^ Build the search filter
    const searchFilter = searchBy ? {
        $or: [
            { title: { $regex: searchBy, $options: 'i' } },
            { priority: { $regex: searchBy, $options: 'i' } },
        ]
    } : {};
    console.log("Search Filter:", searchFilter);

    const tasks = await Task.find(searchFilter).skip(skip)
        .limit(parseInt(itemsPerPage)).sort({ createdAt: -1 });

    //^ Count total tasks to calculate total pages
    const totalTasks = await Task.countDocuments(searchFilter);
    const totalPages = Math.ceil(totalTasks / itemsPerPage);

    res.status(200).json({
        success: true,
        message: "All Tasks!",
        tasks: tasks,
        currentPage: page,
        totalPages: totalPages
    });
});

export const getTaskById = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findById({ _id: id });
    if (!task)
        return next(new ErrorHandler("Task not found", 404));

    res.status(200).json({
        success: true,
        message: "Task detail!",
        task: task
    });

});

export const updateTask = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { title, description, priority, updatedAt, completed } = req.body;

    const task = await Task.findById({ _id: id });
    if (!task)
        return next(new ErrorHandler("Task not found", 404));

    const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title, description, priority, updatedAt, completed },
        { new: true }
    );

    return res.status(200).json({
        success: true,
        message: "Task updated!",
        task: updatedTask,
    });
});

export const deleteTask = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const task = await Task.findById({ _id: id });
    if (!task)
        return next(new ErrorHandler("Task not found", 404));

    await Task.deleteOne({ _id: id });

    res.status(200).json({
        success: true,
        message: "Task deleted successfully!",
    });
});