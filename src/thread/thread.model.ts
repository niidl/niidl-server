import { db } from '../utils/db.server';

interface Thread {
  id: number;
  content: string;
  project_id: number;
  user_id: string;
  creation_time: Date;
  title: string;
}

export async function getThreadsByProjectId(
  id: number
): Promise<Thread[] | null> {
  return db.threads.findMany({
    select: {
      id: true,
      content: true,
      project_id: true,
      project: {
        select: {
          project_name: true,
        },
      },
      user_id: true,
      user: {
        select: {
          user_name: true,
        },
      },
      creation_time: true,
      title: true,
    },
    where: {
      project_id: id,
    },
  });
}

export async function getSpecificThread(id: number): Promise<Thread | null> {
  return db.threads.findUnique({
    select: {
      id: true,
      content: true,
      project_id: true,
      user_id: true,
      user: {
        select: {
          user_name: true,
        },
      },
      creation_time: true,
      title: true,
    },
    where: {
      id: id,
    },
  });
}

export async function create(payload: Omit<Thread, 'id'>): Promise<Thread> {
  return db.threads.create({
    select: {
      id: true,
      content: true,
      project_id: true,
      user_id: true,
      creation_time: true,
      title: true,
    },
    data: payload,
  });
}
