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
exports.create = exports.getThreadsByProjectId = void 0;
const db_server_1 = require("../utils/db.server");
function getThreadsByProjectId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.db.threads.findMany({
            where: {
                project_id: id,
            },
            select: {
                id: true,
                project_id: true,
            },
        });
    });
}
exports.getThreadsByProjectId = getThreadsByProjectId;
function create(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.db.threads.create({
            data: payload,
            select: {
                id: true,
                // content: true,
                // creation_time: true,
                project_id: true,
                // title: true,
                // user_id: true,
            },
        });
    });
}
exports.create = create;
