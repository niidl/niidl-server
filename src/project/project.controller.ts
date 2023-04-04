import * as projectModel from './project.model';
import * as authModel from '../auth/auth.model';
import * as userModel from '../user/user.model';
import { Request, Response } from 'express';
import axios from 'axios';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

const gitApiAuth = process.env.GITHUB_ACCESS_TOKEN;

export async function index(req: Request, res: Response) {
  try {
    const allProjects = await projectModel.getAll();
    res.status(200).send(allProjects);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function view(req: Request, res: Response) {
  try {
    const projectId = parseInt(req.params.projectId);
    const specificProject = await projectModel.getProjectById(projectId);

    const gitAccount = specificProject.github_url;
    const GitAPI = {
      root: 'https://api.github.com/repos/',
      projectName: '',
      user: '',
    };
    const temp = gitAccount.split('/');
    GitAPI.projectName = temp[temp.length - 1];
    GitAPI.user = temp[temp.length - 2];

    const apiLink_contributors =
      GitAPI.root +
      GitAPI.user +
      '/' +
      GitAPI.projectName +
      '/' +
      'contributors';
    const apiLink_directory =
      GitAPI.root + GitAPI.user + '/' + GitAPI.projectName + '/' + 'contents';
    const apiLink_issues =
      GitAPI.root + GitAPI.user + '/' + GitAPI.projectName + '/' + 'issues';

    const res_contributor = await axios.get(apiLink_contributors, {
      headers: {
        Authorization: 'token ' + gitApiAuth,
      },
    });
    const res_issues = await axios.get(apiLink_issues, {
      headers: {
        Authorization: 'token ' + gitApiAuth,
      },
    });

    const data_contributors: any = [];
    res_contributor.data.map((elem: any) => {
      data_contributors.push({
        contributor_id: elem.id,
        username: elem.login,
        image: elem.avatar_url,
      });
    });

    const data_issues: any = [];
    res_issues.data.map((elem: any) => {
      data_issues.push({
        issue_id: elem.id,
        html_url: elem.html_url,
        title: elem.title,
        created_at: elem.created_at,
        issue_author: elem.user.login,
        author_id: elem.user.id,
      });
    });

    const allProjectInfo = {
      issues: data_issues,
      contributors: data_contributors,
      directory: apiLink_directory,
      ...specificProject,
    };

    res.status(200).send(allProjectInfo);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function save(req: Request, res: Response) {
  try {
    const owner_url: string = req.body.github_url;
    const url_split = owner_url.split('/');
    const owner = url_split[3];

    const cookieObj: { sessionToken: string } = req.cookies;
    const sessionId: string = cookieObj.sessionToken;
    const dbUser = await authModel.getIdWithToken(sessionId);
    const user = dbUser?.user_name;

    const ownerId = dbUser?.id;
    let ownerFixed: string;
    //const ghuid = await authModel.validateUser(sessionId);
    if (user !== owner) {
      res.status(401).send('Github user and URL do not match');
      return;
    }
    if (ownerId === undefined) {
      res.status(401).send('?');
    }

    try {
      const {
        project_name,
        description,
        github_url,
        project_image,
        project_type,
      } = req.body;
      const payload = {
        project_name,
        description,
        github_url,
        owner: ownerId,
        project_image,
        project_type,
      };

      const id = await projectModel.create(payload);
      const project = await axios.get(
        `http://localhost:8080/projects/${id.id}`
      );

      project.data.id = id.id;
      res.status(201).send(id);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  } catch (error: any) {
    res.status(404).send(error.message);
  }
}

export async function saveFollowUp(req: Request, res: Response) {
  try {
    const url: any = req.query.projectGithubRepo;
    console.log(url);
    const projectId = await projectModel.idWithURL(url);
    console.log(projectId);
    res.status(200).send(projectId?.id);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function edit(req: Request, res: Response) {
  try {
    const cookieObj: { sessionToken: string } = req.cookies;
    const sessionId: string = cookieObj.sessionToken;
    const userNameObj: { user_name: string } = req.cookies;
    const userNameCookie: string = userNameObj.user_name;

    const authUsernameObj = await authModel.getIdWithToken(sessionId);
    const authUsername = authUsernameObj?.user_name;

    if (authUsername !== userNameCookie) {
      return res.status(404).send('Invalid Access Token');
    }
    try {
      const { project_name, project_image, project_type, description } =
        req.body;
      const projectId = parseInt(req.params.projectId);
      const payload = {
        project_name,
        project_image,
        project_type,
        description,
      };

      await projectModel.update(payload, projectId);
      res.status(201).send('');
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
    const userNameObj: { user_name: string } = req.cookies;
    const userNameCookie: string = userNameObj.user_name;

    const authUsernameObj = await authModel.getIdWithToken(sessionId);
    const authUsername = authUsernameObj?.user_name;

    if (authUsername !== userNameCookie) {
      return res.status(404).send('Invalid Access Token');
    }
    try {
      const projectId = parseInt(req.params.projectId);
      await projectModel.deleteById(projectId);

      res.status(201).send('');
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  } catch (error: any) {
    res.status(404).send(error.message);
  }
}

export async function uploadImage(req: Request, res: Response) {
  try {
    const newName = req.query.newName;

    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const spacesEndpoint = new aws.Endpoint('sgp1.digitaloceanspaces.com');
    const s3 = new aws.S3({
      endpoint: spacesEndpoint,
    });

    // Change bucket property to your Space name
    const upload = multer({
      storage: multerS3({
        s3: s3 as any,
        bucket: 'niidl',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (request, file, cb) {
          console.log(file);
          if (file.mimetype === 'image/jpeg') {
            cb(null, `/${newName}/${newName}_image.jpeg`);
          } else if (file.mimetype === 'image/jpg') {
            cb(null, `/${newName}/${newName}_image.jpg`);
          } else if (file.mimetype === 'image/png') {
            cb(null, `/${newName}/${newName}_image.pgn`);
          }
        },
        contentDisposition: 'inline',
      }),
    }).array('upload', 2);

    upload(req, res, (error) => {
      if (error) {
        console.log(error);
        return res.sendStatus(401);
      }
      res.sendStatus(201);
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
