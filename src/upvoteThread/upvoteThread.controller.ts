import * as upvoteModel from './upvoteThread.model';
import * as authModel from '../auth/auth.model';
import { Request, Response } from 'express';

type Upvote = {
  user_name: string;
  thread_id: number;
};

export async function index(req: Request, res: Response) {
  try {
    const username: string = req.params.username;
    const projectId: number = parseInt(req.params.projectId);
    const allUpvotes = await upvoteModel.getUpvotes(projectId);

    if (allUpvotes[0]) {
      const userUpvotes = allUpvotes[0].upvotes_threads.filter(
        (upvote: Upvote) => upvote.user_name === username
      );
      res.status(200).send(userUpvotes);
    } else {
      res.status(200).send([]);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function upvote(req: Request, res: Response) {
  try {
    const cookieObj: { sessionToken: string } = req.cookies;
    const sessionId: string = cookieObj.sessionToken;
    const ghuid = await authModel.validateUser(sessionId);

    if (!ghuid) {
      return res.status(404).send('Invalid Access Token');
    }
    try {
      const username: string = req.params.username;
      const projectId: number = parseInt(req.params.projectId);
      const threadId: number = parseInt(req.params.threadId);
      const payload = {
        user_name: username,
        project_id: projectId,
        thread_id: threadId,
      };
      await upvoteModel.create(payload);

      res.status(200).send('');
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
    const ghuid = await authModel.validateUser(sessionId);

    if (!ghuid) {
      return res.status(404).send('Invalid Access Token');
    }
    try {
      const username: string = req.params.username;
      const threadId: number = parseInt(req.params.threadId);
      await upvoteModel.deleteById(username, threadId);

      res.status(200).send('');
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  } catch (error: any) {
    res.status(404).send(error.message);
  }
}
