import * as threadModel from './thread.model';
import { Request, Response } from 'express';

export async function index(req: Request, res: Response) {
  try {
    const projectId = parseInt(req.params.projectId);
    const allThreadsByProjectId = await threadModel.getThreadsByProjectId(
      projectId
    );
    res.status(200).send(allThreadsByProjectId);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function view(req: Request, res: Response) {
  try {
    const threadId = parseInt(req.params.threadId);
    const specificThread = await threadModel.getSpecificThread(threadId);
    res.status(200).send(specificThread);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function save(req: Request, res: Response) {
  try {
    const { content, creation_time, project_id, title, user_id, thread_tag } =
      req.body;
    const payload = {
      content,
      creation_time,
      project_id,
      title,
      user_id,
      thread_tag,
      isPinned: false,
      upvotes: 0,
    };

    await threadModel.create(payload);
    res.status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
