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

export async function getIdWithToken(sessionId: string): Promise<{user_name:string, id: string} | null>{
  return db.user_account.findUnique({
    where: {
      session_id: sessionId
    },
    select: {
      user_name: true,
      id: true
    }
  })
}

export async function validateProject(projectId: number, username: string) {
  return db.projects.findMany({
    where: {
      id: projectId,
      user_acc: {
        user_name: username,
      },
    },
  });
}

/* Controller side template
    try {
        const cookieObj: { sessionToken: string } = req.cookies;
        const sessionId: string = cookieObj.sessionToken;
        const ghuid = await authModel.validateUser(sessionId);

        if (!ghuid) {
        return res.status(404).send('Invalid Access Token');
        }
    }catch (error: any) {
        res.status(404).send(error.message);
    }
*/
