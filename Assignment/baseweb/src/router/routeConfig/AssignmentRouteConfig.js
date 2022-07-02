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
    handler: controller.updateAsign,
  },
  {
    method: HTTP_METHOD.POST,
    handler: controller.createAsign,
  },
  {
    method: HTTP_METHOD.DELETE,
    path: "/",
    handler: controller.deleteAsign,
  },
];


