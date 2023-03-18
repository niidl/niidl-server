"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverEndpoints = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const projectController = __importStar(require("./project/project.controller"));
const tagController = __importStar(require("./tag/tag.controller"));
const messageController = __importStar(require("./message/message.controller"));
const contributorController = __importStar(require("./contributor/contributor.controller"));
const threadController = __importStar(require("./thread/thread.controller"));
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use((0, cors_1.default)());
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
exports.serverEndpoints = serverEndpoints;
