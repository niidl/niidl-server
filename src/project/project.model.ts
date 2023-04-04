import { db } from '../utils/db.server';

type Project = {
  id: number;
  project_name: string;
  description: string;
  github_url: string;
  owner: any;
  project_image: string;
  project_type: string;
};

export async function getAll(): Promise<object[]> {
  return db.projects.findMany({
    select: {
      id: true,
      project_name: true,
      project_image: true,
      tags: true,
    },
  });
}

export async function getProjectById(id: number): Promise<any> {
  return db.projects.findUnique({
    select: {
      id: true,
      project_name: true,
      description: true,
      github_url: true,
      owner: true,
      project_image: true,
      project_type: true,
      tags: {
        select: {
          id: true,
          tag_name: true,
        },
      },
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

export async function create(payload: Omit<Project, 'id'>): Promise<any> {
  return db.projects.create({
    data: payload,
    select: {
      id: true,
    },
  });
}

export async function update(payload: object, id: number): Promise<Project> {
  return db.projects.update({
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
    where: {
      id: id,
    },
  });
}

export async function deleteById(id: number): Promise<Project> {
  return db.projects.delete({
    where: {
      id: id,
    },
  });
}

export async function idWithURL(url: string): Promise<{ id: number } | null> {
  return db.projects.findUnique({
    where: {
      github_url: url,
    },
    select: {
      id: true,
    },
  });
}
