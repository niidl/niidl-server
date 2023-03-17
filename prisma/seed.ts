import { db } from "../src/utils/db.server";

type Project = {
  project_name: string;
  description: string;
  repo_url: string;
  owner: string;
};

async function seed() {
  await Promise.all(
    getProjects().map((project) => {
      return db.projects.create({
        data: {
          project_name: project.project_name,
          description: project.description,
          repo_url: project.repo_url,
          owner: project.owner,
        },
      });
    })
  );
}

seed();

function getProjects(): Array<Project> {
  return [
    {
      project_name: "hikeable",
      description: "great app",
      repo_url: "repo",
      owner: "me",
    },
    {
      project_name: "any",
      description: "any",
      repo_url: "any",
      owner: "any",
    },
  ];
}
