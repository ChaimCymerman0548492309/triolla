import { Schema, model, Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  completed: boolean;
  userId: string;
}

const todoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true },
});

export const Todo = model<ITodo>('Todo', todoSchema);
