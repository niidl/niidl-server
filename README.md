<br />
<div align="center">

  <h3 align="center">niidl</h3>

  <p align="center">
    Backend of niidl.co, an App created for intermediate coders as a place to search for and colaborate on code.
    <br />
    <a href="https://github.com/niidl/niidl-client"><strong>Check out our org on GitHub</strong></a>
    <br />
    <a href="https://github.com/niidl/niidl-client"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/niidl/niidl-client/issues">Report Bug</a>
    ·
    <a href="https://github.com/niidl/niidl-client/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#notes">Notes</a></li>
      </ul>
    </li>
       <li>
      <a href="#basic-outline">Basic Outline</a>
      <ul>
        <li><a href="#schema">Database/Schema</a></li>
        <li><a href="#api">Primary APIs</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

[niidl](https://niidl.co)

Learning to code can be a daunting task. There are plenty of resources on how to get started, but once you understand the basics, you are thrust directly into the world of complex projects with intimidating code bases, and no direction. Here at niidl, we aim to bridge that gap by connecting engineers with projects that resonate with them, through advanced search features and personalized discussion boards.
For the full story on niidl's inception, please visit our org page!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [![TypeScript][typescript]][typescript-url]
- [![Node][node.js]][node-url]
- [![Express][express.js]][express-url]
- [![Prisma][prisma]][prisma-url]
- [![PostgreSQL][postgresql]][postgresql-url]
- [![DigitalOcean][digitalocean]][digitalocean-url]
- [![Docker][docker]][docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.
Please keep in mind this repo only includes the backend, you will also need fork niidl's client side repo which can be found here:
[niidl-client](https://github.com/niidl/niidl-client)

### Prerequisites

For this application, you will need to have PostgreSQL version 12 or later, along with Node version 16 or later.
To check your current version input the following command in your command terminal.
For the App run locally, you will need to run a npm installation at both locations via the following command.

- node
  ```sh
  node -v
  ```

For PostgreSQL, it will be a 2 step process, first to see if you have it installed.

- Postgres Installation check

  ```sh
  For Windows
  psql -U postgres

  For Mac
  psql
  ```

  If Postgres is not installed you will recieve an error.
  Otherwise, input the following to check your current version.

- Postgres Version
  ```sh
  SELECT version();
  ```
  You will also need to create a [![Firebase][firebase.js]][firebase-url] account for the authentication process, if you do not have one already.
  Our App's backend has been deployed using [![DigitalOcean][digitalocean]][digitalocean-url], which while pricy was our best option when taking into account potential growth, as well as the volume of data needed stored.
  If you wish to deploy the App for free, we currently reccomend [![Render][render.com]][render-url] as it is one of the few free deployment platform on the market, but please be aware that it can be quite slow.

### Installation

_Below you will find the basics on installation and set up._
_Please note you will need to follow the steps found on [niidl-client](https://github.com/niidl/niidl-client)before any deployment can be done._

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Module Installation
   ```sh
   npm install
   ```
3. Create a Postgres Database
   ```sh
   -psql postgres
   CREATE DATABASE db_name_here
   ```
4. Configure .env File
   _Create a .env file in your ROOT directory with the following_
   ```js
   DATABASE_URL = 'postgresql://postgres:test@localhost:5432/db_name_here';
   GITHUB_ACCESS_TOKEN = accessTokenHere;
   ```
   This App makes use of the GitHub API, while the project can be made without an API key, you will be limited to 50 calls an hour. Information on how to get your own Access Token can be found [here](https://docs.github.com/en/rest?apiVersion=2022-11-28).
5. Migration and Seeds via Prisma
   ```sh
   npm run build-db
   ```
6. Run Server
   The default port is set to localhost:8080.
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Basic Outline

The following is a rough breakdown for the server side of the application.

### Database/Schema

For a better understanding of the existing schema, please look at the schema file located at ./niidl-server/prisma/schema.prisma. Documentation for [![Prisma][prisma]][prisma-url] can be found on their site.

### Major APIs Used

For this project, we make use of several APIs including [![Firebase][firebase]][firebase-url] and [GitHub](https://docs.github.com/en/rest?apiVersion=2022-11-28).

#### Firebase

[![Firebase][firebase]][firebase-url] is used for authentication via GitHub exclusively. Using it's framework, we handle user sign in and keep user data secure. Because we create our own session tokens via Crypto by [![Node][node.js]][node-url] we query for Firebase for the following:

- UID
- Email
  These are then used in the query to the GitHub API to ensure we are accessing the correct user. As Username and Photo can be changed at any point, those are updated each time a user logs in, while the rest remain constant.

#### GitHub API

The documentation for [GitHub's API](https://docs.github.com/en/rest?apiVersion=2022-11-28) is extensive and is utilized throughout the build. It is used to get information including the following:

- User Info
  - Username
  - GitHub Photo
- Repository Info
  - Repo Name
  - Repo Issues
  - Repo Code

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

The usage for this resource as stated above is to create an place for coders to collaborate on projects with a more robust search function and better filtering. As GitHub primarily filters off languages and keywords, this tends to leave much to be desired when looking for a project that resonates with engineers looking to help others. We also wanted a place where reletivly inexperienced coders would have the opportunity to offer their skills without feeling judged. We know how high the perceived barrier to entry can be for working on "major projects" and wanted to make that feel more accessable.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

#### MVP

- [x] Broader search via GitHub API
  - [x] Incorporate opensource projects
  - [x] Limit functionality to promote project creation through niidl
- [x] Secure authentication via Firebase
  - [x] Cookie utilization
- [x] User Features
  - [x] Built out user dashboard
- [x] Discussion Features
  - [x] Sub pages to allow for navigation through
  - [x] Add tabs including new ideas, pinned threads, most popular
  - [x] Allow for upvoting of comments/threads
  - [x] Edit/Delete comments/threads
  - [x] All comments/threads have markdown capability
- [x] UI/UX
  - [x] Redirect to Thread/Project on creation
  - [x] Cover messege box with login/signup display if not logged in
  - [x] Search bar with past history

#### V 1.1

- [x] Cookie Modal on first login
- [x] Split tags into categories (language/discriptors)
- [x] Validate GitHub owner so users can only upload their own projects
- [x] Add profile pictures to messages
- [x] Loading animation for transitions
- [x] Allow for markdown to include inline code

#### Future Implementations

- [ ] Multi-language Support
- [ ] Further user dashboard personalization
- [ ] Continue refinement of project categorization and filtering

See the [open issues](https://github.com/Screamtothevoid/Rage/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

- Takuya Stern - [@TrenchTemplar](https://github.com/TrenchTemplar) - AndrewTakuya@gmail.com
- Kaire Montenegro - [@Kai-Animator](https://github.com/Kai-Animator) - kaireml@protonmail.com
- Hideki Fabio Hirose - [@fabiohidekihirose](https://github.com/fabiohidekihirose) - fabiohidekihirose@gmail.com
- Adrian Ang - [@adrianang](https://github.com/adrianang) - adriancbang@gmail.com
- Bryan Cendales - [@MrBCendales](https://github.com/MrBCendales) - bn.cendales10@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

It's impossible to add every single resource that helped to make this possible, but below you will find a few.

- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[typescript]: https://img.shields.io/badge/TypeScript-007acc?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[node.js]: https://img.shields.io/badge/node.js-000000?style=for-the-badge&logo=nodedotjs&logoColor=66cc33
[node-url]: https://nodejs.org/en/
[express.js]: https://img.shields.io/badge/express.js-black?style=for-the-badge
[express-url]: https://expressjs.com/
[prisma]: https://img.shields.io/badge/Prisma-002e63?style=for-the-badge&logo=prisma&logoColor=white
[prisma-url]: https://www.prisma.io/
[postgresql]: https://img.shields.io/badge/PostgreSQL-008bb9?style=for-the-badge&logo=postgresql&logoColor=white
[postgresql-url]: https://www.postgresql.org/
[digitalocean]: https://img.shields.io/badge/DigitalOcean-0080FF?style=for-the-badge&logo=digitalocean&logoColor=white
[digitalocean-url]: https://www.digitalocean.com
[docker]: https://img.shields.io/badge/docker-384d54?style=for-the-badge&logo=docker&logoColor=0db7ed
[docker-url]: https://www.docker.com
