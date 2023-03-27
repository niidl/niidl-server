import { db } from '../utils/db.server';

type Upvote = {
  user_name: string;
  thread_id: number;
  project_id: number;
};

export async function getUpvotes(projectId: number): Promise<any> {
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

export async function deleteById(upvoteId: number): Promise<Upvote> {
  return db.upvotes_threads.delete({
    where: {
      id: upvoteId,
    },
  });
}
