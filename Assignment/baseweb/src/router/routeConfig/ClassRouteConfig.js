import { ClassController } from "../../controller/ClassController.js";
import { HTTP_METHOD } from "../../utils/constant.js";

const controller = new ClassController();
export const classRouteConfig = [
  {
    method: HTTP_METHOD.GET,
    path: "/hello-world",
    handler: controller.helloWorld,
  },
];
