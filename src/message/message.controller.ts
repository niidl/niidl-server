import * as messageModel from './message.model';
import { Request, Response } from 'express';

export async function view(req: Request, res: Response) {
  try {
    const threadId = parseInt(req.params.threadId);
    const allMessagesByThreadId = await messageModel.getMessagesByThreadId(
      threadId
    );
    res.status(200).send(allMessagesByThreadId);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function save(req: Request, res: Response) {
  try {
    const { content, creation_time, user_id, thread_id } = req.body;
    const payload = {
      content,
      creation_time,
      user_id,
      thread_id,
    };

    await messageModel.create(payload);
    res.status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
