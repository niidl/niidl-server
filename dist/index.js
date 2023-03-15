"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./src/server");
const server = (0, server_1.serverEndpoints)();
const PORT = 4000;
server.listen(PORT, () => {
    console.info(`⚡️[Niidl Server]: Is listening to PORT: ${PORT}`);
});
