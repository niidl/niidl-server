const express = require('express');
const server = express();

const cors = require('cors');

server.use(express.json());
server.use(cors());

const serverEndpoints = () => {
  // USER
  // getEndpoints
  server.get('/path/to', controller.getAllUsers)

  // PROJECTS
  // getEndpoints
  server.get('/path/to', controller.getAllProjects)

  return server;
};

module.exports = { serverEndpoints };
