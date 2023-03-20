import { db } from '../utils/db.server';

type Tag = {
  id: number;
  tag_name: string;
  project_id: number;
};

export async function getAllTagsByProject(id: number): Promise<Tag[]> {
  return db.tags.findMany({
    select: {
      id: true,
      tag_name: true,
      project_id: true,
    },
    where: {
      project_id: id,
    },
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
      project_id: true,
      project: true,
    },
    where: {
      tag_name: tag,
    },
  });
}

export async function create(payload: Omit<Tag, 'id'>): Promise<Tag> {
  return db.tags.create({
    data: payload,
    select: {
      id: true,
      tag_name: true,
      project_id: true,
    },
  });
}
