import { baseURL } from "../../app.js";
import { routesConfig } from "./routeConfig/AppRouteConfig.js";

export const router = async (req, res) => {
  const currentUrl = new URL(req.url, baseURL);
  const pathname = currentUrl.pathname;

  const route = routesConfig.find((c) => pathname.startsWith(c.path)); // first element in the provided array that satisfies the provided testing function

  if (route === undefined) {
    notFound(res);
  }

  routing(req, res, route.path, route.config);
};

const routing = async (req, res, requestMapping, routeConfig) => {
  const currentUrl = new URL(req.url, baseURL);
  const method = req.method;
  const pathname = currentUrl.pathname;

  const route = routeConfig.find(
    (c) =>
      method === c.method &&
      pathname.slice(requestMapping.length).startsWith(c.path)
  );

  if (undefined === route || undefined === route.handler) {
    notFound(res);
  }

  route.handler(req, res);
};

const notFound = (res) => {
  res.statusCode = 404;
  // res.setHeader("Content-Type", "text/plain");
  // res.end("Resource not found");
};
