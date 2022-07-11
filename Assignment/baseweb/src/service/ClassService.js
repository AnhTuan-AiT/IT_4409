import _ from "underscore";
import { ClassRegistrationRepo } from "../repo/ClassRegistrationRepo.js";
import { ClassRepo } from "../repo/ClassRepo.js";
import { EduClassUserLoginRoleRepo } from "../repo/ClassUserRoleRepo.js";
import { CourseRepo } from "../repo/CourseRepo.js";
import { SemesterRepo } from "../repo/SemesterRepo.js";

export class ClassService {
  constructor() {
    this.semesterRepo = new SemesterRepo();
    this.classRepo = new ClassRepo();
    this.registRepo = new ClassRegistrationRepo();
    this.eduClassUserLoginRoleRepo = new EduClassUserLoginRoleRepo();
    this.courseRepo = new CourseRepo();

    _.mixin({
      isBlank: function (string) {
        return (
          _.isUndefined(string) ||
          _.isNull(string) ||
          string.trim().length === 0
        );
      },
    });
  }

  /**
   * done
   * @param {*} userId
   * @param {*} filterParams
   * @param {*} page
   * @param {*} size
   * @returns
   */
  getClassesOfCurrentSemester = async (userId, filterParams, page, size) => {
    let queryResult = await this.semesterRepo.findByActiveTrue();
    const { id: semesterId } = queryResult.rows[0];

    let classes;
    let registeredClasses = new Set();

    const { courseId, courseName, classType, departmentId, code, classCode } =
      filterParams;

    if (
      _(courseId).isBlank() &&
      _(courseName).isBlank() &&
      _(classType).isBlank() &&
      _(departmentId).isBlank() &&
      null === code
    ) {
      queryResult = await this.classRepo.findBySemester(
        semesterId,
        "OPEN",
        page,
        size
      );

      classes = {
        content: queryResult.rows.map((row) => ({
          courseId: row.courseid,
          classCode: row.classcode,
          departmentId: row.departmentid,
          classType: row.classtype,
          courseName: row.coursename,
          code: row.code,
          id: row.id,
        })),
        totalElements: queryResult.rowCount,
        number: parseInt(page),
      };
    } else {
      queryResult = await this.classRepo.findBySemesterWithFilters(
        semesterId,
        undefined === code ? "" : code,
        undefined == classCode ? "" : classCode,
        undefined == courseId ? "" : courseId.replace(/ /g, ""),
        undefined == courseName ? "" : courseName.replace(/ /g, ""),
        undefined == classType ? "" : classType.replace(/ /g, ""),
        undefined == departmentId ? "" : departmentId.replace(/ /g, ""),
        page,
        size
      );

      classes = {
        content: queryResult.rows.map((row) => ({
          courseId: row.courseid,
          classCode: row.classcode,
          departmentId: row.departmentid,
          classType: row.classtype,
          courseName: row.coursename,
          code: row.code,
          id: row.id,
        })),
        totalElements: queryResult.rowCount,
        number: parseInt(page),
      };
    }

    if (0 < classes.content.length) {
      queryResult = await this.classRepo.getRegisteredClassesIn(
        userId,
        classes.content.map((cl) => cl.id)
      );

      registeredClasses = queryResult.rows.map((row) => row.class_id);
    }

    return {
      semesterId: semesterId,
      page: classes,
      registeredClasses: registeredClasses,
    };
  };

  /**
   * done
   * @param {*} classId
   * @param {*} userId
   * @returns
   */
  register = async (classId, userId) => {
    let queryResult = await this.classRepo.findById(classId);
    const cls = queryResult.rows[0];
    let res;

    if (undefined === cls) {
      res = {
        status: 400,
        error: "class not exist",
        message: "Không tìm thấy lớp " + classId,
      };
      return res;
    }

    queryResult = await this.registRepo.checkRegistration(classId, userId);

    let check = undefined;
    if (queryResult.rowCount > 0) {
      check = queryResult.rows[0].status;
    }

    if ("WAITING_FOR_APPROVAL" === check || "APPROVED" === check) {
      res = {
        status: 400,
        error: "invalid register",
        message: "Bạn đã đăng ký lớp này rồi",
      };
    } else {
      res = await this.createOrUpdateRegist(
        classId,
        userId,
        "WAITING_FOR_APPROVAL"
      );

      // push notification to admin
      // Notifications notifications = new Notifications();
      // notifications.setStatusId(Notifications.STATUS_CREATED);
      // notifications.setContent("SV " + studentId + " đăng ký vào lớp " + cls.getClassCode());
      // notifications.setToUser("admin");// TOBE upgraded
      // notifications.setFromUser(studentId);

      // notifications = notificationsRepo.save(notifications);
    }
    return res;
  };

  /**
   * done
   * @param {*} classId
   * @param {*} userId
   * @param {*} status
   * @returns
   */
  createOrUpdateRegist = async (classId, userId, status) => {
    let queryResult = await this.registRepo.checkRegistration(classId, userId);
    const regist = queryResult.rows[0];

    if (regist) {
      await this.registRepo.updateStatus(classId, userId, status);
    } else {
      await this.registRepo.save(classId, userId, status);
    }

    return { status: 200, error: null, message: null };
  };

  /**
   * done
   * @param {*} userId
   * @returns
   */
  getClassOfUser = async (userId) => {
    let queryResult =
      await this.eduClassUserLoginRoleRepo.findAllByUserLoginIdAndThruDate(
        userId,
        null
      );
    const lstRoles = queryResult.rows;

    const lst = [];
    for (const er of lstRoles) {
      queryResult = await this.classRepo.findById(er.class_id);
      const eduClass = queryResult.rows[0];

      if (eduClass != null) {
        queryResult = await this.courseRepo.findById(eduClass.course_id);
        const course = queryResult.rows[0];

        const e = {
          classId: eduClass.id,
          classCode: eduClass.class_code,
          courseId: course.id,
          courseName: course.course_name,
          semester: eduClass.semester_id,
          statusId: eduClass.status_id,
          createdByUserLoginId: eduClass.teacher_id,
        };

        lst.push(e);
      }
    }

    return lst;
  };

  /**
   * done
   * @param {*} classId
   * @param {*} status
   */
  updateClassStatus = async (classId, status) => {
    const queryResult = await this.classRepo.findById(classId);
    const eduClass = queryResult.rows[0];

    if (eduClass) {
      this.classRepo.updateStatus(classId, status);
    }
  };

  /**
   * done
   * @param {*} id
   * @returns
   */
  getStudentsOfClass = async (id) => {
    const queryResult = await this.classRepo.getStudentsOfClass(id, "APPROVED");
    return queryResult.rows;
  };

  /**
   * done
   * @param {*} id
   * @returns
   */
  getRegistStudentsOfClass = async (id) => {
    const queryResult = await this.classRepo.getStudentsOfClass(
      id,
      "WAITING_FOR_APPROVAL"
    );

    return queryResult.rows;
  };

  /**
   * done
   * @param {*} classId
   * @param {*} studentIds
   * @param {*} status
   * @returns
   */
  updateRegistStatus = async (classId, studentIds, status) => {
    let res = {};
    let queryResult = await this.classRepo.findById(classId);
    const cls = queryResult.rows[0];
    if (!cls) {
      res[classId] = {
        status: 404,
        error: "invalid update",
        message: "Không tìm thấy lớp",
      };

      return res;
    }
    for (const studentId of studentIds) {
      queryResult = await this.registRepo.checkRegistration(classId, studentId);
      const { status: check } = queryResult.rows[0];

      if (!check) {
        res[studentId] = {
          status: 404,
          error: "invalid update",
          message: "Không tìm thấy sinh viên, lớp hoặc yêu cầu đăng ký",
        };
      } else {
        switch (check) {
          case "WAITING_FOR_APPROVAL":
            // -> APPROVED || REFUSED
            if (status === "REMOVED") {
              res[studentId] = invalidUpdateRes();
            } else if (status === "WAITING_FOR_APPROVAL") {
              res[studentId] = {
                status: 200,
                error: null,
                message: null,
              };
            } else {
              res[studentId] = await this.createOrUpdateRegist(
                classId,
                studentId,
                status
              );
            }

            // Notifications notifications = new Notifications();
            // notifications.setToUser(studentId);
            // notifications.setContent("Bạn vừa được phê duyệt tham gia lớp " + cls.getClassCode());
            // notifications.setStatusId(Notifications.STATUS_CREATED);
            // notifications = notificationsRepo.save(notifications);

            break;
          case "APPROVED":
            // -> REMOVED.
            if (status === "REMOVED") {
              res[studentId] = await this.createOrUpdateRegist(
                classId,
                studentId,
                status
              );
            } else if (status === "APPROVED") {
              res[studentId] = {
                status: 200,
                error: null,
                message: null,
              };
            } else {
              res[studentId] = invalidUpdateRes();
            }

            break;
          case "REFUSED":
            // -> WAITING_FOR_APPROVAL.
            if (status === "WAITING_FOR_APPROVAL") {
              res[studentId] = await this.createOrUpdateRegist(
                classId,
                studentId,
                status
              );
            } else if (status === "REFUSED") {
              res[studentId] = {
                status: 200,
                error: null,
                message: null,
              };
            } else {
              res[studentId] = invalidUpdateRes();
            }
            break;
          case "REMOVED":
            // -> WAITING_FOR_APPROVAL.
            if (status === "WAITING_FOR_APPROVAL") {
              res[studentId] = await this.createOrUpdateRegist(
                classId,
                studentId,
                status
              );
            } else if (status === "REMOVED") {
              res[studentId] = {
                status: 200,
                error: null,
                message: null,
              };
            } else {
              res[studentId] = invalidUpdateRes();
            }
            break;
        }
      }
    }
    return res;
  };

  /**
   * done
   * @returns
   */
  invalidUpdateRes = () => ({
    status: 400,
    error: "invalid update",
    message: "Trạng thái mới không phù hợp",
  });

  /**
   * done
   * @param {*} teacherId
   * @returns
   */
  getClassesOfTeacher = async (teacherId) => {
    const queryResult = await this.classRepo.getClassesOfTeacher(teacherId);

    const responseBody = queryResult.rows.map((row) => ({
      id: row.id,
      code: row.code,
      classCode: row.classcode,
      statusId: row.statusid,
      courseId: row.courseid,
      name: row.name,
      classType: row.classtype,
      department: row.department,
      semester: row.semester,
    }));

    return responseBody;
  };

  /**
   * done
   * @param {*} studentId
   * @returns
   */
  getClassesOfStudent = async (studentId) => {
    const queryResult = await this.classRepo.getClassesDetailOf(studentId, [
      "APPROVED",
      "WAITING_FOR_APPROVAL",
    ]);

    const responseBody = queryResult.rows.map((row) => ({
      id: row.id,
      code: row.code,
      classCode: row.classcode,
      status: row.status,
      courseId: row.courseid,
      name: row.name,
      classType: row.classtype,
      semester: row.semester,
    }));

    return responseBody;
  };

  /**
   * done
   * @param {*} id
   * @returns
   */
  getClassDetail = async (id) => {
    const queryResult = await this.classRepo.getDetailOf(id);

    const responseBody = queryResult.rows.map((row) => ({
      id: row.id,
      code: row.code,
      courseId: row.courseid,
      name: row.name,
      classType: row.classtype,
      semester: row.semester,
      teacherName: row.teachername,
      email: row.email,
    }))[0];

    return responseBody;
  };

  /**
   * done
   * @param {*} classId
   * @returns
   */
  getAssign4Teacher = async (classId) => {
    const queryResult = await this.classRepo.getAssignments4Teacher(classId);
    const responseBody = queryResult.rows.map((row) => ({
      id: row.id,
      name: row.name,
      openTime: row.opentime,
      closeTime: row.closetime,
      deleted: row.deleted,
    }));

    return responseBody;
  };

  /**
   * done
   * @param {*} classId
   * @returns
   */
  getAllStuAssign4Teacher = async (classId) => {
    const getAllStuAssignDetail4TeacherList = [];
    let queryResult = await this.classRepo.getAllStudentAssignments4Teacher(
      classId
    );
    const getAllStuAssigns4TeacherList = queryResult.rows;

    let tempStudentId = "";
    let tempAssignmentId = "";
    for (const om of getAllStuAssigns4TeacherList) {
      if (om.id === tempStudentId) {
        if (om.assignmentid === tempAssignmentId) {
        } else {
          tempAssignmentId = om.assignmentId;
          const assignment = {
            assignmentId: om.assignmentid,
            assignmentName: om.assignmentname,
            assignmentStatus: om.assignmentsubmissionid === null ? 0 : 1,
          };

          const item =
            getAllStuAssignDetail4TeacherList[
              getAllStuAssignDetail4TeacherList.length - 1
            ];
          item.assignmentList.push(assignment);
          item.totalSubmitedAssignment += assignment.assignmentStatus;
        }
      } else {
        tempStudentId = om.id;
        tempAssignmentId = om.assignmentId;

        const assignment = {
          assignmentId: om.assignmentid,
          assignmentName: om.assignmentname,
          assignmentStatus: om.assignmentsubmissionid === null ? 0 : 1,
        };
        const getAllStuAssignDetail4Teacher = {
          studentId: om.id,
          studentName: om.name,
          assignmentList: [assignment],
          totalSubmitedAssignment: assignment.assignmentStatus,
        };

        getAllStuAssignDetail4TeacherList.push(getAllStuAssignDetail4Teacher);
      }
    }

    return getAllStuAssignDetail4TeacherList;
  };

  // getAssignSubmit4Teacher = async (classId) => {
  //   const queryResult = await this.classRepo.getAssignmentsSubmission4Teacher(
  //     classId
  //   );
  //   return queryResult.rows;
  // };

  /**
   * done
   * @param {*} classId
   * @returns
   */
  getAssign4Student = async (classId) => {
    const queryResult = await this.classRepo.getAssignments4Student(classId);
    const responseBody = queryResult.rows.map((row) => ({
      id: row.id,
      name: row.name,
      closeTime: row.closetime,
    }));

    return responseBody;
  };

  /**
   * done
   * @param {*} teacherId
   * @param {*} addClassDTO
   * @returns
   */
  save = async (teacherId, addClassDTO) => {
    let clazz = {};

    let queryResult = await this.classRepo.findByClassCode(
      addClassDTO.classCode
    );
    const dupClass = queryResult.rows;

    if (dupClass !== null && dupClass.length > 0) {
      clazz.message = "duplicate";
      return clazz;
    }

    clazz.code = 0;
    clazz.classCode = addClassDTO.classCode;
    clazz.departmentId = addClassDTO.departmentId;
    clazz.teacherId = teacherId;
    clazz.courseId = addClassDTO.courseId;
    clazz.semesterId = addClassDTO.semesterId;
    clazz.classType = addClassDTO.classType;

    await this.classRepo.save(clazz);
    queryResult = await this.classRepo.findByClassCode(addClassDTO.classCode);
    clazz = queryResult.rows[0];

    // create a corresponding role record in EduClassUserLoginRole
    const eduClassUserLoginRole = {};
    eduClassUserLoginRole.classId = clazz.id;
    eduClassUserLoginRole.userLoginId = teacherId;
    eduClassUserLoginRole.roleId = "OWNER";
    this.eduClassUserLoginRoleRepo.save(eduClassUserLoginRole);

    return clazz;
  };
}
