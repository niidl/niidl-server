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

type Link = {
  id: number;
  name: string;
  url: string;
  user_id: string;
};

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  github_url: string;
  user_name: string;
  github_profile_picture: string;
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
  github_url: string;
};

type Message = {
  id: number;
  content: string;
  user_id: string;
  thread_id: number;
  upvotes: number;
};

type Contributor = {
  id: number;
  user_id: string;
  project_id: number;
};

type upvoteThread = {
  id: number;
  thread_id: number;
  project_id: number;
  user_name: string;
};

type upvoteMessage = {
  id: number;
  thread_id: number;
  message_id: number;
  user_name: string;
};

type messageLibrary = {
  tag_name: string;
  is_language: boolean;
  is_github: boolean;
};

async function seed() {
  await db.contributors.deleteMany({});
  await db.messages.deleteMany({});
  await db.tags.deleteMany({});
  await db.taglibrary.deleteMany({});
  await db.threads.deleteMany({});
  await db.projects.deleteMany({});
  await db.user_account.deleteMany({});
  await db.upvotes_threads.deleteMany({});
  await db.upvotes_messages.deleteMany({});
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
          github_profile_picture: user.github_profile_picture,
        },
      });
    })
  );

  await Promise.all(
    getLinks().map((link) => {
      return db.links.create({
        data: {
          id: link.id,
          name: link.name,
          url: link.url,
          user_id: link.user_id,
        },
      });
    })
  );

  await Promise.all(
    getTagNames().map((tagName) => {
      return db.taglibrary.create({
        data: {
          tag_name: tagName.tag_name,
          is_language: tagName.is_language,
          is_github: tagName.is_github,
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
    getUpvotesThread().map((upvote) => {
      return db.upvotes_threads.create({
        data: {
          id: upvote.id,
          project_id: upvote.project_id,
          user_name: upvote.user_name,
          thread_id: upvote.thread_id,
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
          github_url: tag.github_url,
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
          upvotes: message.upvotes,
        },
      });
    })
  );

  await Promise.all(
    getUpvotesMessage().map((upvote) => {
      return db.upvotes_messages.create({
        data: {
          id: upvote.id,
          message_id: upvote.message_id,
          user_name: upvote.user_name,
          thread_id: upvote.thread_id,
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

function getLinks(): Array<Link> {
  return [
    {
      id: -1,
      name: 'Twitter',
      url: 'https://twitter.com',
      user_id: '84596103',
    },
    {
      id: -2,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com',
      user_id: '84596103',
    },
    {
      id: -3,
      name: 'Medium',
      url: 'https://medium.com',
      user_id: '84596103',
    },
  ];
}

function getProjects(): Array<Project> {
  return [
    {
      id: -1,
      project_name: 'Where was i?',
      description:
        'Where was I?! is an progress tracker application to help you never forget which episode was the last one you watched.',
      github_url: 'https://github.com/radish-team/where-was-i',
      owner: '56119907',
      project_image:
        'https://raw.githubusercontent.com/cc29-greenfield/where-was-i/main/front-end/src/images/rsz_background.png',
      project_type: 'Web Full Stack',
    },
    {
      id: -2,
      project_name: 'Pokedex',
      description:
        'Application for Pokémon lovers!! All information of 1st generation pokemon can be found here!!.',
      github_url: 'https://github.com/MrBCendales/PokeDex',
      owner: '114232631',
      project_image:
        'https://images.unsplash.com/photo-1628968434441-d9c1c66dcde7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      project_type: 'Web Full Stack',
    },
    {
      id: -3,
      project_name: 'The super noodle recipe',
      description:
        'Check all possible recipes that can be done with noodles. Amazing app for your cooking time!',
      github_url:
        'https://github.com/fabiohidekihirose/the-super-noodle-recipe',
      owner: '68039033',
      project_image:
        'https://images.unsplash.com/photo-1633352615955-f0c99e8b7e5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80',
      project_type: 'Mobile',
    },
    {
      id: -4,
      project_name: 'Semantic Kernel',
      description:
        'Semantic Kernel (SK) is a lightweight SDK enabling integration of AI Large Language Models (LLMs) with conventional programming languages. The SK extensible programming model combines natural language semantic functions, traditional code native functions, and embeddings-based memory unlocking new potential and adding value to applications with AI.',
      github_url: 'https://github.com/microsoft/semantic-kernel',
      owner: '6154722',
      project_image:
        'https://images.unsplash.com/photo-1655720031554-a929595ffad7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80',
      project_type: 'Mobile',
    },
  ];
}
function getUsers(): Array<User> {
  return [
    {
      id: '24426473',
      first_name: 'Adrian',
      last_name: 'Ang',
      email: 'Adrianang@gmail.com',
      github_url: 'https://github.com/adrianang',
      user_name: 'adrianang',
      session_id: '5d3e44e353342f86',
      github_profile_picture:
        'https://avatars.githubusercontent.com/u/24426473?v=4',
    },
    {
      id: '119411466',
      first_name: 'Chad',
      last_name: 'Grover',
      email: 'ChadGrover@gmail.com',
      github_url: 'https://github.com/chadgrover',
      user_name: 'chadgrover',
      session_id: '300d61c5d56b2b4f',
      github_profile_picture:
        'https://avatars.githubusercontent.com/u/93070367?v=4',
    },
    {
      id: '68039033',
      first_name: 'Fabio',
      last_name: 'Hirose',
      email: 'fabiohidekihirose@gmail.com',
      github_url: 'https://github.com/fabiohidekihirose',
      user_name: 'fabiohidekihirose',
      session_id: '286897d496cf647a',
      github_profile_picture:
        'https://avatars.githubusercontent.com/u/68039033?v=4',
    },
    {
      id: '114232631',
      first_name: 'Bryan',
      last_name: 'Cendales',
      email: 'bn.cendales10@gmail.com',
      github_url: 'https://github.com/MrBCendales',
      user_name: 'MrBCendales',
      session_id: '65ab84f6fc6b60cd',
      github_profile_picture:
        'https://avatars.githubusercontent.com/u/114232631?v=4',
    },
    {
      id: '56119907',
      first_name: 'Kaire',
      last_name: 'Montenegro',
      email: 'KaireMontenegro@gmail.com',
      github_url: 'https://github.com/users/Kai-Animator',
      user_name: 'Kai-Animator',
      session_id: 'a6fae06fn98f2bc3',
      github_profile_picture:
        'https://avatars.githubusercontent.com/u/56119907?v=4',
    },
    {
      id: '84596103',
      first_name: 'Takuya',
      last_name: 'Stern',
      email: 'takuyastern@gmail.com',
      github_url: 'https://github.com/TrenchTemplar',
      user_name: 'TrenchTemplar',
      session_id: 'c377usjsi14dfb3a',
      github_profile_picture:
        'https://avatars.githubusercontent.com/u/84596103?v=4',
    },
    {
      id: '109498948',
      first_name: 'Harry',
      last_name: 'Cleveland',
      email: 'harryCleveland@gmail.com',
      github_url: 'https://github.com/users/hccleveland',
      user_name: 'hccleveland',
      session_id: '14ciolka935bd885',
      github_profile_picture:
        'https://avatars.githubusercontent.com/u/109498948?v=4',
    },
    {
      id: '111978862',
      first_name: 'David',
      last_name: 'Wattellier',
      email: 'DavidWattellier@gmail.com',
      github_url: 'https://github.com/DavidWattellier',
      user_name: 'DavidWattellier',
      session_id: 'c1e170c3398691d0',
      github_profile_picture:
        'https://avatars.githubusercontent.com/u/111978862?v=4',
    },
    {
      id: '6154722',
      first_name: 'Mike',
      last_name: 'Smith',
      email: 'MicrosoftSmith@realInformation.com',
      github_url: 'https://github.com/microsoft',
      user_name: 'microsoft',
      session_id: '5d3e44e357892f86',
      github_profile_picture:
        'https://i.ibb.co/Lr2rmR1/IMG-20220717-100628.jpg',
    },
  ];
}

function getThreads(): Array<Thread> {
  return [
    {
      id: -1,
      project_id: -1,
      content:
        'It looks amazing!! I want to use it on my hometown!!! is it possible?',
      user_id: '114232631',
      thread_tag: 'general-discussion',
      isPinned: true,
      upvotes: 0,
      title: 'Is it possible to make it work outside Japan?',
    },
    {
      id: -2,
      project_id: -1,
      content:
        "It is about mountains right? I can't see enough trees on your application!",
      user_id: '109498948',
      thread_tag: 'general-discussion',
      isPinned: true,
      upvotes: 0,
      title: 'Not enough trees on the main page',
    },
    {
      id: -3,
      project_id: -1,
      content:
        'Is it ok if we as a user can take the image from the front page? As I can see it is even possible to edit that image and download it!',
      user_id: '6154722',
      thread_tag: 'general-discussion',
      isPinned: false,
      upvotes: 0,
      title: 'Image from the front page is downloadable...',
    },
    {
      id: -4,
      project_id: -1,
      content:
        "I'm using microsoft Edge, some of the pictures are not show in my browser, in the about page... None of the team pictures are shown, please fix that!!",
      user_id: '56119907',
      thread_tag: 'general-discussion',
      isPinned: false,
      upvotes: 0,
      title: 'Some images are not being shown on Microsoft Edge',
    },
    {
      id: -5,
      project_id: -1,
      content:
        'Not sure how your achievements features are working, how do you know I have already done that track?',
      user_id: '114232631',
      thread_tag: 'general-discussion',
      isPinned: false,
      upvotes: 0,
      title: 'How do I fill the badges on your website?',
    },
    {
      id: -6,
      project_id: -2,
      content:
        "It looks good but not enough, I don't feel the Pokedex experience",
      user_id: '109498948',
      thread_tag: 'general-discussion',
      isPinned: false,
      upvotes: 0,
      title: 'Is it possible to make it look more like a pokedex?',
    },
    {
      id: -7,
      project_id: -2,
      content:
        'Looks amazing!! Can you  make it for other generations? I really wanna know more about the newest pokemon!',
      user_id: '24426473',
      thread_tag: 'new-ideas',
      isPinned: false,
      upvotes: 0,
      title: 'Pokedex for other generations!',
    },
    {
      id: -8,
      project_id: -2,
      content:
        "I want to see the information on my favorites table, but I can't see them!",
      user_id: '111978862',
      thread_tag: 'new-ideas',
      isPinned: false,
      upvotes: 0,
      title: "Can't see my information on the favorites option!",
    },
    {
      id: -9,
      project_id: -2,
      content:
        'I really wanna use your pokedex on my mobile phone, but now it is not, looks ugly on my phone. Thanks!',
      user_id: '109498948',
      thread_tag: 'new-ideas',
      isPinned: false,
      upvotes: 0,
      title: 'Is it possible to make it mobile?',
    },
    {
      id: -10,
      project_id: -2,
      content:
        'If you add some strategies for us to check also the competitive strategies, that would be amazing!',
      user_id: '68039033',
      thread_tag: 'new-ideas',
      isPinned: false,
      upvotes: 0,
      title: 'What if you add some competitive strategies per Pokemon?',
    },
    {
      id: -11,
      project_id: -3,
      content:
        'It is good, but I think it can be expanded to more and more features in the future',
      user_id: '109498948',
      thread_tag: 'new-ideas',
      isPinned: false,
      upvotes: 0,
      title: "This app looks interesting, Can't wait to see new features",
    },
    {
      id: -12,
      project_id: -3,
      content: "That's a question that has always been in my mind",
      user_id: '114232631',
      thread_tag: 'new-ideas',
      isPinned: false,
      upvotes: 0,
      title: 'Is the noodle a pasta?',
    },
    {
      id: -13,
      project_id: -4,
      content:
        "Don't really understand the app by the title, what is the meaning of Semantic Kernel? I think that could be a better start.",
      user_id: '68039033',
      thread_tag: 'new-ideas',
      isPinned: false,
      upvotes: 0,
      title:
        "Don't really understand the app by the title, what is the meaning of Semantic Kernel?",
    },
  ];
}

function getTags(): Array<Tag> {
  return [
    {
      id: -1,
      tag_name: 'JavaScript',
      github_url: 'https://github.com/radish-team/where-was-i',
    },
    {
      id: -2,
      tag_name: 'JavaScript',
      github_url:
        'https://github.com/fabiohidekihirose/the-super-noodle-recipe',
    },
    {
      id: -3,
      tag_name: 'Education',
      github_url: 'https://github.com/microsoft/semantic-kernel',
    },
    {
      id: -4,
      tag_name: 'Business',
      github_url: 'https://github.com/MrBCendales/PokeDex',
    },
    {
      id: -5,
      tag_name: 'Travel',
      github_url: 'https://github.com/MrBCendales/PokeDex',
    },
    {
      id: -6,
      tag_name: 'JavaScript',
      github_url: 'https://github.com/MrBCendales/PokeDex',
    },
    {
      id: -7,
      tag_name: 'C#',
      github_url: 'https://github.com/microsoft/semantic-kernel',
    },
    {
      id: -8,
      tag_name: 'Food',
      github_url:
        'https://github.com/fabiohidekihirose/the-super-noodle-recipe',
    },
    {
      id: -9,
      tag_name: 'Science',
      github_url: 'https://github.com/MrBCendales/PokeDex',
    },
    {
      id: -10,
      tag_name: 'Travel',
      github_url: 'https://github.com/radish-team/where-was-i',
    },
    {
      id: -11,
      tag_name: 'Python',
      github_url: 'https://github.com/radish-team/where-was-i',
    },
  ];
}

function getMessages(): Array<Message> {
  return [
    {
      id: -2,
      content:
        'Yes, it would be amazing!! My favorite generation is the third, I really wanna see them all in this Pokedex',
      user_id: '84596103',
      thread_id: -7,
      upvotes: 0,
    },
    {
      id: -3,
      content:
        "No worries guys, we are already working on it. Soon, you'll get some exciting news",
      user_id: '114232631',
      thread_id: -7,
      upvotes: 0,
    },
    {
      id: -4,
      content:
        'Well, the app is for hiking trails, you can go there and see the trees with the help of our app!',
      user_id: '119411466',
      thread_id: -2,
      upvotes: 3,
    },
    {
      id: -5,
      content:
        "I'm also having this same problem, probably this is some bug related to your server. Sometimes it works, sometimes it doesn't.",
      user_id: '56119907',
      thread_id: -8,
      upvotes: 0,
    },
    {
      id: -6,
      content:
        'Ohhh I meant pictures, like images on your application, to make it look more *natural*.',
      user_id: '109498948',
      thread_id: -2,
      upvotes: 0,
    },
    {
      id: -7,
      content:
        'I took a look in your favorite controller and it looks like your function getFavorites is not working the way it should. I think you should refactor it using axios. ',
      user_id: '109498948',
      thread_id: -8,
      upvotes: 0,
    },
    {
      id: -9,
      content:
        'We will have that in our radar for development, thanks for using our application!',
      user_id: '119411466',
      thread_id: -2,
      upvotes: 0,
    },
    {
      id: -10,
      content:
        "We don't have that download option, maybe a feature on your browser?",
      user_id: '119411466',
      thread_id: -3,
      upvotes: 0,
    },
    {
      id: -11,
      content: 'Let me check, it was downloadable and I could even edit it.',
      user_id: '6154722',
      thread_id: -3,
      upvotes: 0,
    },
    {
      id: -12,
      content:
        'Let us know, for us to fix it and make the application better for everyone. Thanks.',
      user_id: '119411466',
      thread_id: -3,
      upvotes: 0,
    },
    {
      id: -13,
      content: "Thank you guys! I'll improve this feature really soon!",
      user_id: '114232631',
      thread_id: -8,
      upvotes: 0,
    },
    {
      id: -14,
      content:
        "Apparently it was my browser's feature, thank you anyway for this **amazing** App!",
      user_id: '6154722',
      thread_id: -3,
      upvotes: 0,
    },
    {
      id: -15,
      content:
        "Me too, sometimes I'm playing Pokemon Go with friends and we find a new Pokemon that we don't know. I'd like to use the Pokedex App to know more about it. Thanks",
      user_id: '111978862',
      thread_id: -9,
      upvotes: 0,
    },
    {
      id: -16,
      content:
        'Might be a compatibility problem, Let us check on this issue and we are going to fix it in a new release! Thank you for the information.',
      user_id: '119411466',
      thread_id: -4,
      upvotes: 0,
    },
    {
      id: -17,
      content:
        "We are trying our best to deliver this new feature as soon as possible. In the next months, you'll be able to use it in your smartphone!",
      user_id: '114232631',
      thread_id: -9,
      upvotes: 0,
    },
    {
      id: -18,
      content: 'No problem, keep up the hard work and thank you.',
      user_id: '56119907',
      thread_id: -4,
      upvotes: 0,
    },
    {
      id: -19,
      content:
        "I'm starting in the competitive battles now and it would be really nice if I had some strategies to help me out, at least the basic ones.",
      user_id: '24426473',
      thread_id: -10,
      upvotes: 0,
    },
    {
      id: -20,
      content:
        "When you finish a track, you'll receive some rewards as medals in your achievements panel, just do hiking and **fill the mark** when completed.",
      user_id: '119411466',
      thread_id: -5,
      upvotes: 0,
    },
    {
      id: -21,
      content: 'I see, there are also descriptions of the achievements.',
      user_id: '114232631',
      thread_id: -5,
      upvotes: 0,
    },
    {
      id: -22,
      content:
        'Exactly, just keep hiking while using our application! Thanks for choosing us.',
      user_id: '119411466',
      thread_id: -5,
      upvotes: 0,
    },
    {
      id: -23,
      content:
        'You could do something for the other players too, I wanna know more about advanced strategies, specially using Dragon Type Pokemon.',
      user_id: '119411466',
      thread_id: -10,
      upvotes: 0,
    },
    {
      id: -24,
      content: "The app looks great, I'll complete all achievements :)",
      user_id: '114232631',
      thread_id: -5,
      upvotes: 0,
    },
    {
      id: -25,
      content:
        "We'll have competitive strategies for both beginners and advanced players very soon. More news and features in the next months.",
      user_id: '114232631',
      thread_id: -10,
      upvotes: 0,
    },
    {
      id: -26,
      content:
        'This is an MVP, in the future we are going to make it much better, just wait for it :)',
      user_id: '114232631',
      thread_id: -6,
      upvotes: 0,
    },
    {
      id: -27,
      content:
        "It is just an idea, there are so much features I'm thinking of, we can connect if you'd like to check on more ideas, just let me know.",
      user_id: '109498948',
      thread_id: -6,
      upvotes: 0,
    },
    {
      id: -28,
      content:
        "I really liked this app, I'm using it very often because I like to try new recipes. One thing that you could implement is a Favorite section, to keep track my favorite recipes.",
      user_id: '56119907',
      thread_id: -11,
      upvotes: 0,
    },
    {
      id: -29,
      content:
        "Of course, when we need we have this channel to listen to people's ideas and suggestions, thanks for your approach! Will make it look much better soon",
      user_id: '114232631',
      thread_id: -6,
      upvotes: 0,
    },
    {
      id: -30,
      content: 'Amazing, thanks for listening and keep up the hard work.',
      user_id: '109498948',
      thread_id: -6,
      upvotes: 0,
    },
    {
      id: -31,
      content:
        'Another cool feature would be post our own recipes and create like a community where people can talk to each other and share thoughts about noodles.',
      user_id: '84596103',
      thread_id: -11,
      upvotes: 0,
    },
    {
      id: -32,
      content:
        'Something interesting would be to be able to make sure you completed the track by being in the place, as anyone can complete it from everywhere',
      user_id: '114232631',
      thread_id: -5,
      upvotes: 0,
    },
    {
      id: -33,
      content:
        "Thanks guys for all the suggestions, we'll implement this for the next week",
      user_id: '111978862',
      thread_id: -11,
      upvotes: 0,
    },
    {
      id: -34,
      content:
        "That's a really interesting feature that for sure will be implemented, thanks for the suggestion.",
      user_id: '119411466',
      thread_id: -5,
      upvotes: 0,
    },
    {
      id: -35,
      content: "In my opinion, it is. it's all the same",
      user_id: '111978862',
      thread_id: -12,
      upvotes: 0,
    },
  ];
}

function getContributors(): Array<Contributor> {
  return [
    {
      id: -1,
      user_id: '111978862',
      project_id: -1,
    },
    {
      id: -2,
      user_id: '109498948',
      project_id: -1,
    },
    {
      id: -3,
      user_id: '68039033',
      project_id: -2,
    },
  ];
}

function getUpvotesThread(): Array<upvoteThread> {
  return [
    {
      id: -2,
      thread_id: -5,
      project_id: -1,
      user_name: 'MrBCendales',
    },
    {
      id: -3,
      thread_id: -10,
      project_id: -1,
      user_name: 'TrenchTemplar',
    },
    {
      id: -4,
      thread_id: -8,
      project_id: -2,
      user_name: 'fabiohidekihirose',
    },
    {
      id: -6,
      thread_id: -10,
      project_id: -1,
      user_name: 'adrianang',
    },
    {
      id: -7,
      thread_id: -10,
      project_id: -1,
      user_name: 'Kai-Animator',
    },
    {
      id: -8,
      thread_id: -10,
      project_id: -1,
      user_name: 'TrenchTemplar',
    },
    {
      id: -9,
      thread_id: -5,
      project_id: -1,
      user_name: 'fabiohidekihirose',
    },
    {
      id: -10,
      thread_id: -10,
      project_id: -1,
      user_name: 'MrBCendales',
    },
    {
      id: -11,
      thread_id: -6,
      project_id: -2,
      user_name: 'adrianang',
    },
    {
      id: -12,
      thread_id: -6,
      project_id: -2,
      user_name: 'hccleveland',
    },
    {
      id: -13,
      thread_id: -3,
      project_id: -1,
      user_name: 'hccleveland',
    },
    {
      id: -14,
      thread_id: -8,
      project_id: -2,
      user_name: 'adrianang',
    },
    {
      id: -15,
      thread_id: -9,
      project_id: -2,
      user_name: 'TrenchTemplar',
    },
    {
      id: -16,
      thread_id: -11,
      project_id: -3,
      user_name: 'TrenchTemplar',
    },
    {
      id: -17,
      thread_id: -11,
      project_id: -3,
      user_name: 'DavidWattellier',
    },
    {
      id: -19,
      thread_id: -13,
      project_id: -4,
      user_name: 'Kai-Animator',
    },
    {
      id: -20,
      thread_id: -13,
      project_id: -4,
      user_name: 'TrenchTemplar',
    },
  ];
}

function getUpvotesMessage(): Array<upvoteMessage> {
  return [
    {
      id: -4,
      thread_id: -2,
      message_id: -4,
      user_name: 'MrBCendales',
    },
    {
      id: -5,
      thread_id: -2,
      message_id: -4,
      user_name: 'TrenchTemplar',
    },
    {
      id: -6,
      thread_id: -2,
      message_id: -9,
      user_name: 'MrBCendales',
    },
    {
      id: -7,
      thread_id: -3,
      message_id: -10,
      user_name: 'TrenchTemplar',
    },
    {
      id: -8,
      thread_id: -3,
      message_id: -10,
      user_name: 'fabiohidekihirose',
    },
    {
      id: -9,
      thread_id: -3,
      message_id: -11,
      user_name: 'MrBCendales',
    },
    {
      id: -10,
      thread_id: -4,
      message_id: -16,
      user_name: 'hccleveland',
    },
    {
      id: -11,
      thread_id: -4,
      message_id: -16,
      user_name: 'TrenchTemplar',
    },
    {
      id: -12,
      thread_id: -4,
      message_id: -18,
      user_name: 'MrBCendales',
    },
    {
      id: -13,
      thread_id: -5,
      message_id: -21,
      user_name: 'fabiohidekihirose',
    },
    {
      id: -14,
      thread_id: -6,
      message_id: -26,
      user_name: 'MrBCendales',
    },
    {
      id: -15,
      thread_id: -6,
      message_id: -27,
      user_name: 'hccleveland',
    },
    {
      id: -16,
      thread_id: -8,
      message_id: -7,
      user_name: 'DavidWattellier',
    },
    {
      id: -17,
      thread_id: -8,
      message_id: -7,
      user_name: 'Kai-Animator',
    },
    {
      id: -18,
      thread_id: -10,
      message_id: -19,
      user_name: 'hccleveland',
    },
    {
      id: -19,
      thread_id: -10,
      message_id: -19,
      user_name: 'fabiohidekihirose',
    },
    {
      id: -20,
      thread_id: -11,
      message_id: -28,
      user_name: 'hccleveland',
    },
    {
      id: -21,
      thread_id: -11,
      message_id: -31,
      user_name: 'hccleveland',
    },
    {
      id: -22,
      thread_id: -12,
      message_id: -35,
      user_name: 'DavidWattellier',
    },
    {
      id: -23,
      thread_id: -12,
      message_id: -35,
      user_name: 'fabiohidekihirose',
    },
    {
      id: -24,
      thread_id: -9,
      message_id: -17,
      user_name: 'DavidWattellier',
    },
    {
      id: -25,
      thread_id: -9,
      message_id: -15,
      user_name: 'DavidWattellier',
    },
    {
      id: -26,
      thread_id: -8,
      message_id: -7,
      user_name: 'TrenchTemplar',
    },
    {
      id: -27,
      thread_id: -7,
      message_id: -2,
      user_name: 'DavidWattellier',
    },
    {
      id: -28,
      thread_id: -8,
      message_id: -5,
      user_name: 'hccleveland',
    },
    {
      id: -29,
      thread_id: -9,
      message_id: -17,
      user_name: 'TrenchTemplar',
    },
    {
      id: -30,
      thread_id: -9,
      message_id: -17,
      user_name: 'MrBCendales',
    },
  ];
}

function getTagNames(): Array<messageLibrary> {
  return [
    {
      tag_name: 'Beginner-friendly',
      is_language: false,
      is_github: false,
    },
    {
      tag_name: 'Education',
      is_language: false,
      is_github: false,
    },
    {
      tag_name: 'Environment',
      is_language: false,
      is_github: false,
    },
    {
      tag_name: 'Health',
      is_language: false,
      is_github: false,
    },
    {
      tag_name: 'Fitness',
      is_language: false,
      is_github: false,
    },
    {
      tag_name: 'Food',
      is_language: false,
      is_github: false,
    },
    {
      tag_name: 'Entertainment',
      is_language: false,
      is_github: false,
    },
    {
      tag_name: 'Travel',
      is_language: false,
      is_github: false,
    },
    {
      tag_name: 'Science',
      is_language: false,
      is_github: false,
    },
    {
      tag_name: 'Business',
      is_language: false,
      is_github: false,
    },
    {
      tag_name: 'JavaScript',
      is_language: true,
      is_github: false,
    },
    {
      tag_name: 'Python',
      is_language: true,
      is_github: false,
    },
    {
      tag_name: 'Ruby',
      is_language: true,
      is_github: false,
    },
    {
      tag_name: 'C#',
      is_language: true,
      is_github: false,
    },
    {
      tag_name: 'Java',
      is_language: true,
      is_github: false,
    },
    {
      tag_name: 'PHP',
      is_language: true,
      is_github: false,
    },
    {
      tag_name: 'Go',
      is_language: true,
      is_github: false,
    },
    {
      tag_name: 'Rust',
      is_language: true,
      is_github: false,
    },
    {
      tag_name: 'C++',
      is_language: true,
      is_github: false,
    },
    {
      tag_name: 'TypeScript',
      is_language: true,
      is_github: false,
    },
  ];
}

function getProjectTypes(): Array<string> {
  return ['Web Full Stack', 'Mobile'];
}

function getThreadTags(): Array<string> {
  return ['newest', 'hot-topics', 'general-discussion', 'new-ideas'];
}
