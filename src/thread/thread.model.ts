import { db } from '../utils/db.server';

interface Thread {
  id: number;
  content: string;
  project_id: number;
  user_id: string;
  creation_time: Date;
  title: string;
  thread_tag: string;
  upvotes: number;
  isPinned: boolean;
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
      thread_tag: true,
      isPinned: true,
      upvotes: true,
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
      thread_tag: true,
      isPinned: true,
      upvotes: true,
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
      thread_tag: true,
      isPinned: true,
      upvotes: true,
    },
    data: payload,
  });
}

export async function update(payload: object, id: number): Promise<Thread> {
  return db.threads.update({
    data: payload,
    select: {
      id: true,
      content: true,
      project_id: true,
      user_id: true,
      creation_time: true,
      title: true,
      thread_tag: true,
      isPinned: true,
      upvotes: true,
    },
    where: {
      id: id,
    },
  });
}

export async function deleteById(id: number): Promise<Thread> {
  return db.threads.delete({
    where: {
      id: id,
    },
  });
}
