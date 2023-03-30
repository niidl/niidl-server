import * as userModel from './user.model';
import * as authModel from '../auth/auth.model';
import { Request, Response } from 'express';
import axios from 'axios';
import { randomBytes } from 'crypto';

const gitApiAuth = process.env.GITHUB_ACCESS_TOKEN;

export interface sessionCookie {
  sessionId: string;
}

export async function index(req: Request, res: Response) {
  try {
    const cookieObj: { sessionToken: string } = req.cookies;
    const sessionId: string = cookieObj.sessionToken;
    const ghuid = await authModel.validateUser(sessionId);

    if (!ghuid) {
      return res.status(404).send('Invalid Access Token');
    }
    try {
      const users = await userModel.getAllUsers();
      res.status(200).send(users);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  } catch (error: any) {
    res.status(404).send(error.message);
  }
}

export async function view(req: Request, res: Response) {
  // try {

  //   const cookieObj: { sessionToken: string } = req.cookies;
  //   const sessionId: string = cookieObj.sessionToken;
  //   const ghuid = await authModel.validateUser(sessionId);

  //   if (!ghuid) {
  //     return res.status(404).send('Invalid Access Token');

  //   }
  // console.log('ghuid',ghuid)
  try {
    const username = req.params.username;
    const ghuid = await userModel.getIdWithUsername(username);
    if (ghuid) {
      const user = await userModel.getUser(ghuid.id);
      res.status(203).send(user);
      return;
    }
  } catch (error: any) {
    res.status(500).send(error.message);
    return;
  }
  // } catch (error: any) {
  //   res.status(401).send(error.message);
  // }
}

export async function messages(req: Request, res: Response) {
  // try {
  //   const cookieObj: { sessionToken: string } = req.cookies;
  //   const sessionId: string = cookieObj.sessionToken;
  //   const ghuid = await authModel.validateUser(sessionId);

  //   if (!ghuid) {
  //     return res.status(404).send('Invalid Access Token');
  //   }

  try {
    const username = req.params.username;

    const allMessages = await userModel.getAllMessagesByUser(username);
    res.status(200).send(allMessages);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
  // } catch (error: any) {
  //   res.status(404).send(error.message);
  // }
}

export async function projects(req: Request, res: Response) {
  // try {
  //   const cookieObj: { sessionToken: string } = req.cookies;
  //   const sessionId: string = cookieObj.sessionToken;
  //   const ghuid = await authModel.validateUser(sessionId);

  //   if (!ghuid) {
  //     return res.status(404).send('Invalid Access Token');
  //   }
  try {
    const username = req.params.username;
    const allProjectsByUser = await userModel.getAllProjectsByUser(username);
    res.status(200).send(allProjectsByUser);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
  // } catch (error: any) {
  //   res.status(404).send(error.message);
  // }
}

export async function save(req: Request, res: Response) {
  console.log(req.body);
  try {
    const sessionId: string = randomBytes(8).toString('hex');
    const { ghuid, displayName, email } = req.body;
    let firstName;
    let lastName;
    if (displayName) {
      const splitName = displayName.split(' ');
      firstName = splitName[0];
      lastName = splitName[1];
    }

    const user = await userModel.getUser(ghuid);
    if (user) {
      await userModel.saveSessionId(sessionId, ghuid);
    }

    const userInfo = await axios.get('https://api.github.com/user/' + ghuid, {
      headers: {
        Authorization: 'token ' + gitApiAuth,
      },
    });
    const payload = {
      id: ghuid,
      email,
      first_name: firstName,
      last_name: lastName,
      user_name: userInfo.data.login,
      github_url: userInfo.data.html_url,
      session_id: sessionId,
      github_profile_picture: userInfo.data.avatar_url,
    };
    console.log('from GH API',userInfo)
    console.log('expected payload', payload)
  
    if (user) {
      await userModel.updateUser(payload.id, {
        user_name: payload.user_name,
        github_profile_picture: userInfo.data.avatar_url
      });
    }

    if (!user) {
      await userModel.create(payload);
    }

    if (process.env.PRODUCTION) {
      res.cookie('sessionToken', sessionId, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.cookie('userName', payload.user_name, {
        sameSite: 'none',
        secure: true,
      });
      res.send(payload.user_name);
      return;
    } else {
      res.cookie('sessionToken', sessionId, {
        httpOnly: true,
      });
      res.cookie('userName', payload.user_name, {});
      res.send(payload.user_name);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const cookieObj: { sessionToken: string } = req.cookies;
    const cookie: string = cookieObj.sessionToken;
    try {
      const logoutCookie: string = cookie.substring(2);
      await userModel.endSession(cookie, logoutCookie);
      res.clearCookie('sessionToken');
      res.status(200).send('');
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  } catch (error: any) {
    res.status(404).send(error.message);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const cookieObj: { sessionToken: string } = req.cookies;
    const sessionId: string = cookieObj.sessionToken;
    const ghuid = await authModel.validateUser(sessionId);

    if (!ghuid) {
      return res.status(404).send('Invalid Access Token');
    }
    try {
      const userId = req.params.userId;
      await userModel.deleteById(userId);

      res.status(201);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  } catch (error: any) {
    res.status(404).send(error.message);
  }
}
