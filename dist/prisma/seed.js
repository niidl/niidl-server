"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_server_1 = require("../src/utils/db.server");
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Promise.all(getProjects().map((project) => {
            return db_server_1.db.projects.create({
                data: {
                    project_name: project.project_name,
                    description: project.description,
                    repo_url: project.repo_url,
                    owner: project.owner,
                },
            });
        }));
    });
}
seed();
function getProjects() {
    return [
        {
            project_name: "hikeable",
            description: "great app",
            repo_url: "repo",
            owner: "me",
        },
        {
            project_name: "any",
            description: "any",
            repo_url: "any",
            owner: "any",
        },
    ];
}
