import { db } from '../utils/db.server';

type Message = {
  id: number;
  content: string;
  creation_time: Date;
  user_id: string;
  thread_id: number;
};

export async function getMessagesByThreadId(
  id: number
): Promise<Message[] | null> {
  return db.messages.findMany({
    where: {
      thread_id: id,
    },
    select: {
      id: true,
      content: true,
      user_id: true,
      thread_id: true,
      creation_time: true,
      user: {
        select: {
          user_name: true,
        },
      },
    },
  });
}

export async function getSpecificMessage(id: number): Promise<Message | null> {
  return db.messages.findUnique({
    where: {
      id: id,
    },
  });
}

export async function create(payload: Omit<Message, 'id'>): Promise<Message> {
  return db.messages.create({
    data: payload,
    select: {
      id: true,
      content: true,
      creation_time: true,
      user_id: true,
      thread_id: true,
    },
  });
}

export async function update(payload: object, id: number): Promise<Message> {
  return db.messages.update({
    data: payload,
    select: {
      id: true,
      content: true,
      creation_time: true,
      user_id: true,
      thread_id: true,
    },
    where: {
      id: id,
    },
  });
}
