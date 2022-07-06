import { ClassController } from "../../controller/ClassController.js";
import { HTTP_METHOD } from "../../utils/constant.js";

const controller = new ClassController();
export const classRouteConfig = [
  // {
  //   method: HTTP_METHOD.POST,
  //   path: "/",
  //   handler: controller.getClassesOfCurrSemester,
  // },

  {
    method: HTTP_METHOD.POST,
    path: "/register",
    handler: controller.register,
  },
  {
    method: HTTP_METHOD.GET,
    path: "/get-classes-of-user",
    handler: controller.getClassesOfUser,
  },
  {
    method: HTTP_METHOD.GET,
    path: "/get-role-list-educlass-userlogin",
    handler: controller.getRoleListEduClassUserLogin,
  },
  {
    method: HTTP_METHOD.GET,
    path: "/update-class-status",
    handler: controller.updateClassStatus,
  },
  {
    method: HTTP_METHOD.GET,
    path: "/students",
    handler: controller.getStudentsOfClass,
  },
  {
    method: HTTP_METHOD.GET,
    path: "/registered-students",
    handler: controller.getRegistStudentsOfClass,
  },
  {
    method: HTTP_METHOD.PUT,
    path: "/registration-status",
    handler: controller.updateRegistStatus,
  },
  {
    method: HTTP_METHOD.GET,
    path: "/list/teacher",
    handler: controller.getClassesOfTeacher,
  },
  {
    method: HTTP_METHOD.GET,
    path: "/list/student",
    handler: controller.getClassesOfStudent,
  },
  {
    method: HTTP_METHOD.GET,
    path: "/assignments/teacher",
    handler: controller.getAssignOfClass4Teacher,
  },
  {
    method: HTTP_METHOD.GET,
    path: "/all-student-assignments/teacher",
    handler: controller.getAllStuAssignOfClass4Teacher,
  },
  // {
  //   method: HTTP_METHOD.GET,
  //   path: "/assignmentsSubmission/teacher",
  //   handler: controller.getAssignSubmitOfClass4Teacher,
  // },
  {
    method: HTTP_METHOD.GET,
    path: "/assignments/student",
    handler: controller.getAssignOfClass4Student,
  },
  {
    method: HTTP_METHOD.POST,
    path: "/add",
    handler: controller.addEduClass,
  },
  {
    method: HTTP_METHOD.GET,
    path: "/get-all-courses",
    handler: controller.getAllCourses,
  },
  {
    method: HTTP_METHOD.GET,
    path: "/get-all-semesters",
    handler: controller.getAllSemesters,
  },
  {
    method: HTTP_METHOD.GET,
    path: "/get-all-departments",
    handler: controller.getAllEduDepartments,
  },
  {
    method: HTTP_METHOD.GET,
    path: "/",
    handler: controller.getClassDetail,
  },
];
