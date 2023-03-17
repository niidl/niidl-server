import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import * as projectsController from './projects/projects.controller';

const server: Express = express();

server.use(express.json());
server.use(cors());

const serverEndpoints = () => {
  // USER
  // getEndpoints
  server.get('/projects', projectsController.index);

  server.get('/projects/:id', (req: Request, res: Response) => {
    projectsController.view(req, res);
  });

  server.post('/projects', (req: Request, res: Response) => {
    projectsController.save(req, res);
  });

  return server;
};

export { serverEndpoints };
