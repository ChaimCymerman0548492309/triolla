// import { Todo } from '../models/todo/todo.model';
import { SqlTodo } from '../models/todo/todo.sql.model';

interface TodoUpdate {
  title?: string;
  completed?: boolean;
}

export const createTodo = async (userId: string, title: string) => {
  // יוצרים ב-Mongo
  // const mongoTodo = await Todo.create({ title, userId });

  // יוצרים ב-SQL עם mongoId
  const sqlTodo = await SqlTodo.create({
    title,
    userId,
    // mongoId: mongoTodo._id.toString(),
  });

  return { 
    // mongoTodo, 
    sqlTodo };
};

export const getTodos = async (userId: string) => {
  // const mongoTodos = await Todo.find({ userId });
  const sqlTodos = await SqlTodo.findAll({ where: { userId } });
  return {
    //  mongoTodos,
      sqlTodos };
};

export const updateTodo = async (id: string, userId: string, update: TodoUpdate) => {
  console.log("🚀 ~ updateTodo ~ id:", id)
  // עדכון ב-Mongo
  // const mongoTodo = await Todo.findOneAndUpdate({ _id: id, userId }, update, { new: true });

  // עדכון ב-SQL לפי mongoId
  const sqlTodo = await SqlTodo.findOne({ where: { id: id } });
  if (sqlTodo) await sqlTodo.update(update);

  return {
    //  mongoTodo,
      sqlTodo };
};

export const deleteTodo = async (id: string, userId: string) => {
  // מחיקה ב-Mongo
  // const mongoTodo = await Todo.findOneAndDelete({ _id: id, userId });

  // מחיקה ב-SQL לפי mongoId
  const sqlTodo = await SqlTodo.findOne({ where: { id: id } });
  // const sqlTodo = await SqlTodo.findOne({ where: { mongoId: id } });
  if (sqlTodo) await sqlTodo.destroy();

  return { 
    // mongoTodo,
     sqlTodo };
};
