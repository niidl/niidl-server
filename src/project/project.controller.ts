import * as projectModel from './project.model';
import { Request, Response } from 'express';
import axios from 'axios';

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

export async function upvote(req: Request, res: Response) {
  try {
    const username = req.params.username;
    const projectId = parseInt(req.params.projectId);
    const allUpvotes = await projectModel.getUpvotes(projectId);

    if (allUpvotes[0]) {
      const userUpvotes = allUpvotes[0].upvotes.filter(
        (upvote: any) => upvote.user_name === username
      );
      res.status(200).send(userUpvotes);
    } else {
      res.status(200).send([]);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function save(req: Request, res: Response) {
  try {
    const {
      project_name,
      description,
      github_url,
      owner,
      project_image,
      project_type,
    } = req.body;
    const payload = {
      project_name,
      description,
      github_url,
      owner,
      project_image,
      project_type,
    };

    console.log(payload);

    await projectModel.create(payload);
    res.status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function edit(req: Request, res: Response) {
  try {
    const { project_name, project_image, project_type, description } = req.body;
    const projectId = parseInt(req.params.projectId);
    const payload = {
      project_name,
      project_image,
      project_type,
      description,
    };

    await projectModel.update(payload, projectId);
    res.status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const projectId = parseInt(req.params.projectId);
    await projectModel.deleteById(projectId);

    res.status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
