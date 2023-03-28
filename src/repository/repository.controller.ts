import * as repositoryModel from './repository.model';
import { Request, Response } from 'express';

export async function file(req: Request, res: Response) {
  try {
    const { newUrlFile, url, userRepo } = req.body;
    const fileData = await repositoryModel.getFile(newUrlFile, url, userRepo);
    res.status(200).send(fileData);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function folder(req: Request, res: Response) {
  try {
    const url = req.body.url;
    const folderData = await repositoryModel.getFolder(url);
    res.status(200).send(folderData);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
