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
exports.create = exports.getMessagesByThreadId = void 0;
const db_server_1 = require("../utils/db.server");
function getMessagesByThreadId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.db.messages.findMany({
            where: {
                threads_id: id,
            },
            select: {
                id: true,
                content: true,
                user_id: true,
                threads_id: true,
                creation_time: true,
                user: {
                    select: {
                        user_name: true,
                    },
                },
            },
        });
    });
}
exports.getMessagesByThreadId = getMessagesByThreadId;
function create(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.db.messages.create({
            data: payload,
            select: {
                id: true,
                content: true,
                creation_time: true,
                user_id: true,
                threads_id: true,
            },
        });
    });
}
exports.create = create;
