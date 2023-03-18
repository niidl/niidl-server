import { db } from "../utils/db.server";

type Message = {
  id: number;
  content: string;
  creation_time: Date;
  user_id: number;
  threads_id: number;
};

export async function getMessagesByThreadId(
  id: number
): Promise<Message[] | null> {
  return db.messages.findMany({
    where: {
      threads_id: id,
    },
    select: {
      id: true,
      content: true,
      user_id: true,
      threads_id: true,
      creation_time: true,
      user: {
        select: {
          user_name: true,
        },
      },
    },
  });
}

export async function create(payload: Omit<Message, "id">): Promise<Message> {
  return db.messages.create({
    data: payload,
    select: {
      id: true,
      content: true,
      creation_time: true,
      user_id: true,
      threads_id: true,
    },
  });
}
