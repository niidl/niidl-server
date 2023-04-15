import { db } from '../utils/db.server';

type Tag = {
  id: number;
  tag_name: string;
};

type Thread = {
  id: number;
  content: string;
  upvotes_threads: object[];
  project_id: number;
  user_id: string;
  creation_time: Date;
  title: string;
  thread_tag: string;
  isPinned: boolean;
  upvotes: number;
  user: object;
};

type Project = {
  id: number;
  project_name: string;
  description: string;
  github_url: string;
  owner: any;
  project_image: string;
  project_type: string;
  tags: Tag[];
  contributor: object[];
  threads: Thread[];
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
      tags: {
        select: {
          id: true,
          tag_name: true,
        },
      },
      contributor: true,
      threads: {
        select: {
          id: true,
          content: true,
          upvotes_threads: true,
          project_id: true,
          user_id: true,
          creation_time: true,
          title: true,
          thread_tag: true,
          isPinned: true,
          upvotes: true,
          user: {
            select: {
              user_name: true,
            },
          },
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
): Promise<Omit<Project, 'tags' | 'contributor' | 'threads'>[] | null> {
  return db.projects.findMany({
    where: {
      id: filterTag,
    },
  });
}

export async function create(
  payload: Omit<Project, 'tags' | 'contributor' | 'threads' | 'id'>
): Promise<{ id: number }> {
  return db.projects.create({
    data: payload,
    select: {
      id: true,
    },
  });
}

export async function update(
  payload: object,
  id: number
): Promise<Omit<Project, 'tags' | 'contributor' | 'threads'>> {
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

export async function deleteById(
  id: number
): Promise<Omit<Project, 'tags' | 'contributor' | 'threads'>> {
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
