import * as userModel from './user.model';
import { Request, Response } from 'express';

export async function view(req: Request, res: Response) {
  try {
    const { uid, displayName, email } = req.body.uid;
    const splitName = displayName.split(' ');
    const firstName = splitName[0];
    const lastName = splitName[1];
    const user = await userModel.getUser(uid);
    const userInfoJson = await fetch('https://api.github.com/user/' + uid);
    const userInfo = await userInfoJson.json();

    if (user) {
      res.status(200).send(userInfo.login);
    } else {
      const payload = {
        id: uid,
        email,
        first_name: firstName,
        last_name: lastName,
        user_name: userInfo.login,
        github_url: userInfo.html_url,
      };

      await userModel.create(payload);
      res.send('');
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
