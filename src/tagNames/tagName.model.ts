import { db } from '../utils/db.server';

type tagName = {
  tag_name: string;
};

export async function getAllTags(): Promise<tagName[]> {
  return db.taglibrary.findMany({
    select: {
      tag_name: true,
    },
    where: {
      is_github: false
    }
  });
}

export async function getTagsOnly(): Promise<tagName[]>{
  return db.taglibrary.findMany({
    select: {
      tag_name: true
    },
    where: {
      is_language: false,
      is_github: false
    }
  })
}

export async function getLanguageOnly(): Promise<tagName[]>{
  return db.taglibrary.findMany({
    select: {
      tag_name: true
    },
    where: {
      is_language: true,
      is_github: false
    }
  })
}