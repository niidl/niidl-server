import * as authModel from '../auth/auth.model';
import { Request, Response } from 'express';

export async function projectToOwner(req: Request, res: Response) {
  try {
    const projectId = parseInt(req.params.projectId);
    const username = req.params.username
    const checkReq = await authModel.validateProject(projectId, username);
    if (checkReq.length !== 0) {
      res.status(200).send(true);
    } else {
      res.status(200).send(false);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
