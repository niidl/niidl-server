import * as contributorModel from './contributor.model';
import * as authModel from '../auth/auth.model'
import { Request, Response } from 'express';

export async function index(req: Request, res: Response) {
  try {
    const projectId = parseInt(req.params.projectId);
    const allContributorsByProjectId =
      await contributorModel.getContributorsByProjectId(projectId);
    res.status(200).send(allContributorsByProjectId);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function view(req: Request, res: Response) {
  try {
    const contributorId = parseInt(req.params.contributorId);
    const specificContributor = await contributorModel.getSpecificContributor(
      contributorId
    );
    res.status(200).send(specificContributor);
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
      const { user_id, project_id } = req.body;
      const payload = {
        user_id,
        project_id,
      };

      await contributorModel.create(payload);
      res.status(201);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }catch (error: any) {
    res.status(404).send(error.message);
  }
}
