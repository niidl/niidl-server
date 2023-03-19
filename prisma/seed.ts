import { db } from '../src/utils/db.server';

type Project = {
  id: number;
  project_name: string;
  description: string;
  github_url: string;
  owner: number;
  project_image: string;
  project_type: string;
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
  user_id: number;
  title: string;
  content: string;
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
  thread_id: number;
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
          project_type: project.project_type,
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
          user_id: thread.user_id,
          title: thread.title,
          content: thread.content,
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
          thread_id: message.thread_id,
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
      project_name: 'hikeable',
      description: 'great app',
      github_url: 'repo',
      owner: -1,
      project_image: 'image1',
      project_type: 'Web FullStack*',
    },
    {
      id: -2,
      project_name: 'any',
      description: 'any',
      github_url: 'any',
      owner: -2,
      project_image: '',
      project_type: '*',
    },
  ];
}

function getUsers(): Array<User> {
  return [
    {
      id: -1,
      first_name: 'John',
      last_name: 'Smith',
      email: 'johnsmith@gmail.com',
      github_url: 'github.com/johnsmith',
      user_name: 'johnsmith2',
    },
    {
      id: -2,
      first_name: 'Mary',
      last_name: 'Johnson',
      email: 'maryjohnson@gmail.com',
      github_url: 'github.com/maryjohnson',
      user_name: 'maryjohnson10',
    },
    {
      id: -3,
      first_name: 'Amanda',
      last_name: 'Jones',
      email: 'amandajones@gmail.com',
      github_url: 'github.com/amandajones',
      user_name: 'amandajones10',
    },
    {
      id: -4,
      first_name: 'James',
      last_name: 'Miller',
      email: 'jamesmiller@gmail.com',
      github_url: 'github.com/jamesmiller',
      user_name: 'jamesmiller123',
    },
    {
      id: -5,
      first_name: 'Robert',
      last_name: 'Willson',
      email: 'robertwillson@gmail.com',
      github_url: 'github.com/robertwillson',
      user_name: 'robertwillson',
    },
  ];
}

function getThreads(): Array<Thread> {
  return [
    {
      id: -1,
      project_id: -1,
      content: 'Once upon a time...',
      user_id: -1,
      title: 'Title1',
    },
    {
      id: -2,
      project_id: -1,
      content: 'Once upon a time...',
      user_id: -5,
      title: 'Title2',
    },
    {
      id: -3,
      project_id: -2,
      content: 'Once upon a time...',
      user_id: -3,
      title: 'Title3',
    },
  ];
}

function getTags(): Array<Tag> {
  return [
    {
      id: -1,
      tag_name: 'React',
      project_id: -1,
    },
    {
      id: -2,
      tag_name: 'Python',
      project_id: -1,
    },
    {
      id: -3,
      tag_name: 'Health',
      project_id: -1,
    },
    {
      id: -4,
      tag_name: 'Java',
      project_id: -2,
    },
    {
      id: -5,
      tag_name: 'Next',
      project_id: -2,
    },
    {
      id: -6,
      tag_name: 'Education',
      project_id: -2,
    },
  ];
}

function getMessages(): Array<Message> {
  return [
    {
      id: -1,
      content: 'new message',
      user_id: -3,
      thread_id: -2,
      creation_time: new Date(),
    },
    {
      id: -2,
      content: 'message about project',
      user_id: -4,
      thread_id: -3,
      creation_time: new Date(),
    },
    {
      id: -3,
      content: 'one more message about project',
      user_id: -1,
      thread_id: -1,
      creation_time: new Date(),
    },
    {
      id: -4,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      user_id: -2,
      thread_id: -1,
      creation_time: new Date(),
    },
    {
      id: -5,
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      user_id: -3,
      thread_id: -1,
      creation_time: new Date(),
    },
    {
      id: -6,
      content:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
      user_id: -4,
      thread_id: -1,
      creation_time: new Date(),
    },
    {
      id: -7,
      content:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
      user_id: -5,
      thread_id: -1,
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
  return ['React', 'Java', 'Python', 'Health', 'Next', 'Education'];
}
