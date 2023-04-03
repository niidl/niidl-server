import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import * as projectController from './project/project.controller';
import * as projectGHController from './project_github/project_github.controller';
import * as tagController from './tag/tag.controller';
import * as messageController from './message/message.controller';
import * as contributorController from './contributor/contributor.controller';
import * as threadController from './thread/thread.controller';
import * as tagNamesController from './tagNames/tagName.controller';
import * as userController from './user/user.controller';
import * as repositoryController from './repository/repository.controller';
import * as threadTagNamesController from './threadTagNames/threadTagNames.controller';
import * as upvoteThreadController from './upvoteThread/upvoteThread.controller';
import * as upvoteMessageController from './upvoteMessage/upvoteMessage.controller';
import * as projectTypesController from './projectTypes/projectTypes.controller';
import * as authController from './auth/auth.controller';
import cors from 'cors';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

const server: Express = express();
const csrfProtection = csurf({ cookie: { httpOnly: true } });
//to add for csrf protection to specific routes

//server.use(cors({ origin: true, allowedHeaders: 'Accept,Accept-Language,Content-Language,Content-Type,Authorization,Cookie,X-Requested-With,Origin,Host', credentials: true, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS' }));

const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

// Change bucket property to your Space name
const upload = multer({
  storage: multerS3({
    s3: s3 as any,
    bucket: 'niidl',
    acl: 'public-read',
    key: function (request, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
}).array('upload', 1);

server.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, DELETE, PUT, PATCH'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

server.use(cookieParser());
server.use(express.json());

const serverEndpoints = () => {
  server.get('/users', userController.index); //
  server.get('/users/data/:username', userController.view); //
  server.get('/users/messages/:username', userController.messages); //
  server.get('/users/projects/:username', userController.projects); //
  server.post('/userAuth', userController.save); //
  server.post('/logout', userController.logout); //
  server.delete('/users/:userId', userController.remove); //

  server.get('/githubProjects', projectGHController.index);
  server.get('/githubProjects/:projectId', projectGHController.view);
  server.get('/githubProjectsDemo', projectGHController.demo);
  server.get('/githubProjectsDemo/:id', projectGHController.demoView);
  
  server.get('/projects/:projectURL', projectController.saveFollowUp)

  server.get('/projects', projectController.index);
  server.get('/projects/:projectId', projectController.view);
  server.post('/projects/newProject', projectController.save);
  server.post('/projects/upload', projectController.uploadImage);
  server.patch('/projects/:projectId', projectController.edit);
  server.delete('/projects/:projectId', projectController.remove);

  server.get('/projects/:projectId/tags', tagController.index);
  server.get('/filterProjects/:filterTag', tagController.filter);
  server.get('/projects/:projectId/tags/:tagId', tagController.view);
  server.post('/projects/:projectId/newTag', tagController.save); //
  server.delete('/projects/:projectId/tags/:tagId', tagController.remove); //

  server.get('/projects/:projectId/threads', threadController.index);
  server.get('/projects/:projectId/threads/:threadId', threadController.view);
  server.post('/projects/:projectId/newThread', threadController.save); //
  server.put('/projects/:projectId/threads/:threadId', threadController.edit); //
  server.delete(
    '/projects/:projectId/threads/:threadId',
    threadController.remove
  ); //

  server.get(
    '/projects/:projectId/threads/:threadId/messages',
    messageController.index
  );
  server.get(
    '/projects/:projectId/threads/:threadId/messages/:messageId',
    messageController.view
  );
  server.post(
    '/projects/:projectId/threads/:threadId/newMessage',
    messageController.save
  ); //
  server.put(
    '/projects/:projectId/threads/:threadId/messages/:messageId',
    messageController.edit
  ); //
  server.delete(
    '/projects/:projectId/threads/:threadId/messages/:messageId',
    messageController.remove
  ); //

  server.get('/projects/:projectId/contributors', contributorController.index);
  server.get(
    '/projects/:projectId/contributors/:contributorId',
    contributorController.view
  );
  server.post(
    '/projects/:projectId/newContributor',
    contributorController.save
  ); //

  server.get(
    '/projects/:projectId/upvotes/:username',
    upvoteThreadController.index
  );
  server.post(
    '/projects/:projectId/threads/:threadId/upvotes/:username',
    upvoteThreadController.upvote
  );
  server.delete(
    '/projects/:projectId/threads/:threadId/upvotes/:username',
    upvoteThreadController.remove
  );

  server.get(
    '/projects/:projectId/threads/:threadId/upvotes/:username',
    upvoteMessageController.index
  );
  server.post(
    '/projects/:projectId/threads/:threadId/messages/:messageId/upvotes/:username',
    upvoteMessageController.upvote
  );
  server.delete(
    '/projects/:projectId/threads/:threadId/messages/:messageId/upvotes/:username',
    upvoteMessageController.remove
  );

  server.post('/repository/folder', repositoryController.folder);
  server.post('/repository/file', repositoryController.file);

  server.get('/tagNames', tagNamesController.index);
  server.get('/tagNames/tagOnly', tagNamesController.tagIndex);
  server.get('/tagNames/langOnly', tagNamesController.langIndex);

  server.get('/threadTagNames', threadTagNamesController.index);

  server.get('/projectTypes', projectTypesController.index);

  server.get(
    '/projects/:projectId/owner/:username',
    authController.projectToOwner
  );

  return server;
};

export { serverEndpoints };
