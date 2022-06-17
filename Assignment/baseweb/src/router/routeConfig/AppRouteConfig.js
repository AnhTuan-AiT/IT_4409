import { assignmentRouteConfig } from "./AssignmentRouteConfig.js";
import { classRouteConfig } from "./ClassRouteConfig.js";

export const routesConfig = [
  {
    path: "/edu/class-management/class",
    config: classRouteConfig,
  },
  {
    path: "/edu/class-management/assignment",
    config: assignmentRouteConfig,
  },
];
