import { db } from '../src/utils/db.server';

type Project = {
  id: number;
  project_name: string;
  description: string;
  github_url: string;
  owner: string;
  project_image: string;
  project_type: string;
};

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  github_url: string;
  user_name: string;
  session_id: string;
};

type Thread = {
  id: number;
  project_id: number;
  user_id: string;
  title: string;
  content: string;
  thread_tag: string;
  upvotes: number;
  isPinned: boolean;
};

type Tag = {
  id: number;
  tag_name: string;
  project_id: number;
};

type Message = {
  id: number;
  content: string;
  user_id: string;
  thread_id: number;
  creation_time: Date;
};

type Contributor = {
  id: number;
  user_id: string;
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
  await db.project_type.deleteMany({});
  await db.thread_tags.deleteMany({});

  await Promise.all(
    getProjectTypes().map((projectType) => {
      return db.project_type.create({
        data: {
          type: projectType,
        },
      });
    })
  );

  await Promise.all(
    getThreadTags().map((threadTagName) => {
      return db.thread_tags.create({
        data: {
          thread_tag_name: threadTagName,
        },
      });
    })
  );

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
          session_id: user.session_id,
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
          thread_tag: thread.thread_tag,
          isPinned: thread.isPinned,
          upvotes: thread.upvotes,
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
      project_name: 'Hikeable',
      description:
        'Hikeable is an English web app built to enhance the hiking experience for new and experienced hikers in Japan. Users can search for trails by prefecture, see photos uploaded by previous visitors, and keep track of their completion data via their dashboard. After launching the interactive map, users can leave geolocated messages, allowing them to interact with others on the trail.',
      github_url: 'https://github.com/hikeable/hikeable-frontend',
      owner: '119411466',
      project_image: 'image1',
      project_type: 'Web Full Stack',
    },
    {
      id: -2,
      project_name: 'Pokedex',
      description: 'Best application ever.',
      github_url: 'https://github.com/MrBCendales/PokeDex',
      owner: '114232631',
      project_image: '',
      project_type: 'Web Full Stack',
    },
    {
      id: -3,
      project_name: 'The super noodle recipe',
      description: 'The best noodle recipe app',
      github_url:
        'https://github.com/fabiohidekihirose/the-super-noodle-recipe',
      owner: '68039033',
      project_image: '',
      project_type: 'Mobile',
    },
    {
      id: -4,
      project_name: 'Semantic Kernel',
      description:
        'Semantic Kernel (SK) is a lightweight SDK enabling integration of AI Large Language Models (LLMs) with conventional programming languages. The SK extensible programming model combines natural language semantic functions, traditional code native functions, and embeddings-based memory unlocking new potential and adding value to applications with AI.',
      github_url: 'https://github.com/microsoft/semantic-kernel',
      owner: '6154722',
      project_image: '',
      project_type: 'Mobile',
    },
  ];
}

function getUsers(): Array<User> {
  return [
    {
      id: '6154722',
      first_name: 'Microsoft',
      last_name: 'Smith',
      email: 'MicrosoftSmith@realInformation.com',
      github_url: 'https://github.com/microsoft',
      user_name: 'microsoft',
      session_id: '5d3e44e353342f86',
    },
    {
      id: '119411466',
      first_name: 'Chad',
      last_name: 'Grover',
      email: 'ChadGrover@realInformation.com',
      github_url: 'https://github.com/chadgrover',
      user_name: 'chadgrover',
      session_id: '300d61c5d56b2b4f',
    },
    {
      id: '68039033',
      first_name: 'Fabio',
      last_name: 'Hirose',
      email: 'fabiohidekihirose@gmail.com',
      github_url: 'https://github.com/fabiohidekihirose',
      user_name: 'fabiohidekihirose',
      session_id: '286897d496cf647a',
    },
    {
      id: '114232631',
      first_name: 'Bryan',
      last_name: 'Cendales',
      email: 'bn.cendales10@gmail.com',
      github_url: 'https://github.com/MrBCendales',
      user_name: 'MrBCendales',
      session_id: '65ab84f6fc6b60cd',
    },
    {
      id: 'qwe',
      first_name: 'John',
      last_name: 'Smith',
      email: 'johnsmith@gmail.com',
      github_url: 'github.com/johnsmith',
      user_name: 'johnsmith2',
      session_id: 'a6fae06ac50f2bc3',
    },
    {
      id: 'asd',
      first_name: 'Mary',
      last_name: 'Johnson',
      email: 'maryjohnson@gmail.com',
      github_url: 'github.com/maryjohnson',
      user_name: 'maryjohnson10',
      session_id: 'c37794e2114dfb3a',
    },
    {
      id: 'zxc',
      first_name: 'Amanda',
      last_name: 'Jones',
      email: 'amandajones@gmail.com',
      github_url: 'github.com/amandajones',
      user_name: 'amandajones10',
      session_id: '14c56be4a935bd88',
    },
    {
      id: '123',
      first_name: 'James',
      last_name: 'Miller',
      email: 'jamesmiller@gmail.com',
      github_url: 'github.com/jamesmiller',
      user_name: 'jamesmiller123',
      session_id: 'c1e170c3398691d0',
    },
    {
      id: '456',
      first_name: 'Robert',
      last_name: 'Willson',
      email: 'robertwillson@gmail.com',
      github_url: 'github.com/robertwillson',
      user_name: 'robertwillson',
      session_id: 'c9e170c3398691d0',
    },
  ];
}

function getThreads(): Array<Thread> {
  return [
    {
      id: -1,
      project_id: -1,
      content: 'Once upon a time...',
      user_id: 'qwe',
      thread_tag: 'general-discussion',
      isPinned: true,
      upvotes: 10,
      title:
        'Why is processing a sorted array faster than processing an unsorted array?',
    },
    {
      id: -2,
      project_id: -1,
      content: 'Once upon a time...',
      user_id: '456',
      thread_tag: 'general-discussion',
      isPinned: true,
      upvotes: 1000,
      title: 'How do I undo the most recent local commits in Git?',
    },
    {
      id: -3,
      project_id: -1,
      content: 'Once upon a time...',
      user_id: '6154722',
      thread_tag: 'general-discussion',
      isPinned: false,
      upvotes: 0,
      title: 'What is the difference between git pull and git fetch?',
    },
    {
      id: -4,
      project_id: -1,
      content: 'Once upon a time...',
      user_id: '119411466',
      thread_tag: 'general-discussion',
      isPinned: false,
      upvotes: 0,
      title: 'How can I remove a specific item from an array in JavaScript?',
    },
    {
      id: -5,
      project_id: -1,
      content: 'Once upon a time...',
      user_id: '114232631',
      thread_tag: 'general-discussion',
      isPinned: false,
      upvotes: 0,
      title: 'How do I check if an element is hidden in jQuery?',
    },
    {
      id: -6,
      project_id: -2,
      content: 'Once upon a time...',
      user_id: 'zxc',
      thread_tag: 'general-discussion',
      isPinned: false,
      upvotes: 0,
      title:
        'How do I remove local (untracked) files from the current Git working tree?',
    },
    {
      id: -7,
      project_id: -2,
      content: 'Once upon a time...',
      user_id: 'zxc',
      thread_tag: 'new-ideas',
      isPinned: false,
      upvotes: 0,
      title:
        'How do I make Git forget about a file that was tracked, but is now in .gitignore?',
    },
    {
      id: -8,
      project_id: -2,
      content: 'Once upon a time...',
      user_id: 'zxc',
      thread_tag: 'new-ideas',
      isPinned: false,
      upvotes: 100,
      title: 'Does Python have a ternary conditional operator?',
    },
    {
      id: -9,
      project_id: -1,
      content: 'Once upon a time...',
      user_id: 'zxc',
      thread_tag: 'new-ideas',
      isPinned: false,
      upvotes: 100,
      title: 'Does Python have a ternary conditional operator?',
    },
    {
      id: -10,
      project_id: -1,
      content: 'Once upon a time...',
      user_id: 'zxc',
      thread_tag: 'new-ideas',
      isPinned: false,
      upvotes: 250,
      title: 'Does Python have a ternary conditional operator?',
    },
    {
      id: -11,
      project_id: -1,
      content: 'Once upon a time...',
      user_id: 'zxc',
      thread_tag: 'new-ideas',
      isPinned: false,
      upvotes: 19,
      title: 'Does Python have a ternary conditional operator?',
    },
  ];
}

function getTags(): Array<Tag> {
  return [
    {
      id: -1,
      tag_name: 'JavaScript',
      project_id: -1,
    },
    {
      id: -2,
      tag_name: 'JavaScript',
      project_id: -3,
    },
    {
      id: -3,
      tag_name: 'Education',
      project_id: -4,
    },
    {
      id: -4,
      tag_name: 'Business',
      project_id: -2,
    },
    {
      id: -5,
      tag_name: 'Travel',
      project_id: -2,
    },
    {
      id: -6,
      tag_name: 'JavaScript',
      project_id: -2,
    },
    {
      id: -7,
      tag_name: 'C#',
      project_id: -4,
    },
    {
      id: -8,
      tag_name: 'Food',
      project_id: -3,
    },
    {
      id: -9,
      tag_name: 'Science',
      project_id: -2,
    },
    {
      id: -10,
      tag_name: 'Travel',
      project_id: -1,
    },
    {
      id: -11,
      tag_name: 'Python',
      project_id: -1,
    },
  ];
}

function getMessages(): Array<Message> {
  return [
    {
      id: -1,
      content: 'new message',
      user_id: 'zxc',
      thread_id: -2,
      creation_time: new Date(),
    },
    {
      id: -2,
      content: 'message about project',
      user_id: 'asd',
      thread_id: -3,
      creation_time: new Date(),
    },
    {
      id: -3,
      content: 'one more message about project',
      user_id: 'qwe',
      thread_id: -1,
      creation_time: new Date(),
    },
    {
      id: -4,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      user_id: 'asd',
      thread_id: -1,
      creation_time: new Date(),
    },
    {
      id: -5,
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      user_id: 'zxc',
      thread_id: -3,
      creation_time: new Date(),
    },
    {
      id: -6,
      content:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
      user_id: '123',
      thread_id: -2,
      creation_time: new Date(),
    },
    {
      id: -7,
      content:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
      user_id: '456',
      thread_id: -1,
      creation_time: new Date(),
    },
  ];
}

function getContributors(): Array<Contributor> {
  return [
    {
      id: -1,
      user_id: 'zxc',
      project_id: -1,
    },
    {
      id: -2,
      user_id: '123',
      project_id: -1,
    },
    {
      id: -3,
      user_id: '456',
      project_id: -2,
    },
  ];
}

function getTagNames(): Array<string> {
  return [
    'Beginner-friendly',
    'Education',
    'Environment',
    'Health',
    'Fitness',
    'Food',
    'Entertainment',
    'Travel',
    'Science',
    'Business',
    'JavaScript',
    'Python',
    'Ruby',
    'C#',
  ];
}

function getProjectTypes(): Array<string> {
  return ['Web Full Stack', 'Mobile'];
}

function getThreadTags(): Array<string> {
  return ['newest', 'hot-topics', 'general-discussion', 'new-ideas'];
}
