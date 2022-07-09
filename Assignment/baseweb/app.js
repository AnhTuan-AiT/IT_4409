import http from "http";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { router } from "./src/router/Router.js";

const hostname = "127.0.0.1";
const port = 8080;
export const baseURL = `http://${hostname}:${port}/`;

// create server
const server = http.createServer((req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    router(req, res);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end(e);
  }
});

// start server on port 8080
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const rootPath = __dirname + "\\data";
