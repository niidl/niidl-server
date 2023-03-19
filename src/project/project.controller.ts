import * as projectModel from './project.model';
import { Request, Response } from 'express';

export async function index(req: Request, res: Response) {
  try {
    const allProjects = await projectModel.getAll();
    res.status(200).send(allProjects);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function view(req: Request, res: Response) {
  try {
    const projectId = parseInt(req.params.projectId);
    const specificProject = await projectModel.getProjectById(projectId);
    res.status(200).send(specificProject);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function save(req: Request, res: Response) {
  try {
    const {
      project_name,
      description,
      github_url,
      owner,
      project_image,
      project_type,
    } = req.body;
    const payload = {
      project_name,
      description,
      github_url,
      owner,
      project_image,
      project_type,
    };

    await projectModel.create(payload);
    res.status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
