import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { sequelize } from './db/db';
import { extractUserFromCookie } from './middlewares/auth.middleware';
import authRoutes from './routes/auth.routes';
import todoRoutes from './routes/todo.routes';

dotenv.config();

const main = async () => {
  const app = express();

  app.use(express.json());

  app.use(helmet());
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  );

  // app.use(cors({ origin: '*', methods: 'GET,POST,PUT,DELETE' }));
  app.use(rateLimit({ windowMs: 60 * 1000, max: 60 }));
  app.use(cookieParser());

  // MongoDB connection
  // await mongoose
  //   .connect(process.env.MONGO_URI!, { serverSelectionTimeoutMS: 5000 })
  //   .then(() => console.log('MongoDB connected'))
  //   .catch((err) => console.error('MongoDB connection error:', err));

  // PostgreSQL connection
  await sequelize
    .authenticate()
    .then(() => sequelize.sync())
    .then(() => console.log('PostgreSQL connected'))
    .catch((err) => console.error('Sequelize connection error:', err));
  // await sequelize.sync({ alter: true });
  (async () => {
    await sequelize.sync({ alter: true });
  })();
  // Routes
  app.use('/auth', authRoutes);
  app.use('/todos', extractUserFromCookie, todoRoutes);
  // app.get('/protected', extractUserFromCookie, (req, res) => res.json({ data: 'OK' }));

  // Start server
  app.listen(process.env.PORT || 5000, () => console.log('Server running'));
};

main();
