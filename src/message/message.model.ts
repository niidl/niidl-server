import { db } from '../utils/db.server';

type Message = {
  id: number;
  content: string;
  creation_time: Date;
  user_id: string;
  thread_id: number;
  upvotes: number;
};

type UserId = {
  id: string;
};

type ProjAdmin = {
  projectId: number;
  userId: string;
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

export async function getMessagesByThreadId(id: number): Promise<any> {
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
      upvotes: true,
      upvotes_messages: true,
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
      upvotes: true,
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
      upvotes: true,
    },
    where: {
      id: id,
    },
  });
}

export async function deleteById(
  messageId: number,
  ghuid: string
): Promise<Message> {
  return db.messages.delete({
    where: {
      composite_user_id: {
        id: messageId,
        user_id: ghuid,
      },
    },
  });
}

export async function deleteAsAdmin(messageId: number): Promise<Message> {
  return db.messages.delete({
    where: {
      id: messageId,
    },
  });
}

export async function confirmAdmin(
  messageId: number
): Promise<ProjAdmin | null> {
  const thread = await db.threads.findFirst({
    where: {
      message: {
        some: {
          id: messageId,
        },
      },
    },
    include: {
      message: true,
    },
  });

  if (!thread) {
    return null;
  }

  const message = thread.message.find((msg) => msg.id === messageId);

  if (!message) {
    return null;
  }

  return {
    projectId: thread.project_id,
    userId: message.user_id,
  };
}
