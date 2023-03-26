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

export async function getAll(): Promise<object[]> {
  return db.projects.findMany({
    select: {
      id: true,
      project_name: true,
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

export async function getUpvotes(id: number): Promise<any> {
  return db.projects.findMany({
    select: {
      upvotes: {
        select: {
          user_name: true,
          thread_id: true,
        },
      },
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
