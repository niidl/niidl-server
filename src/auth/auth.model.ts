import { db } from '../utils/db.server';


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