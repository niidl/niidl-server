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
        yield Promise.all(getUsers().map((user) => {
            return db_server_1.db.user_account.create({
                data: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    github_url: user.github_url,
                    user_name: user.user_name,
                },
            });
        }));
        yield Promise.all(getProjects().map((project) => {
            return db_server_1.db.projects.create({
                data: {
                    project_name: project.project_name,
                    description: project.description,
                    github_url: project.github_url,
                    owner: project.owner,
                    project_image: project.project_image,
                },
            });
        }));
        yield Promise.all(getThreads().map((thread) => {
            return db_server_1.db.threads.create({
                data: {
                    project_id: thread.project_id,
                },
            });
        }));
        yield Promise.all(getTagNames().map((tagName) => {
            return db_server_1.db.taglibrary.create({
                data: {
                    tag_name: tagName,
                },
            });
        }));
        yield Promise.all(getTags().map((tag) => {
            return db_server_1.db.tags.create({
                data: {
                    tag_name: tag.tag_name,
                    project_id: tag.project_id,
                },
            });
        }));
        yield Promise.all(getMessages().map((message) => {
            return db_server_1.db.messages.create({
                data: {
                    content: message.content,
                    user_id: message.user_id,
                    threads_id: message.threads_id,
                    creation_time: message.creation_time,
                },
            });
        }));
        yield Promise.all(getContributors().map((contributor) => {
            return db_server_1.db.contributors.create({
                data: {
                    user_id: contributor.user_id,
                    project_id: contributor.project_id,
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
            github_url: "repo",
            owner: 1,
            project_image: "image1",
        },
        {
            project_name: "any",
            description: "any",
            github_url: "any",
            owner: 2,
            project_image: "",
        },
    ];
}
function getUsers() {
    return [
        {
            first_name: "John",
            last_name: "Smith",
            email: "johnsmith@gmail.com",
            github_url: "github.com/johnsmith",
            user_name: "johnsmith2",
        },
        {
            first_name: "Mary",
            last_name: "Johnson",
            email: "maryjohnson@gmail.com",
            github_url: "github.com/maryjohnson",
            user_name: "maryjohnson10",
        },
        {
            first_name: "Amanda",
            last_name: "Jones",
            email: "amandajones@gmail.com",
            github_url: "github.com/amandajones",
            user_name: "amandajones10",
        },
        {
            first_name: "James",
            last_name: "Miller",
            email: "jamesmiller@gmail.com",
            github_url: "github.com/jamesmiller",
            user_name: "jamesmiller123",
        },
        {
            first_name: "Robert",
            last_name: "Willson",
            email: "robertwillson@gmail.com",
            github_url: "github.com/robertwillson",
            user_name: "robertwillson",
        },
    ];
}
function getThreads() {
    return [
        {
            project_id: 1,
        },
        {
            project_id: 1,
        },
        {
            project_id: 2,
        },
    ];
}
function getTags() {
    return [
        {
            tag_name: "React",
            project_id: 1,
        },
        {
            tag_name: "Python",
            project_id: 1,
        },
        {
            tag_name: "Health",
            project_id: 1,
        },
        {
            tag_name: "Java",
            project_id: 2,
        },
        {
            tag_name: "Next",
            project_id: 2,
        },
        {
            tag_name: "Education",
            project_id: 2,
        },
    ];
}
function getMessages() {
    return [
        {
            content: "new message",
            user_id: 3,
            threads_id: 2,
            creation_time: new Date(),
        },
        {
            content: "message about project",
            user_id: 4,
            threads_id: 3,
            creation_time: new Date(),
        },
    ];
}
function getContributors() {
    return [
        {
            user_id: 3,
            project_id: 1,
        },
        {
            user_id: 4,
            project_id: 1,
        },
        {
            user_id: 5,
            project_id: 2,
        },
    ];
}
function getTagNames() {
    return ["React", "Java", "Python", "Health", "Next", "Education"];
}
