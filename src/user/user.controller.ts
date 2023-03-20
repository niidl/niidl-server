import * as userModel from './user.model';
import { Request, Response } from 'express';

export async function view(req: Request, res: Response) {
  try {
    const uid = req.body.uid;
    const user = await userModel.getUser(uid);
    if (user) {
      res.status(200).send('Hello');
    } else {
      res.send('');
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
