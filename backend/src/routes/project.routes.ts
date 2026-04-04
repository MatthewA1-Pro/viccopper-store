import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import * as projectController from '../controllers/project.controller';

const router = Router();

router.use(authenticate);

router.get('/',            projectController.getProjects);
router.post('/',           projectController.createProject);
router.get('/:id',         projectController.getProject);
router.post('/:id/tasks',  projectController.createTask);
router.patch('/tasks/:taskId', projectController.updateTask);

export default router;
