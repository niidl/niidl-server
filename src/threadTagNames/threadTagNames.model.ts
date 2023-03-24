import { db } from '../utils/db.server';

type threadTagName = {
  thread_tag_name: string;
};

export async function getAllThreadTags(): Promise<threadTagName[]> {
  return db.thread_tags.findMany({
    select: {
      thread_tag_name: true,
    },
  });
}
