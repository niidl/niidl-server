import { db } from '../utils/db.server';

type User = {
  id: string;
  first_name: string;
  last_name: string;
  github_url: string;
  email: string;
  user_name: string;
};

export async function getUser(uid: string): Promise<object | null> {
  return db.user_account.findUnique({
    select: {
      id: true,
    },
    where: {
      id: uid,
    },
  });
}

export async function create(payload: Omit<User, 'id'>): Promise<object> {
  return db.user_account.create({
    select: {
      id: true,
    },
    data: payload,
  });
}
