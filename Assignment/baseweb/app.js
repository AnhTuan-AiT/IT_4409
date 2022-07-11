import http from "http";
// import { dirname } from "path";
// import { fileURLToPath } from "url";
import { router } from "./src/router/Router.js";

const hostname = "127.0.0.1";
const port = 8081;
export const baseURL = `http://${hostname}:${port}/`;

// create server
const server = http.createServer((req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE",
    "Access-Control-Max-Age": 2592000, // 30 days
    "Access-Control-Allow-Headers": "Content-Type",
    /** add other headers as per requirement */
  };

  if (req.method === "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
    return;
  }

  if (["GET", "POST", "PUT", "DELETE"].indexOf(req.method) === -1) {
    res.writeHead(405, headers);
    res.end(`${req.method} is not allowed for the request.`);
    return;
  }

  try {
    Object.entries(headers).forEach((item) => {
      res.setHeader(item[0], item[1]);
    });

    res.setHeader("Content-Type", "application/json");
    router(req, res);
  } catch (e) {
    console.log(e);
    res.writeHead(500, headers);
    res.end(JSON.stringify(e));
  }
});

// start server on port 8080
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// export const rootPath = __dirname + "\\data";
