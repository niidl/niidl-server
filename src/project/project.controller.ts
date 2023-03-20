import * as projectModel from './project.model';
import { Request, Response } from 'express';
import axios from 'axios';

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
    ///////////////////
    const gitAccount = specificProject.github_url; //This url is fetched from the ServerSide github URL
    const GitAPI = {
      root: 'https://api.github.com/repos/',
      projectName: '',
      user: '',
    };
    const temp = gitAccount.split('/');
    GitAPI.projectName = temp[temp.length - 1];
    GitAPI.user = temp[temp.length - 2];

    const apiLink =
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

    const response = await axios.get(apiLink);
    const res_directory = await axios.get(apiLink_directory);
    const res_issues = await axios.get(apiLink_issues);

    const allProjectInfo = {
      issues: res_issues.data,
      contributors: response.data,
      directory: res_directory.data,
      specificProject: specificProject,
    };
    ///////////////////
    res.status(200).send(allProjectInfo);
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

    await projectModel.create(payload);
    res.status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
