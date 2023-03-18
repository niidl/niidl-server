import { db } from "../utils/db.server";

type Thread = {
  id: number;
  // content: string;
  // creation_time: Date;
  project_id: number;
  // title: string;
  // user_id: number;
};

export async function getThreadsByProjectId(
  id: number
): Promise<Thread[] | null> {
  return db.threads.findMany({
    where: {
      project_id: id,
    },
    select: {
      id: true,
      project_id: true,
    },
  });
}

export async function create(payload: Omit<Thread, "id">): Promise<Thread> {
  return db.threads.create({
    data: payload,
    select: {
      id: true,
      // content: true,
      // creation_time: true,
      project_id: true,
      // title: true,
      // user_id: true,
    },
  });
}
