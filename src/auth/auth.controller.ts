import * as authModel from '../auth/auth.model';
import { Request, Response } from 'express';


export async function projectToOwner(req: Request, res: Response) {
    try {
      const projectId = parseInt(req.params.projectId)
      const cookieObj: { sessionToken: string } = req.cookies;
      const sessionId: string = cookieObj.sessionToken;
      const ghuid = await authModel.validateUser(sessionId); 

      if (!ghuid) {
        return res.status(404).send('Invalid Access Token');
      }
      
      const uid = ghuid.id

      const checkReq = await authModel.validateProject(projectId)
      if (checkReq?.owner === uid){
        res.status(200).send(true)
        return
      }
      res.status(200).send(false);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
