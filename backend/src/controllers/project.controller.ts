import { Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { AuthRequest } from '../middleware/authenticate';
import { AppError } from '../middleware/errorHandler';
import { z } from 'zod';

const projectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
});

const taskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).default('TODO'),
});

export const getProjects = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.user!.id },
      include: { _count: { select: { tasks: true } } },
      orderBy: { updatedAt: 'desc' },
    });
    res.json({ projects });
  } catch (err) {
    next(err);
  }
};

export const createProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = projectSchema.parse(req.body);
    const project = await prisma.project.create({
      data: {
        ...data,
        userId: req.user!.id,
      },
    });
    res.status(201).json({ project });
  } catch (err) {
    next(err);
  }
};

export const getProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await prisma.project.findFirst({
      where: { id: req.params.id, userId: req.user!.id },
      include: { tasks: true },
    });
    if (!project) throw new AppError('Project not found', 404);
    res.json({ project });
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id: projectId } = req.params;
    const data = taskSchema.parse(req.body);

    const project = await prisma.project.findFirst({
      where: { id: projectId, userId: req.user!.id },
    });
    if (!project) throw new AppError('Project not found', 404);

    const task = await prisma.task.create({
      data: {
        ...data,
        projectId,
      },
    });
    res.status(201).json({ task });
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;
    const data = taskSchema.partial().parse(req.body);

    const task = await prisma.task.findFirst({
      where: { id: taskId, project: { userId: req.user!.id } },
    });
    if (!task) throw new AppError('Task not found', 404);

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data,
    });
    res.json({ task: updatedTask });
  } catch (err) {
    next(err);
  }
};
