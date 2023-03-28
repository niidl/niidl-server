import { db } from '../utils/db.server';

type Tag = {
  id: number;
  tag_name: string;
  github_url: string;
};

export async function getAllTagsByProject(github_url: string): Promise<Tag[]> {
  return db.tags.findMany({
    select: {
      id: true,
      tag_name: true,
      github_url: true,
    },
    // where: {
    //   github_url: github_url,
    // },
  });
}

export async function getSpecificTag(id: number): Promise<Tag | null> {
  return db.tags.findUnique({
    where: {
      id: id,
    },
  });
}

export async function getAllProjectsByTag(tag: string): Promise<Tag[]> {
  return db.tags.findMany({
    select: {
      id: true,
      tag_name: true,
      github_url: true,
      project: true,
    },
    where: {
      tag_name: tag,
    },
  });
}

export async function create(payload: any): Promise<any> {
  return db.tags.createMany({
    data: payload,
  });
}

export async function deleteById(allIds: number[]): Promise<any> {
  return db.tags.deleteMany({
    where: {
      id: {
        in: allIds,
      },
    },
  });
}
