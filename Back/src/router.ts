import { Router } from 'express';
import { Controller } from './controllers/todo.controller';
import { Service } from './services/todo.service';

const repo = new Service();
const controller = new Controller(repo);
const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
