import { db } from "../utils/db.server";

type Project = {
  project_id: number;
  project_name: string;
  description: string;
  repo_url: string;
  owner: string;
};

export async function getAll(): Promise<Project[]> {
  return db.projects.findMany({
    select: {
      project_id: true,
      project_name: true,
      description: true,
      repo_url: true,
      owner: true,
    },
  });
}

export async function getById(id: number): Promise<Project | null> {
  return db.projects.findUnique({
    where: {
      project_id: id,
    },
  });
}

export async function getByFilterTag(
  filterTag: number
): Promise<Project | null> {
  return db.projects.findMany({
    where: {
      project_id: filterTag,
    },
  });
}

export async function create(
  payload: Omit<Project, "project_id">
): Promise<Project> {
  return db.projects.create({
    data: payload,
    select: {
      project_id: true,
      project_name: true,
      description: true,
      repo_url: true,
      owner: true,
    },
  });
}
