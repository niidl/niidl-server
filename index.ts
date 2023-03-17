import { serverEndpoints } from "./src/server";

const server = serverEndpoints();

const PORT: number = 4000;

server.listen(PORT, () => {
  console.info(`⚡️[Niidl Server]: Is listening to PORT: ${PORT}`);
});
