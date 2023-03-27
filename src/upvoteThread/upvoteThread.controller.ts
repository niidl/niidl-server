import * as upvoteModel from './upvoteThread.model';
import { Request, Response } from 'express';

export async function index(req: Request, res: Response) {
  try {
    const username = req.params.username;
    const projectId = parseInt(req.params.projectId);
    const allUpvotes = await upvoteModel.getUpvotes(projectId);

    if (allUpvotes[0]) {
      const userUpvotes = allUpvotes[0].upvotes_threads.filter(
        (upvote: any) => upvote.user_name === username
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
    const username = req.params.username;
    const projectId = parseInt(req.params.projectId);
    const threadId = parseInt(req.params.threadId);
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
}

export async function remove(req: Request, res: Response) {
  try {
    const upvoteId = parseInt(req.body.upvoteId);
    await upvoteModel.deleteById(upvoteId);

    res.status(200).send('');
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
