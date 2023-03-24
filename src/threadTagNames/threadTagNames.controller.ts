import * as threadTagNameModel from './threadTagNames.model';
import { Request, Response } from 'express';

export async function index(req: Request, res: Response) {
  try {
    const allThreadTagNames = await threadTagNameModel.getAllThreadTags();
    res.status(200).send(allThreadTagNames);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
