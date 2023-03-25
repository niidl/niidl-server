import * as messageModel from './message.model';
import { Request, Response } from 'express';

export async function index(req: Request, res: Response) {
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

export async function view(req: Request, res: Response) {
  try {
    const messageId = parseInt(req.params.messageId);
    const specificMessage = await messageModel.getSpecificMessage(messageId);
    res.status(200).send(specificMessage);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function save(req: Request, res: Response) {
  try {
    const cookieObj: { sessionToken: string } = req.cookies;
    const sessionId: string = cookieObj.sessionToken;
    const ghuid = await messageModel.validateUser(sessionId);

    if (!ghuid) {
      return res.status(404).send('Invalid Access Token');
    }
    try {
      const { content, creation_time, thread_id } = req.body;
      const payload = {
        content,
        creation_time,
        user_id: ghuid.id,
        thread_id,
      };
      console.log(payload);
      await messageModel.create(payload);
      res.status(201).send('');
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  } catch (error: any) {
    res.status(404).send(error.message);
  }
}
