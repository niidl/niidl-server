import * as projectsModel from "./projects.model";
import { Request, Response } from "express";

export async function index(req: Request, res: Response) {
  const allProjects = await projectsModel.getAll();
  res.send(allProjects);
}

export async function view(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const specificProject = await projectsModel.getById(id);
  res.send(specificProject);
}

export async function save(req: Request, res: Response) {
  const { project_name, description, repo_url, owner } = req.body;
  const payload = {
    project_name,
    description,
    repo_url,
    owner,
  };

  await projectsModel.create(payload);
}
