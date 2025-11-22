import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { sequelize } from '../src/db/db';

import authRoutes from '../src/routes/auth.routes';
import todoRoutes from '../src/routes/todo.routes';

import { User } from '../src/models/user.model';
import { SqlUser } from '../src/models/user.sql.model';
import { Todo } from '../src/models/todo/todo.model';
import { SqlTodo } from '../src/models/todo/todo.sql.model';
import { extractUserFromCookie } from '../src/middlewares/auth.middleware';
import { Op } from 'sequelize';
import cookieParser from 'cookie-parser';

jest.setTimeout(30000);

const app = express();
app.use(cookieParser()); 


app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/todo', extractUserFromCookie, todoRoutes);

describe('Basic Auth + TODO E2E', () => {
  let mongoUserId = '';
  let sqlUserId = 0;
  let cookie = '';
const uniqueUsername = `test_${Date.now()}`;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!, { serverSelectionTimeoutMS: 8000 });
  await sequelize.authenticate();
  await sequelize.sync();

  // ניקוי נתונים קיימים
  await User.deleteMany({ username: { $regex: 'test_', $options: 'i' } });
  await SqlUser.destroy({ where: { username: { [Op.like]: 'test_%' } } });

  const uniqueUsername = `test_${Date.now()}`;

  // רישום
  const register = await request(app).post('/auth/register').send({
    username: uniqueUsername,
    password: '1234',
  });

  console.log('Register response:', register.status, register.body);

  mongoUserId = register.body.user._id;
  sqlUserId = register.body.user.sqlId;

  // לוגין
  const loginRes = await request(app).post('/auth/login').send({
    username: uniqueUsername,
    password: '1234',
  });

  console.log('Login response:', loginRes.status, loginRes.body);
  console.log('Login headers:', loginRes.headers['set-cookie']);

  cookie = loginRes.headers['set-cookie']?.[0] || '';

  // בדיקה שהקוקי תקין
  const testAuth = await request(app).get('/auth/me').set('Cookie', cookie);
  console.log('Auth test:', testAuth.status, testAuth.body);
});

  afterAll(async () => {
    if (mongoUserId) await User.findByIdAndDelete(mongoUserId);
    if (sqlUserId) await SqlUser.destroy({ where: { id: sqlUserId } });
    await Todo.deleteMany({});
    await SqlTodo.destroy({ where: {} });

    await mongoose.connection.close();
    await sequelize.close();
  });

  it('1) Create TODO using cookie JWT', async () => {
    const res = await request(app).post('/todo').set('Cookie', cookie).send({ title: 'My Task' });
    expect(res.statusCode).toBe(200);
    expect(res.body.mongoTodo.title).toBe('My Task');
  });

  it('2) Fail creating TODO with invalid cookie', async () => {
    const res = await request(app).post('/todo').set('Cookie', 'token=invalid').send({ title: 'Bad Task' });
    expect(res.statusCode).toBe(401);
  });
});
