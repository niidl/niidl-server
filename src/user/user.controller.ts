import * as userModel from './user.model';
import { Request, Response } from 'express';
import axios from 'axios';

const gitApiAuth = process.env.GITHUB_ACCESS_TOKEN;

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

export async function save(req: Request, res: Response) {
  try {
    const { ghuid, displayName, email } = req.body;
    let firstName;
    let lastName;

    if (displayName) {
      const splitName = displayName.split(' ');
      firstName = splitName[0];
      lastName = splitName[1];
    }

    const user = await userModel.getUser(ghuid);
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
    };

    if (!user) {
      await userModel.create(payload);
    }
    res.status(200).send(payload.user_name);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
