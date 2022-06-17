import { AssignmentController } from "../../controller/AssignmentController.js";
import { HTTP_METHOD } from "../../utils/constant.js";

const controller = new AssignmentController();
export const assignmentRouteConfig = [
  {
    method: HTTP_METHOD.GET,
    path: "/hello-world",
    handler: controller.helloWorld,
  },
];
