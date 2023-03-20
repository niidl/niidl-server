import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import * as projectController from './project/project.controller';
import * as tagController from './tag/tag.controller';
import * as messageController from './message/message.controller';
import * as contributorController from './contributor/contributor.controller';
import * as threadController from './thread/thread.controller';

const server: Express = express();

server.use(express.json());
server.use(cors());

const serverEndpoints = () => {
  server.get('/projects', projectController.index);
  server.get('/projects/:projectId', projectController.view);
  server.post('/newProject', projectController.save);

  server.get('/tags/:projectId', tagController.index);
  server.get('/filterProjects/:filterTag', tagController.filter);
  server.get('/projects/:projectId/tags/:tagId', tagController.view);
  server.post('/newTag', tagController.save);

  server.get('/projects/:projectId/threads', threadController.index);
  server.get('/projects/:projectId/threads/:threadId', threadController.view);
  server.post('/newThread', threadController.save);

  server.get('/messages/:threadId', messageController.index);
  server.get(
    '/projects/:projectId/threads/:threadId/messages/:messageId',
    messageController.view
  );
  server.post('/newMessage', messageController.save);

  server.get('/contributors/:projectId', contributorController.index);
  server.get(
    '/projects/:projectId/contributors/:contributorId',
    contributorController.view
  );
  server.post('/newContributor', contributorController.save);

  return server;
};

export { serverEndpoints };
