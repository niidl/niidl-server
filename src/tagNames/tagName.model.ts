import { db } from '../utils/db.server';

type tagName = {
  tag_name: string;
};

export async function getAllTags(): Promise<tagName[]> {
  return db.taglibrary.findMany({
    select: {
      tag_name: true,
    },
  });
}
