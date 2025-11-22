// src/services/auth.service.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IUser, 
  // User
 } from '../models/user.model';
import { SqlUser } from '../models/user.sql.model';

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error('JWT_SECRET not defined');

export const registerUser = async (data: IUser) => {
  const hashed = await bcrypt.hash(data.password, 10);

  // const mongoUser = new User({ username: data.username, password: hashed });
  const sqlUser = await SqlUser.create({ username: data.username, password: hashed });
  const token = jwt.sign({ id: sqlUser.id.toString() }, JWT_SECRET, { expiresIn: '1h' });
  // const token = jwt.sign({ id: mongoUser._id.toString() }, JWT_SECRET, { expiresIn: '1h' });

  // await mongoUser.save();
  return {
    //  mongoUser, 
     sqlUser, token }; // חייבים להחזיר token
};

export const loginUser = async (username: string, password: string) => {
  // const mongoUser = await User.findOne({ username });
  const sqlUser = await SqlUser.findOne({ where: { username } });

  if (
    // !mongoUser || 
    !sqlUser) return null;

  const match = await bcrypt.compare(password, sqlUser.password);
  // const match = await bcrypt.compare(password, mongoUser.password);
  if (!match) return null;

  const token = jwt.sign({ id: sqlUser.id.toString() }, JWT_SECRET, { expiresIn: '1h' });
  // const token = jwt.sign({ id: mongoUser._id.toString() }, JWT_SECRET, { expiresIn: '1h' });

  return { user: { _id: sqlUser.id, username: sqlUser.username, sqlId: sqlUser.id }, token };
  // return { user: { _id: mongoUser._id, username: mongoUser.username, sqlId: sqlUser.id }, token };

};
