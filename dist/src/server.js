"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverEndpoints = void 0;
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
const cors = require('cors');
server.use(express_1.default.json());
server.use(cors());
const serverEndpoints = () => {
    // USER
    // getEndpoints
    server.get('/', (req, res) => {
        res.send('Niidl Server is Running in TS');
    });
    return server;
};
exports.serverEndpoints = serverEndpoints;
