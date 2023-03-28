import * as projectTypesModel from './projectTypes.model';
import { Request, Response } from 'express';

export async function index(req: Request, res: Response) {
  try {
    const allProjectTypes = await projectTypesModel.getAllProjectTypes();
    res.status(200).send(allProjectTypes);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
