import { Request, Response } from 'express';
import axios from 'axios';
import { link } from 'fs';

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
}

async function getAllData() {
  const TOTAL_GITHUB_ELEMENTS: number = 2;
  const allGithubProjects: Array<object> = [];
  const projTags: Array<string> = [
    'Environment',
    'Business',
    'Fitness',
    'Health',
    'Travel',
  ];

  for (let i = 0; i < TOTAL_GITHUB_ELEMENTS; i++) {
    let count: number = 0;
    if (count > 4) {
      count = 0;
    }
    const githubProjects = await axios.get(
      `https://api.github.com/search/repositories?q=${projTags[count]}`,
      {
        headers: {
          Authorization: 'token ' + gitApiAuth,
        },
      }
    );
    const tempLanguages = await axios.get(
      githubProjects.data.items[i].languages_url,
      {
        headers: {
          Authorization: 'token ' + gitApiAuth,
        },
      }
    );
    const projectTags = Object.keys(tempLanguages.data);
    projectTags.push('Based on Github');
    projectTags.push(`${projTags[count]}`);
    const tagsArr: Array<object> = [];
    //4th grade time complexity WARNING
    projectTags.map((tag) => {
      tagsArr.push({
        tag_name: tag,
        project_id: githubProjects.data.items[i].html_url,
      });
    });
    /// Issues
    const data_issues: any = [];
    const link_issues = `${githubProjects.data.items[i].url}/issues`;
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
      id: githubProjects.data.items[i].id * -1,
      project_name: githubProjects.data.items[i].name,
      description: 'A gitHub App, please check the URL to get to this project',
      github_url: githubProjects.data.items[i].html_url,
      owner: githubProjects.data.items[i].owner.login,
      project_image: githubProjects.data.items[i].owner.avatar_url,
      project_type: 'Web Full Stack',
      tags: tagsArr,
      issues: data_issues,
    };
    count++;
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
