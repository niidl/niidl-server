import * as tagModel from './tag.model';
import { Request, Response } from 'express';

export async function index(req: Request, res: Response) {
  try {
    const projectId = parseInt(req.params.projectId);
    const allTagsByProject = await tagModel.getAllTagsByProject(projectId);
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
    const { tag_name, project_id } = req.body;
    const payload = {
      tag_name,
      project_id,
    };

    await tagModel.create(payload);
    res.status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const tagId = parseInt(req.params.tagId);
    await tagModel.deleteById(tagId);

    res.status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
