import * as userModel from './user.model';
import { Request, Response } from 'express';

export async function view(req: Request, res: Response) {
  try {
    const uid = req.params.userId;
    const user = await userModel.getUser(uid);
    res.status(200).send(user);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function save(req: Request, res: Response) {
  try {
    const { ghuid, displayName, email } = req.body;
    const splitName = displayName.split(' ');
    const firstName = splitName[0];
    const lastName = splitName[1];
    const user = await userModel.getUser(ghuid);
    const userInfoJson = await fetch('https://api.github.com/user/' + ghuid);
    const userInfo = await userInfoJson.json();

    const payload = {
      id: ghuid,
      email,
      first_name: firstName,
      last_name: lastName,
      user_name: userInfo.login,
      github_url: userInfo.html_url,
    };

    if (!user) {
      await userModel.create(payload);
    }
    res.status(200).send(payload);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
