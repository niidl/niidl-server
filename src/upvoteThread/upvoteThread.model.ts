import { db } from '../utils/db.server';

type Upvote = {
  user_name: string;
  thread_id: number;
  project_id: number;
};

export async function getUpvotes(
  projectId: number
): Promise<{ upvotes_threads: Omit<Upvote, 'project_id'>[] }[]> {
  return db.projects.findMany({
    select: {
      upvotes_threads: {
        select: {
          user_name: true,
          thread_id: true,
        },
      },
    },
    where: {
      id: projectId,
    },
  });
}

export async function create(payload: Upvote): Promise<any> {
  return db.upvotes_threads.create({
    data: payload,
    select: {
      user_name: true,
      thread_id: true,
      project_id: true,
    },
  });
}

export async function deleteById(
  username: string,
  threadId: number
): Promise<any> {
  return db.upvotes_threads.deleteMany({
    where: {
      user_name: username,
      thread_id: threadId,
    },
  });
}
