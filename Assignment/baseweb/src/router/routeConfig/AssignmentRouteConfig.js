import { AssignmentController } from "../../controller/AssignmentController.js";
import { HTTP_METHOD } from "../../utils/constant.js";

const controller = new AssignmentController();
export const assignmentRouteConfig = [
  {
    method: HTTP_METHOD.GET,
    path: "/student",
    handler: controller.getAssignDetail,
  },
  {
    method: HTTP_METHOD.GET,
    path: "/teacher",
    handler: controller.getAssignDetail4Teacher,
  },
  {
    method: HTTP_METHOD.PUT,
    path: "/",
    handler: controller.updateAssign,
  },
  {
    method: HTTP_METHOD.POST,
    path: "/",
    handler: controller.createAssign,
  },
  {
    method: HTTP_METHOD.DELETE,
    path: "/",
    handler: controller.deleteAssign,
  },
];
