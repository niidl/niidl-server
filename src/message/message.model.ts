import { db } from '../utils/db.server';

type Message = {
  id: number;
  content: string;
  creation_time: Date;
  user_id: string;
  thread_id: number;
};

type UserId = {
  id: string;
};

export async function validateUser(sessionId: string): Promise<UserId | null> {
  return db.user_account.findUnique({
    where: {
      session_id: sessionId,
    },
    select: {
      id: true,
    },
  });
}

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
