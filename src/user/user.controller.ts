import * as userModel from './user.model';
import { Request, Response } from 'express';
import axios from 'axios';
import { randomBytes } from 'crypto';

const gitApiAuth = process.env.GITHUB_ACCESS_TOKEN;

export interface sessionCookie {
  sessionId: string;
}

export async function index(req: Request, res: Response) {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).send(users);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function view(req: Request, res: Response) {
  try {
    const uid = req.params.userId;
    const user = await userModel.getUser(uid);
    res.status(200).send(user);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function messages(req: Request, res: Response) {
  try {
    const uid = req.params.userId;
    const allMessages = await userModel.getAllMessagesByUser(uid);
    res.status(200).send(allMessages);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function projects(req: Request, res: Response) {
  try {
    const uid = req.params.userId;
    const allProjectsByUser = await userModel.getAllProjectsByUser(uid);
    res.status(200).send(allProjectsByUser);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function save(req: Request, res: Response) {
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
      github_profile_picture: '',
    };

    if (user) {
      await userModel.updateUsername(payload.id, {
        user_name: payload.user_name,
      });
    }

    if (!user) {
      await userModel.create(payload);
    }
    res.cookie('sessionToken', sessionId, {
      httpOnly: true,
    });
    res.cookie('userName', payload.user_name, {});
    res.send(payload.user_name);
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
      const sessionEndId = await userModel.endSession(cookie, logoutCookie);
      res.clearCookie('sessionToken');
      res.clearCookie('userName');
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
    const userId = req.params.userId;
    await userModel.deleteById(userId);

    res.status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
