import express, { Express, Request, Response } from "express";
import cors from "cors";
import * as projectController from "./project/project.controller";
import * as tagController from "./tag/tag.controller";
import * as messageController from "./message/message.controller";
import * as contributorController from "./contributor/contributor.controller";
import * as threadController from "./thread/thread.controller";

const server: Express = express();

server.use(express.json());
server.use(cors());

const serverEndpoints = () => {
  server.get("/projects", projectController.index);
  server.get("/projects/:projectId", projectController.view);
  server.post("/newProject", projectController.save);

  server.get("/tags/:projectId", tagController.view);
  server.get("/filterProjects/:filterTag", tagController.filter);
  server.post("/newTag", tagController.save);

  server.get("/threads/:projectId", threadController.view);
  server.post("/newThread", threadController.save);

  server.get("/messages/:threadId", messageController.view);
  server.post("/newMessage", messageController.save);

  server.get("/contributors/:projectId", contributorController.view);
  server.post("/newContributor", contributorController.save);

  return server;
};

export { serverEndpoints };
