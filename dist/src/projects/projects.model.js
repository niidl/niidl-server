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
exports.create = exports.getByFilterTag = exports.getById = exports.getAll = void 0;
const db_server_1 = require("../utils/db.server");
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.db.projects.findMany({
            select: {
                project_id: true,
                project_name: true,
                description: true,
                repo_url: true,
                owner: true,
            },
        });
    });
}
exports.getAll = getAll;
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.db.projects.findUnique({
            where: {
                project_id: id,
            },
        });
    });
}
exports.getById = getById;
function getByFilterTag(filterTag) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.db.projects.findMany({
            where: {
                project_id: filterTag,
            },
        });
    });
}
exports.getByFilterTag = getByFilterTag;
function create(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.db.projects.create({
            data: payload,
            select: {
                project_id: true,
                project_name: true,
                description: true,
                repo_url: true,
                owner: true,
            },
        });
    });
}
exports.create = create;
