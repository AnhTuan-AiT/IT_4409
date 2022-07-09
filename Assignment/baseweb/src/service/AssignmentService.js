import { assignmentDataPath } from "../config/storage.js";
import { AssignmentRepo } from "../repo/AssignmentRepo.js";
import { AssignmentSubmissionRepo } from "../repo/AssignmentSubmissionRepo.js";
import { ClassRepo } from "../repo/ClassRepo.js";
import { StorageService } from "./StorageService.js";
// import { EduClass } from "../entity/EduClass.js";
// import { Assignment } from "../entity/Assignment.js";
// import { ResponseFirstType } from "../exception/ResponseFirstType.js";
// import { SimpleResponse } from "../exception/SimpleResponse.js";

export class AssignmentService {
  constructor() {
    this.assignmentRepo = new AssignmentRepo();
    this.submissionRepo = new AssignmentSubmissionRepo();
    this.classRepo = new ClassRepo();
    this.storageService = new StorageService();
  }

  /**
   * done
   * @param {*} userId
   * @param {*} assignmentId
   * @returns
   */
  getAssignmentDetail = async (userId, assignmentId) => {
    let queryResult = await this.assignmentRepo.getAssignmentDetail(
      assignmentId
    );
    const assignmentDetail = queryResult.rows[0];

    queryResult = await this.submissionRepo.getSubmitedFilenameOf(
      assignmentId,
      userId
    );

    const submittedFileName = queryResult.rows[0]["original_file_name"];

    return {
      assignmentDetail: {
        name: assignmentDetail.name,
        subject: assignmentDetail.subject,
        deleted: assignmentDetail.deleted,
        closeTime: assignmentDetail.closetime,
        openTime: assignmentDetail.opentime,
      },
      submitedFileName: submittedFileName,
    };
  };

  /**
   * done
   * @param {*} assignmentId
   * @returns
   */
  getAssignmentDetail4Teacher = async (assignmentId) => {
    let queryResult = await this.assignmentRepo.getAssignmentDetail(
      assignmentId
    );
    const assignmentDetail = queryResult.rows[0];
    const classId = assignmentDetail.classid;

    queryResult = await this.submissionRepo.getStudentSubmissionsOf(
      assignmentId
    );
    const submissions = queryResult.rows;

    queryResult = await this.classRepo.getNoStudentsOf(classId);
    const noOfStudents = queryResult.rows[0].count;
    console.log(noOfStudents);
    const noSubmissions =
      noOfStudents == 0
        ? "0/0"
        : `${submissions.length}/${noOfStudents} (${
            (100 * submissions.length) / noOfStudents
          }%)`;

    return {
      assignmentDetail: {
        name: assignmentDetail.name,
        subject: assignmentDetail.subject,
        deleted: assignmentDetail.deleted,
        closeTime: assignmentDetail.closetime,
        openTime: assignmentDetail.opentime,
      },
      submissions: submissions.map((s) => ({
        studentId: s.studentid,
        name: s.name,
        submissionDate: s.submissiondate,
        originalFileName: s.originalfilename,
      })),
      noSubmissions: noSubmissions,
    };
  };

  /**
   * done
   * @param {*} id
   * @returns
   */
  deleteAssignment = async (id) => {
    await this.assignmentRepo.deleteAssignment(id);
    return { status: 200, errors: [] };
  };

  /**
   * done
   * @param {*} Date
   * @param {*} openTime
   * @param {*} Date
   * @param {*} closeTime
   * @returns
   */
  validateTime = (openTime, closeTime) => {
    let res = { status: 400, errors: [] };

    const open = new Date(openTime);
    if (open.getTime() < new Date().getTime()) {
      res.errors.push({
        location: "openTime",
        type: "require future date",
        message: "Vui lòng chọn thời điểm trong tương lai",
      });
    }

    const close = new Date(closeTime);
    if (open.getTime() > close.getTime()) {
      res.errors.push({
        location: "closeTime",
        type: "require subsequent date",
        message: "Vui lòng chọn thời điểm sau ngày giao",
      });
    }

    return res;
  };

  /**
   * done
   * @param {*} im
   * @returns
   */
  createAssignment = async (im) => {
    let res;
    res = this.validateTime(im.openTime, im.closeTime);

    if (res.errors.length > 0) {
      return res;
    } else {
      res.status = 200;
    }

    let queryResult = this.classRepo.isClassExist(im.classId);
    const isClassExist = (await queryResult).rows[0].count;

    if (1 != isClassExist) {
      res.errors.push({
        location: "classId",
        type: "not exist",
        message: "Lớp không tồn tại",
      });
      return res;
    }

    let assignment = {
      name: im.name?.trim(),
      subject: im.subject,
      openTime: new Date(im.openTime),
      closeTime: new Date(im.closeTime),
      classId: im.classId,
    };

    queryResult = await this.assignmentRepo.save(assignment);
    assignment = (await queryResult).rows[0];

    try {
      this.storageService.createFolder(assignmentDataPath + assignment.id);
    } catch (error) {
      console.log("ERROR in method createAssignment()", error);
    }

    return res;
  };

  /**
   * done
   * @param {*} id
   * @param {*} im
   * @returns
   */
  updateAssignment = async (id, im) => {
    let res = { status: 400, errors: [] };
    let queryResult = await this.assignmentRepo.findByIdAndDeletedFalse(id);
    let assignment = queryResult.rows[0];

    if (!assignment) {
      res.errors.push({
        location: "id",
        type: "not exist",
        message: "Bài tập không tồn tại",
      });
    } else {
      // Validate open and close time.
      const currTime = new Date();

      // Error: open time> close time.
      if (im.openTime.getTime() > im.closeTime.getTime()) {
        res.errors.push({
          location: "closeTime",
          type: "require subsequence date",
          message: "Vui lòng chọn thời điểm sau ngày giao",
        });
      }

      // Validate open time.
      // Old open time < current, only close time modification is allowed.
      if (new Date(assignment.opentime).getTime() < currTime.getTime()) {
        if (new Date(assignment.opentime).getTime() !== im.openTime.getTime()) {
          res.errors.push({
            location: "openTime",
            type: "not allowed changing",
            message: "Vui lòng chọn thời điểm ban đầu vì bài tập đã được giao",
          });

          return res;
        }
      } else {
        // Allow to modify both open and close time.
        // Error: new open time < current.
        if (im.openTime.getTime() < currTime.getTime()) {
          res.errors.push({
            location: "openTime",
            type: "require future date",
            message: "Vui lòng chọn thời điểm trong tương lai",
          });

          return res;
        }
      }

      // Validate close time.
      if (new Date(assignment.closetime).getTime() !== im.closeTime.getTime()) {
        if (im.closeTime.getTime() < currTime.getTime()) {
          res.errors.push({
            location: "closeTime",
            type: "invalid change",
            message: "Vui lòng chọn thời điểm ban đầu hoặc trong tương lai",
          });
        }
      }

      if (res.errors.length > 0) {
        return res;
      }
    }

    // Valid update.
    assignment = {};
    assignment.id = id;
    assignment.name = im.name?.trim();
    assignment.subject = im.subject;
    assignment.openTime = im.openTime;
    assignment.closeTime = im.closeTime;

    this.assignRepo.update(assignment);

    res = { status: 200, errors: [] };
    return res;
  };
}
