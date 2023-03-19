import { db } from "../src/utils/db.server";

type Project = {
  id: number;
  project_name: string;
  description: string;
  github_url: string;
  owner: number;
  project_image: string;
};

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  github_url: string;
  user_name: string;
};

type Thread = {
  id: number;
  project_id: number;
};

type Tag = {
  id: number;
  tag_name: string;
  project_id: number;
};

type Message = {
  id: number;
  content: string;
  user_id: number;
  threads_id: number;
  creation_time: Date;
};

type Contributor = {
  id: number;
  user_id: number;
  project_id: number;
};

async function seed() {
  await db.contributors.deleteMany({});
  await db.messages.deleteMany({});
  await db.tags.deleteMany({});
  await db.taglibrary.deleteMany({});
  await db.threads.deleteMany({});
  await db.projects.deleteMany({});
  await db.user_account.deleteMany({});

  await Promise.all(
    getUsers().map((user) => {
      return db.user_account.create({
        data: {
          id: user.id,
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
    getTagNames().map((tagName) => {
      return db.taglibrary.create({
        data: {
          tag_name: tagName,
        },
      });
    })
  );

  await Promise.all(
    getProjects().map((project) => {
      return db.projects.create({
        data: {
          id: project.id,
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
          id: thread.id,
          project_id: thread.project_id,
        },
      });
    })
  );

  await Promise.all(
    getTags().map((tag) => {
      return db.tags.create({
        data: {
          id: tag.id,
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
          id: message.id,
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
          id: contributor.id,
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
      id: -1,
      project_name: "hikeable",
      description: "great app",
      github_url: "repo",
      owner: -1,
      project_image: "image1",
    },
    {
      id: -2,
      project_name: "any",
      description: "any",
      github_url: "any",
      owner: -2,
      project_image: "",
    },
  ];
}

function getUsers(): Array<User> {
  return [
    {
      id: -1,
      first_name: "John",
      last_name: "Smith",
      email: "johnsmith@gmail.com",
      github_url: "github.com/johnsmith",
      user_name: "johnsmith2",
    },
    {
      id: -2,
      first_name: "Mary",
      last_name: "Johnson",
      email: "maryjohnson@gmail.com",
      github_url: "github.com/maryjohnson",
      user_name: "maryjohnson10",
    },
    {
      id: -3,
      first_name: "Amanda",
      last_name: "Jones",
      email: "amandajones@gmail.com",
      github_url: "github.com/amandajones",
      user_name: "amandajones10",
    },
    {
      id: -4,
      first_name: "James",
      last_name: "Miller",
      email: "jamesmiller@gmail.com",
      github_url: "github.com/jamesmiller",
      user_name: "jamesmiller123",
    },
    {
      id: -5,
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
      id: -1,
      project_id: -1,
    },
    {
      id: -2,
      project_id: -1,
    },
    {
      id: -3,
      project_id: -2,
    },
  ];
}

function getTags(): Array<Tag> {
  return [
    {
      id: -1,
      tag_name: "React",
      project_id: -1,
    },
    {
      id: -2,
      tag_name: "Python",
      project_id: -1,
    },
    {
      id: -3,
      tag_name: "Health",
      project_id: -1,
    },
    {
      id: -4,
      tag_name: "Java",
      project_id: -2,
    },
    {
      id: -5,
      tag_name: "Next",
      project_id: -2,
    },
    {
      id: -6,
      tag_name: "Education",
      project_id: -2,
    },
  ];
}

function getMessages(): Array<Message> {
  return [
    {
      id: -1,
      content: "new message",
      user_id: -3,
      threads_id: -2,
      creation_time: new Date(),
    },
    {
      id: -2,
      content: "message about project",
      user_id: -4,
      threads_id: -3,
      creation_time: new Date(),
    },
    {
      id: -3,
      content: "one more message about project",
      user_id: -5,
      threads_id: -1,
      creation_time: new Date(),
    },
  ];
}

function getContributors(): Array<Contributor> {
  return [
    {
      id: -1,
      user_id: -3,
      project_id: -1,
    },
    {
      id: -2,
      user_id: -4,
      project_id: -1,
    },
    {
      id: -3,
      user_id: -5,
      project_id: -2,
    },
  ];
}

function getTagNames(): Array<string> {
  return ["React", "Java", "Python", "Health", "Next", "Education"];
}
