import { db } from '../utils/db.server';

type User = {
  id: string;
  first_name: string;
  last_name: string;
  github_url: string;
  email: string;
  user_name: string;
  session_id: string;
  github_profile_picture: string;
};

type IdOnly = {
  id: string;
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
      github_profile_picture: true,
    },
  });
}

export async function getAllMessagesByUser(
  username: string
): Promise<object[] | null> {
  return db.messages.findMany({
    select: {
      content: true,
      creation_time: true,
      thread: {
        select: {
          title: true,
          id: true,
          project_id: true,
        },
      },
    },
    where: {
      user: {
        user_name: username,
      },
    },
  });
}

export async function getAllProjectsByUser(
  username: string
): Promise<object[] | null> {
  return db.projects.findMany({
    select: {
      id: true,
      project_name: true,
      project_image: true,
    },
    where: {
      user_acc: {
        user_name: username,
      },
    },
  });
}

export async function getUser(ghuid: string): Promise<object | null> {
  return db.user_account.findUnique({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      github_url: true,
      email: true,
      user_name: true,
      github_profile_picture: true,
      links: true,
    },
    where: {
      id: ghuid,
    },
  });
}

export async function getIdWithUsername(
  userName: string
): Promise<IdOnly | null> {
  return db.user_account.findUnique({
    select: {
      id: true,
    },
    where: {
      user_name: userName,
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

export async function updateUser(
  id: string,
  username: object
): Promise<User> {
  return db.user_account.update({
    data: username,
    where: {
      id: id,
    },
  });
}
