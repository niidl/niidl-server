import * as messageModel from './message.model';
import * as authModel from '../auth/auth.model';
import { Request, Response } from 'express';

export async function index(req: Request, res: Response) {
  try {
    const threadId = parseInt(req.params.threadId);
    const allMessagesByThreadId = await messageModel.getMessagesByThreadId(
      threadId
    );
    allMessagesByThreadId.forEach((message: any) => {
      message.upvotes_messages = message.upvotes_messages.length;
    });

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
    const ghuid = await authModel.validateUser(sessionId);

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
        upvotes: 0,
      };
      await messageModel.create(payload);
      res.status(201).send('');
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  } catch (error: any) {
    res.status(404).send(error.message);
  }
}

export async function edit(req: Request, res: Response) {
  try {
    const cookieObj: { sessionToken: string } = req.cookies;
    const sessionId: string = cookieObj.sessionToken;
    const ghuid = await authModel.validateUser(sessionId);

    if (!ghuid) {
      return res.status(404).send('Invalid Access Token');
    }
    try {
      const { content } = req.body;
      const messageId = parseInt(req.params.messageId);
      const payload = {
        content,
      };

      await messageModel.update(payload, messageId);
      res.status(201).send('');
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  } catch (error: any) {
    res.status(404).send(error.message);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const cookieObj: { sessionToken: string } = req.cookies;
    const sessionId: string = cookieObj.sessionToken;
    const uid = await authModel.validateUser(sessionId);

    if (!uid) {
      return res.status(404).send('Invalid Access Token');
    }
    const ghuid = uid.id;
    try {
      const messageId = parseInt(req.params.messageId);
      await messageModel.deleteById(messageId, ghuid);
      res.status(201);
    } catch (error: any) {
      try {
        const messageId = parseInt(req.params.messageId);
        const adminObj = await messageModel.confirmAdmin(messageId);
        if (adminObj?.projectId === adminObj?.userId) {
          await messageModel.deleteAsAdmin(messageId);
        }
      } catch (error: any) {
        res.status(500).send(error.message);
      }
      res.status(500).send(error.message);
    }
  } catch (error: any) {
    res.status(404).send(error.message);
  }
}
