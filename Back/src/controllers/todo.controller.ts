// src/controllers/todo.controller.ts
import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as todoService from '../services/todo.service';

export const create = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { title } = req.body;
  const todo = await todoService.createTodo(userId, title);
  res.json(todo);
};

export const getAll = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const todos = await todoService.getTodos(userId);
  res.json(todos);
};

export const update = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const todoId = req.params.id;
  const updated = await todoService.updateTodo(todoId, userId, req.body);
  res.json(updated);
};

export const remove = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const todoId = req.params.id;
  const deleted = await todoService.deleteTodo(todoId, userId);
  res.json(deleted);
};
