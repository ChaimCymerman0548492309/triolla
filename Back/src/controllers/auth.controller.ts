// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const { sqlUser, token } = await AuthService.registerUser({ username, password });
    // const { mongoUser, sqlUser, token } = await AuthService.registerUser({ username, password });

    // שולח cookie עם JWT
    res.cookie('token', token, { httpOnly: true, maxAge: 3600 * 1000, sameSite: 'lax' });

    res.status(200).json({
      user: { _id: sqlUser.id, username: sqlUser.username, sqlId: sqlUser.id },
      // user: { _id: mongoUser._id, username: mongoUser.username, sqlId: sqlUser.id },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed', details: err });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const result = await AuthService.loginUser(username, password);

    if (!result) return res.status(401).json({ error: 'Invalid credentials' });

    // שולח cookie עם JWT
    res.cookie('token', result.token, { httpOnly: true, maxAge: 3600 * 1000 });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};
