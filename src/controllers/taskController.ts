import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database/dataSource";
import { Task } from "../entity/Task";

const taskRepository = AppDataSource.getRepository(Task);

export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, startDate, endDate } = req.body;

    if (!name || name.length > 80) {
      res.status(400).json({ message: "Invalid task name" });
      return;
    }

    if (endDate && !startDate) {
      res.status(400).json({ message: "Start date is required if end date is provided" });
      return;
    }

    const task = taskRepository.create({ name, startDate, endDate });
    await taskRepository.save(task);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tasks = await taskRepository.find();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};