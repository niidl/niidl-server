import express, { Express, Request, Response } from 'express';
const server: Express = express();

const cors = require('cors');

server.use(express.json());
server.use(cors());

const serverEndpoints = () => {
  // USER
  // getEndpoints
  server.get('/', (req: Request, res: Response) => {
    res.send('Niidl Server is Running in TS');
  })

  return server;

};

export { serverEndpoints };

