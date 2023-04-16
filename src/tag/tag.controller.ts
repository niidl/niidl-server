import * as tagModel from './tag.model';
import * as authModel from '../auth/auth.model';
import { Request, Response } from 'express';

export async function index(req: Request, res: Response) {
  try {
    const projectUrl = req.params.projectId;
    const allTagsByProject = await tagModel.getAllTagsByProject(projectUrl);
    res.status(200).send(allTagsByProject);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function view(req: Request, res: Response) {
  try {
    const tagId = parseInt(req.params.tagId);
    const specificTag = await tagModel.getSpecificTag(tagId);
    res.status(200).send(specificTag);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function filter(req: Request, res: Response) {
  try {
    const filterTag = req.params.filterTag;
    const allProjectsByTag = await tagModel.getAllProjectsByTag(filterTag);
    res.status(200).send(allProjectsByTag);
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
      const payload = req.body;

      await tagModel.create(payload);
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
    const ghuid = await authModel.validateUser(sessionId);

    if (!ghuid) {
      return res.status(404).send('Invalid Access Token');
    }
    try {
      const allTagIds = req.body.allTagIds;
      await tagModel.deleteById(allTagIds);

      res.status(201).send('');
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  } catch (error: any) {
    res.status(404).send(error.message);
  }
}
