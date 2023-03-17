import { serverEndpoints } from "./src/server";

const server = serverEndpoints();

const PORT: number = 8080;

server.listen(PORT, () => {
  console.info(`⚡️[Niidl Server]: Is listening to PORT: ${PORT}`);
});
