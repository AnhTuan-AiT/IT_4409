import { baseURL } from "../../app.js";
import { ClassService } from "../service/ClassService.js";
import { CourseService } from "../service/CourseService.js";
import { EduDepartmentService } from "../service/EduDepartmentService.js";
import { SemesterService } from "../service/SemesterService.js";
import { RequestBody2JSON, URLSearchParams2JSON } from "../utils/http.js";

export class ClassController {
  constructor() {
    this.classService = new ClassService();
    this.courseService = new CourseService();
    this.semesterService = new SemesterService();
    this.departmentService = new EduDepartmentService();
  }

  // getClassesOfCurrSemester = async (req, res) => {
  //   const currentUrl = new URL(req.url, baseURL);
  //   const searchParams = currentUrl.searchParams;

  //   const { userId, page, size } = URLSearchParams2JSON(searchParams);

  //   RequestBody2JSON(req, async (body) => {
  //     if (null === page) {
  //       page = 0;
  //     }

  //     if (null === size) {
  //       size = 20;
  //     }

  //     const a = await this.classService.getClassesOfCurrentSemester(
  //       userId,
  //       body,
  //       page,
  //       size
  //     );

  //     res.end(JSON.stringify(a));
  //   });
  // };

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  register = async (req, res) => {
    const currentUrl = new URL(req.url, baseURL);
    const searchParams = currentUrl.searchParams;

    const { userId } = URLSearchParams2JSON(searchParams);

    RequestBody2JSON(req, async (body) => {
      const responseBody = await this.classService.register(
        body.classId,
        userId
      );

      res.end(JSON.stringify(responseBody));
    });
  };

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  getClassesOfUser = async (req, res) => {
    const currentUrl = new URL(req.url, baseURL);
    const searchParams = currentUrl.searchParams;

    const { userLoginId: userId } = URLSearchParams2JSON(searchParams);

    const eduClasses = await this.classService.getClassOfUser(userId);
    res.end(JSON.stringify(eduClasses));
  };

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  getRoleListEduClassUserLogin = async (req, res) => {
    const lst = [];
    lst.push({ roleId: "PARTICIPANT", description: "Người tham gia" });
    lst.push({ roleId: "OWNER", description: "Người tạo và sở hữu" });
    lst.push({ roleId: "MANAGER", description: "Người quản lý" });

    res.end(JSON.stringify(lst));
  };

  /**
   * done
   * @param {*} req
   * @param {*} res
   * @returns
   */
  updateClassStatus = async (req, res) => {
    const currentUrl = new URL(req.url, baseURL);
    const searchParams = currentUrl.searchParams;

    const { classId, status } = URLSearchParams2JSON(searchParams);

    await this.classService.updateClassStatus(classId, status);
    res.end(JSON.stringify("OK"));
  };

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  getStudentsOfClass = async (req, res) => {
    const currentUrl = new URL(req.url, baseURL);
    const searchParams = currentUrl.searchParams;

    const { id } = URLSearchParams2JSON(searchParams);
    const students = await this.classService.getStudentsOfClass(id);
    res.end(JSON.stringify(students));
  };

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  getRegistStudentsOfClass = async (req, res) => {
    const currentUrl = new URL(req.url, baseURL);
    const searchParams = currentUrl.searchParams;

    const { id } = URLSearchParams2JSON(searchParams);

    const lst = await this.classService.getRegistStudentsOfClass(id);
    res.end(JSON.stringify(lst));
  };

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  updateRegistStatus = async (req, res) => {
    RequestBody2JSON(req, async (body) => {
      console.log(body);
      const responseBody = await this.classService.updateRegistStatus(
        body.classId,
        body.studentIds,
        body.status
      );

      res.end(JSON.stringify(responseBody));
    });
  };

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  getClassesOfTeacher = async (req, res) => {
    const currentUrl = new URL(req.url, baseURL);
    const searchParams = currentUrl.searchParams;

    const { teacherId } = URLSearchParams2JSON(searchParams);

    const classes = await this.classService.getClassesOfTeacher(teacherId);
    res.end(JSON.stringify(classes));
  };

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  getClassesOfStudent = async (req, res) => {
    const currentUrl = new URL(req.url, baseURL);
    const searchParams = currentUrl.searchParams;

    const { studentId } = URLSearchParams2JSON(searchParams);

    const classes = await this.classService.getClassesOfStudent(studentId);
    res.end(JSON.stringify(classes));
  };

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  getClassDetail = async (req, res) => {
    const currentUrl = new URL(req.url, baseURL);
    const searchParams = currentUrl.searchParams;

    const { id } = URLSearchParams2JSON(searchParams);
    const classDetail = await this.classService.getClassDetail(id);
    res.end(JSON.stringify(classDetail));
  };

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  getAssignOfClass4Teacher = async (req, res) => {
    const currentUrl = new URL(req.url, baseURL);
    const searchParams = currentUrl.searchParams;

    const { id } = URLSearchParams2JSON(searchParams);
    const assignments = await this.classService.getAssign4Teacher(id);
    res.end(JSON.stringify(assignments));
  };

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  getAllStuAssignOfClass4Teacher = async (req, res) => {
    const currentUrl = new URL(req.url, baseURL);
    const searchParams = currentUrl.searchParams;

    const { id } = URLSearchParams2JSON(searchParams);
    const assignments = await this.classService.getAllStuAssign4Teacher(id);
    res.end(JSON.stringify(assignments));
  };

  /**
   * done
   */
  // getAssignSubmitOfClass4Teacher = async (req, res) => {
  //   const currentUrl = new URL(req.url, baseURL);
  //   const searchParams = currentUrl.searchParams;

  //   const { id } = URLSearchParams2JSON(searchParams);
  //   const submissions = await this.classService.getAssignSubmit4Teacher(id);
  //   res.end(JSON.stringify(submissions));
  // };

  getAssignOfClass4Student = async (req, res) => {
    const currentUrl = new URL(req.url, baseURL);
    const searchParams = currentUrl.searchParams;

    const { id } = URLSearchParams2JSON(searchParams);
    const assignments = await this.classService.getAssign4Student(id);
    res.end(JSON.stringify(assignments));
  };

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  addEduClass = async (req, res) => {
    const currentUrl = new URL(req.url, baseURL);
    const searchParams = currentUrl.searchParams;

    const { teacherId } = URLSearchParams2JSON(searchParams);

    RequestBody2JSON(req, async (body) => {
      const responseBody = await this.classService.save(teacherId, body);
      res.end(JSON.stringify(responseBody));
    });
  };

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  getAllCourses = async (req, res) => {
    const courses = await this.courseService.findAll();
    res.end(JSON.stringify(courses));
  };

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  getAllSemesters = async (req, res) => {
    const semesters = await this.semesterService.findAll();
    res.end(JSON.stringify(semesters));
  };

  /**
   * done
   * @returns
   */
  getAllEduDepartments = async (req, res) => {
    const departments = await this.departmentService.findAll();
    res.end(JSON.stringify(departments));
  };
}
