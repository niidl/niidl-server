import { db } from '../utils/db.server';

type Project = {
  id: number;
  project_name: string;
  description: string;
  github_url: string;
  owner: string;
  project_image: string;
  project_type: string;
};

export async function getAll(): Promise<Project[]> {
  return db.projects.findMany({
    select: {
      id: true,
      project_name: true,
      description: true,
      github_url: true,
      owner: true,
      project_image: true,
      project_type: true,
    },
  });
}

export async function getProjectById(id: number): Promise<Project | null> {
  return db.projects.findUnique({
    select: {
      id: true,
      project_name: true,
      description: true,
      github_url: true,
      owner: true,
      project_image: true,
      project_type: true,
      tags: true,
      contributor: true,
      threads: true,
    },
    where: {
      id: id,
    },
  });
}

export async function getByFilterTag(
  filterTag: number
): Promise<Project[] | null> {
  return db.projects.findMany({
    where: {
      id: filterTag,
    },
  });
}

export async function create(payload: Omit<Project, 'id'>): Promise<Project> {
  return db.projects.create({
    data: payload,
    select: {
      id: true,
      project_name: true,
      description: true,
      github_url: true,
      owner: true,
      project_image: true,
      project_type: true,
    },
  });
}
