// src/routes/todo.routes.ts
import { Router } from 'express';
import * as todoController from '../controllers/todo.controller';
import { extractUserFromCookie } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', extractUserFromCookie, todoController.create);
router.get('/', extractUserFromCookie, todoController.getAll);
router.put('/:id', extractUserFromCookie, todoController.update);
router.delete('/:id', extractUserFromCookie, todoController.remove);

export default router;
