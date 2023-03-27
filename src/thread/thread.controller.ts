import * as threadModel from './thread.model';
import * as authModel from '../auth/auth.model';
import { Request, Response } from 'express';

export async function index(req: Request, res: Response) {
  try {
    const projectId = parseInt(req.params.projectId);
    const allThreadsByProjectId = await threadModel.getThreadsByProjectId(
      projectId
    );

    allThreadsByProjectId.forEach((thread: any) => {
      thread.upvotes_threads = thread.upvotes_threads.length;
    });
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
    const cookieObj: { sessionToken: string } = req.cookies;
    const sessionId: string = cookieObj.sessionToken;
    const ghuid = await authModel.validateUser(sessionId);

    if (!ghuid) {
      return res.status(404).send('Invalid Access Token');
    }
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
      const payload = req.body;
      const threadId = parseInt(req.params.threadId);

      await threadModel.update(payload, threadId);
      res.status(201);
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
      const threadId = parseInt(req.params.threadId);
      await threadModel.deleteById(threadId, ghuid);

      res.status(201);
    } catch (error: any) {
      try {
        const threadId = parseInt(req.params.threadId);
        const adminObj = await threadModel.confirmAdmin();
      } catch (error: any) {
        res.status(500).send(error.message);
      }
      res.status(500).send(error.message);
    }
  } catch (error: any) {
    res.status(404).send(error.message);
  }
}
