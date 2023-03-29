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

export async function getThreadsByProjectId(id: number): Promise<Thread[]> {
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
      upvotes_threads: true,
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

export async function deleteById(
  threadId: number,
  ghuid: string
): Promise<Thread> {
  return db.threads.delete({
    where: {
      composite_user_id: {
        id: threadId,
        user_id: ghuid,
      },
    },
  });
}

export async function deleteAsAdmin(threadId: number): Promise<Thread> {
  return db.threads.delete({
    where: {
      id: threadId,
    },
  });
}

export async function projOwnerFromThread(threadId: number) {
  const thread = await db.threads.findUnique({
    where: { id: threadId },
    include: { project: true },
  });
  if (!thread) {
    return null;
  }
  const project = thread.project;
  const owner = await db.user_account.findUnique({
    where: { id: project.owner },
  });
  if (!owner) {
    return null;
  }
  return thread.project.owner;
}
