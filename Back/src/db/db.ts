// src/db/db.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: (msg) => {
    if (msg.startsWith('Executing (default): SELECT') || msg.startsWith('Executing (default): ALTER TABLE')) return; // דילוג על SELECT ו-ALTER TABLE
    console.log(msg); // מדפיס INSERT/UPDATE/DELETE/ERROR
  },
});
