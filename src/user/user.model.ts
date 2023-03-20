import { db } from '../utils/db.server';

type User = {
  id: string;
};

export async function getUser(uid: string): Promise<User | null> {
  return db.user_account.findUnique({
    select: {
      id: true,
    },
    where: {
      id: uid,
    },
  });
}
