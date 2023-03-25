import { db } from '../utils/db.server';

type User = {
  id: string;
  first_name: string;
  last_name: string;
  github_url: string;
  email: string;
  user_name: string;
  session_id: string;
};

export async function getAllUsers(): Promise<object[]> {
  return db.user_account.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      github_url: true,
      email: true,
      user_name: true,
    },
  });
}

export async function getAllMessagesByUser(
  uid: string
): Promise<object[] | null> {
  return db.messages.findMany({
    select: {
      content: true,
      creation_time: true,
      thread: {
        select: {
          title: true,
        },
      },
    },
    where: {
      user_id: uid,
    },
  });
}

export async function getUser(uid: string): Promise<object | null> {
  return db.user_account.findUnique({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      github_url: true,
      email: true,
      user_name: true,
    },
    where: {
      id: uid,
    },
  });
}

export async function create(payload: User): Promise<object> {
  return db.user_account.create({
    select: {
      id: true,
    },
    data: payload,
  });
}

export async function saveSessionId(
  sessionId: string,
  uid: string
): Promise<object> {
  return db.user_account.update({
    where: {
      id: uid,
    },
    data: {
      session_id: sessionId,
    },
  });
}

export async function endSession(
  sessionId: string,
  modifiedSession: string
): Promise<object> {
  return db.user_account.update({
    where: {
      session_id: sessionId,
    },
    data: {
      session_id: modifiedSession,
    },
  });
}

export async function deleteById(id: string): Promise<User> {
  return db.user_account.delete({
    where: {
      id: id,
    },
  });
}
