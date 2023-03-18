import { db } from "../src/utils/db.server";

type Project = {
  project_name: string;
  description: string;
  github_url: string;
  owner: number;
  project_image: string;
};

type User = {
  first_name: string;
  last_name: string;
  email: string;
  github_url: string;
  user_name: string;
};

type Thread = {
  project_id: number;
};

type Tag = {
  tag_name: string;
  project_id: number;
};

type Message = {
  content: string;
  user_id: number;
  threads_id: number;
  creation_time: Date;
};

type Contributor = {
  user_id: number;
  project_id: number;
};

async function seed() {
  await Promise.all(
    getUsers().map((user) => {
      return db.user_account.create({
        data: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          github_url: user.github_url,
          user_name: user.user_name,
        },
      });
    })
  );

  await Promise.all(
    getProjects().map((project) => {
      return db.projects.create({
        data: {
          project_name: project.project_name,
          description: project.description,
          github_url: project.github_url,
          owner: project.owner,
          project_image: project.project_image,
        },
      });
    })
  );

  await Promise.all(
    getThreads().map((thread) => {
      return db.threads.create({
        data: {
          project_id: thread.project_id,
        },
      });
    })
  );

  await Promise.all(
    getTagNames().map((tagName) => {
      return db.taglibrary.create({
        data: {
          tag_name: tagName,
        },
      });
    })
  );

  await Promise.all(
    getTags().map((tag) => {
      return db.tags.create({
        data: {
          tag_name: tag.tag_name,
          project_id: tag.project_id,
        },
      });
    })
  );

  await Promise.all(
    getMessages().map((message) => {
      return db.messages.create({
        data: {
          content: message.content,
          user_id: message.user_id,
          threads_id: message.threads_id,
          creation_time: message.creation_time,
        },
      });
    })
  );

  await Promise.all(
    getContributors().map((contributor) => {
      return db.contributors.create({
        data: {
          user_id: contributor.user_id,
          project_id: contributor.project_id,
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
      github_url: "repo",
      owner: 1,
      project_image: "image1",
    },
    {
      project_name: "any",
      description: "any",
      github_url: "any",
      owner: 2,
      project_image: "",
    },
  ];
}

function getUsers(): Array<User> {
  return [
    {
      first_name: "John",
      last_name: "Smith",
      email: "johnsmith@gmail.com",
      github_url: "github.com/johnsmith",
      user_name: "johnsmith2",
    },
    {
      first_name: "Mary",
      last_name: "Johnson",
      email: "maryjohnson@gmail.com",
      github_url: "github.com/maryjohnson",
      user_name: "maryjohnson10",
    },
    {
      first_name: "Amanda",
      last_name: "Jones",
      email: "amandajones@gmail.com",
      github_url: "github.com/amandajones",
      user_name: "amandajones10",
    },
    {
      first_name: "James",
      last_name: "Miller",
      email: "jamesmiller@gmail.com",
      github_url: "github.com/jamesmiller",
      user_name: "jamesmiller123",
    },
    {
      first_name: "Robert",
      last_name: "Willson",
      email: "robertwillson@gmail.com",
      github_url: "github.com/robertwillson",
      user_name: "robertwillson",
    },
  ];
}

function getThreads(): Array<Thread> {
  return [
    {
      project_id: 1,
    },
    {
      project_id: 1,
    },
    {
      project_id: 2,
    },
  ];
}

function getTags(): Array<Tag> {
  return [
    {
      tag_name: "React",
      project_id: 1,
    },
    {
      tag_name: "Python",
      project_id: 1,
    },
    {
      tag_name: "Health",
      project_id: 1,
    },
    {
      tag_name: "Java",
      project_id: 2,
    },
    {
      tag_name: "Next",
      project_id: 2,
    },
    {
      tag_name: "Education",
      project_id: 2,
    },
  ];
}

function getMessages(): Array<Message> {
  return [
    {
      content: "new message",
      user_id: 3,
      threads_id: 2,
      creation_time: new Date(),
    },
    {
      content: "message about project",
      user_id: 4,
      threads_id: 3,
      creation_time: new Date(),
    },
  ];
}

function getContributors(): Array<Contributor> {
  return [
    {
      user_id: 3,
      project_id: 1,
    },
    {
      user_id: 4,
      project_id: 1,
    },
    {
      user_id: 5,
      project_id: 2,
    },
  ];
}

function getTagNames(): Array<string> {
  return ["React", "Java", "Python", "Health", "Next", "Education"];
}
