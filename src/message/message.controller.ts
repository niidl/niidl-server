import * as messageModel from './message.model';
import * as authModel from '../auth/auth.model';
import { Request, Response } from 'express';

interface User {
  user_name: string;
  github_profile_picture: string;
}

interface Message {
  id: number;
  content: string;
  user_id: string;
  thread_id: number;
  creation_time: Date;
  user: User;
  upvotes: number;
  upvotes_messages: number | any;
}

export async function index(req: Request, res: Response) {
  try {
    const threadId: number = parseInt(req.params.threadId);
    const allMessagesByThreadId: Message[] =
      await messageModel.getMessagesByThreadId(threadId);

    allMessagesByThreadId.forEach((message: Message) => {
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
    const userNameObj: { user_name: string } = req.cookies;
    const userNameCookie: string = userNameObj.user_name;

    const authUsernameObj = await authModel.getIdWithToken(sessionId);
    const authUsername = authUsernameObj?.user_name;

    if (authUsername !== userNameCookie) {
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
    const userNameObj: { user_name: string } = req.cookies;
    const userNameCookie: string = userNameObj.user_name;

    const authObj = await authModel.getIdWithToken(sessionId);
    const ghuid = authObj?.id;
    const authUsername = authObj?.user_name;

    if (!ghuid) {
      return res.status(404).send('Invalid Access Token');
    }
    if (authUsername !== userNameCookie) {
      return res.status(404).send('Invalid Access Token');
    }
    try {
      const messageId = parseInt(req.params.messageId);
      await messageModel.deleteById(messageId, ghuid);
      res.status(204).send();
    } catch (error: any) {
      try {
        const messageId = parseInt(req.params.messageId);
        const projOwnerFromMsg = await messageModel.projOwnerFromMsg(messageId);
        const projOwner = projOwnerFromMsg?.thread.project.owner;
        if (projOwner === ghuid) {
          await messageModel.deleteAsAdmin(messageId);
          res.status(204).send();
          return;
        }
      } catch (error: any) {
        res.status(500).send(error.message);
        return;
      }
      res.status(500).send(error.message);
    }
  } catch (error: any) {
    res.status(404).send(error.message);
  }
}
