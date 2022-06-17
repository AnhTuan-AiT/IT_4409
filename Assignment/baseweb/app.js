import http from "http";
import { router } from "./src/router/Router.js";

const hostname = "127.0.0.1";
const port = 3000;
export const baseURL = `http://${hostname}:${port}/`;

// create server
const server = http.createServer((req, res) => {
  router(req, res);
});

// start server on port 3000
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
