import { db } from '../utils/db.server';

type Upvote = {
  user_name: string;
  thread_id: number;
  message_id: number;
};

export async function getUpvotes(
  threadId: number
): Promise<{ upvotes_messages: Omit<Upvote, 'thread_id'>[] }[]> {
  return db.threads.findMany({
    select: {
      upvotes_messages: {
        select: {
          user_name: true,
          message_id: true,
        },
      },
    },
    where: {
      id: threadId,
    },
  });
}

export async function create(payload: Upvote): Promise<Upvote> {
  return db.upvotes_messages.create({
    data: payload,
    select: {
      user_name: true,
      thread_id: true,
      message_id: true,
    },
  });
}

export async function deleteById(
  username: string,
  messageId: number
): Promise<any> {
  return db.upvotes_messages.deleteMany({
    where: {
      user_name: username,
      message_id: messageId,
    },
  });
}
