import * as tagNameModel from './tagName.model';
import { Request, Response } from 'express';

export async function index(req: Request, res: Response) {
  try {
    const allTagNames = await tagNameModel.getAllTags();
    res.status(200).send(allTagNames);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
