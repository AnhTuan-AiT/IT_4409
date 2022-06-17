import { baseURL } from "../../app.js";
import { assignmentRouteConfig } from "./routeConfig/AssignmentRouteConfig.js";
import { classRouteConfig } from "./routeConfig/ClassRouteConfig.js";

const routesConfig = [
  {
    path: "/edu/class-management/class",
    config: classRouteConfig,
  },
  {
    path: "/edu/class-management/assignment",
    config: assignmentRouteConfig,
  },
];

export const router = (req, res) => {
  const currentUrl = new URL(req.url, baseURL);
  const pathname = currentUrl.pathname;

  const route = routesConfig.find((c) => pathname.startsWith(c.path));
  routing(req, res, route.path, route.config);
};

const routing = (req, res, requestMapping, routeConfig) => {
  const currentUrl = new URL(req.url, baseURL);
  const method = req.method;
  const pathname = currentUrl.pathname;

  const route = routeConfig.find(
    (c) =>
      method === c.method &&
      pathname.slice(requestMapping.length).startsWith(c.path)
  );

  route.handler(req, res);
};
