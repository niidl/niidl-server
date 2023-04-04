import { Request, Response } from 'express';
import axios from 'axios';
import { vimData } from './project_githubData';

const gitApiAuth = process.env.GITHUB_ACCESS_TOKEN;

interface SingleProject {
  id: number;
  project_name: string;
  description: string;
  github_url: string;
  owner: string;
  project_image: string;
  project_type: string;
  tags: Object;
  issues: Array<any>;
}

interface allInfo {
  id: number;
  project_name: string;
  tags: Array<object>;
  project_image: string;
}

async function fetchTagData(tag: string) {
  const TOTAL_GITHUB_ELEMENTS: number = 2;
  const githubProjects = await axios.get(
    `https://api.github.com/search/repositories?q=${tag}&sort=stars&order=desc&per_page=${TOTAL_GITHUB_ELEMENTS}`,
    {
      headers: {
        Authorization: 'token ' + gitApiAuth,
      },
    }
  );
  return githubProjects.data.items;
}

async function getAllData() {
  const rawGithubProjectsData: Array<any> = [];
  const allGithubProjects: Array<SingleProject> = [];
  const projectTags: Array<string> = [
    'Fitness',
    'Environment',
    'Business',
    'Travel',
  ];
  for (let i = 0; i < projectTags.length; i++) {
    const dataTag1 = await fetchTagData(projectTags[i]);
    dataTag1.map((project: any) => {
      project['projectMainTag'] = projectTags[i];
      rawGithubProjectsData.push(project);
    });
  }
  for (let i = 0; i < rawGithubProjectsData.length; i++) {
    const tempLanguages = await axios.get(
      rawGithubProjectsData[i].languages_url,
      {
        headers: {
          Authorization: 'token ' + gitApiAuth,
        },
      }
    );
    const projectTags = Object.keys(tempLanguages.data);
    projectTags.push('Based on Github');
    projectTags.push(`${rawGithubProjectsData[i].projectMainTag}`);
    const tagsArr: Array<object> = [];
    //4th grade time complexity WARNING
    projectTags.map((tag) => {
      tagsArr.push({
        tag_name: tag,
        project_id: rawGithubProjectsData[i].html_url,
      });
    });
    /// Issues
    const data_issues: any = [];
    const link_issues = `${rawGithubProjectsData[i].url}/issues`;
    const res_issues = await axios.get(link_issues, {
      headers: {
        Authorization: 'token ' + gitApiAuth,
      },
    });
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
    /// End issues
    const tempProject: SingleProject = {
      id: rawGithubProjectsData[i].id * -1,
      project_name: rawGithubProjectsData[i].name,
      description: rawGithubProjectsData[i].description,
      github_url: rawGithubProjectsData[i].html_url,
      owner: rawGithubProjectsData[i].owner.login,
      project_image:
        'https://niidl.sgp1.digitaloceanspaces.com/%2FgithubProject_image.png',
      project_type: 'Web Full Stack',
      tags: tagsArr,
      issues: data_issues,
    };
    allGithubProjects.push(tempProject);
  }
  return allGithubProjects;
}

export async function index(req: Request, res: Response) {
  try {
    const fetchedData: any = await getAllData();
    const dataToMainPage: Array<allInfo> = [];
    for (let i = 0; i < fetchedData.length; i++) {
      dataToMainPage.push({
        id: fetchedData[i].id,
        project_name: fetchedData[i].project_name,
        tags: fetchedData[i].tags,
        project_image:
          'https://niidl.sgp1.digitaloceanspaces.com/%2FgithubProject_image.png',
      });
    }
    res.status(200).send(dataToMainPage);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function view(req: Request, res: Response) {
  try {
    const project_id = parseInt(req.params.projectId);
    const fetchedData: any = await getAllData();
    const dataToClient: SingleProject[] = [];
    for (let i = 0; i < fetchedData.length; i++) {
      if (fetchedData[i].id === project_id) {
        dataToClient.push(fetchedData[i]);
      }
    }
    res.status(200).send(dataToClient[0]);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function demo(req: Request, res: Response) {
  try {
    const fetchedData: any = vimData;
    const dataToMainPage: Array<allInfo> = [];
    for (let i = 0; i < fetchedData.length; i++) {
      dataToMainPage.push({
        id: fetchedData[i].id,
        project_name: fetchedData[i].project_name,
        tags: fetchedData[i].tags,
        project_image:
          'https://niidl.sgp1.digitaloceanspaces.com/%2FgithubProject_image.png',
      });
    }
    res.status(200).send(dataToMainPage);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function demoView(req: Request, res: Response) {
  try {
    const project_id = parseInt(req.params.id);
    const fetchedData: any = vimData;
    const dataToClient: SingleProject[] = [];
    for (let i = 0; i < fetchedData.length; i++) {
      if (fetchedData[i].id === project_id) {
        dataToClient.push(fetchedData[i]);
      }
    }
    res.status(200).send(dataToClient[0]);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
