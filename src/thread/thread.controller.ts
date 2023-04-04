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
    specificThread.upvotes_threads = specificThread.upvotes_threads.length;

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
      const user_id = ghuid.id;
      const { content, creation_time, project_id, title, thread_tag } =
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
      console.log(payload);
      await threadModel.create(payload);
      res.status(201).send();
      return;
    } catch (error: any) {
      res.status(401).send(error.message);
      return;
    }
  } catch (error: any) {
    res.status(403).send(error.message);
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
      const payload = req.body;
      const threadId = parseInt(req.params.threadId);

      await threadModel.update(payload, threadId);
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
      const threadId = parseInt(req.params.threadId);
      await threadModel.deleteById(threadId, ghuid);
      res.status(204).send();
    } catch (error: any) {
      try {
        const threadId = parseInt(req.params.threadId);
        const projOwner = await threadModel.projOwnerFromThread(threadId);
        if (projOwner === ghuid) {
          await threadModel.deleteAsAdmin(threadId);
          res.status(204).send();
          return;
        }
      } catch (error: any) {
        res.status(500).send(error.message);
        return;
      }
      res.status(500).send(error.message);
      return;
    }
  } catch (error: any) {
    res.status(404).send(error.message);
  }
}
