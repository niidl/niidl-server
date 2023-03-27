import * as upvoteMessageModel from './upvoteMessage.model';
import { Request, Response } from 'express';

export async function index(req: Request, res: Response) {
  try {
    const username = req.params.username;
    const threadId = parseInt(req.params.threadId);
    const allUpvotes = await upvoteMessageModel.getUpvotes(threadId);

    if (allUpvotes[0]) {
      const userUpvotes = allUpvotes[0].upvotes_messages.filter(
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
    const messageId = parseInt(req.params.messageId);
    const threadId = parseInt(req.params.threadId);
    const payload = {
      user_name: username,
      message_id: messageId,
      thread_id: threadId,
    };
    await upvoteMessageModel.create(payload);

    res.status(200).send('');
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const username = req.params.username;
    const messageId = parseInt(req.params.messageId);
    await upvoteMessageModel.deleteById(username, messageId);

    res.status(200).send('');
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
