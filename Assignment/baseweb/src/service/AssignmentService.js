import { AssignmentRepo } from "../repo/AssignmentRepo.js";
import { AssignmentSubmissionRepo } from "../repo/AssignmentSubmissionRepo.js";
import { ClassRepo } from "../repo/ClassRepo.js";
// import { EduClass } from "../entity/EduClass.js";
// import { Assignment } from "../entity/Assignment.js";
// import { ResponseFirstType } from "../exception/ResponseFirstType.js";
// import { SimpleResponse } from "../exception/SimpleResponse.js";

export class AssignmentService {
  constructor() {
    this.assignmentRepo = new AssignmentRepo();
    this.submissionRepo = new AssignmentSubmissionRepo();
    this.classRepo = new ClassRepo();
  }

  getAssignmentDetail = async (assignmentId, studentId) => {
    const assignmentDetail = await this.assignmentRepo.getAssignmentDetail(
      assignmentId
    );
    const submitedFileName = await this.submissionRepo.getSubmitedFilenameOf(
      assignmentId,
      studentId
    );

    return {
      assignmentDetail: assignmentDetail.rows[0],
      submitedFileName: submitedFileName.rows[0]["original_file_name"],
    };
  };

  getAssignmentDetail4Teacher = async (assignmentId) => {
    const assignmentDetail = await this.assignmentRepo.getAssignmentDetail(
      assignmentId
    );
    const classId = await this.assignmentRepo.getClassIdOf(assignmentId);
    const submissions = await this.submissionRepo.getStudentSubmissionsOf(
      assignmentId
    );
    const noOfStudents = await this.ClassRepo.getNoStudentsOf(classId);

    const noSubmissions =
      noOfStudents == 0
        ? "0/0"
        : submissions.size() +
          "/" +
          noOfStudents +
          " (" +
          (100 * submissions.size()) / noOfStudents +
          "%)";

    return {
      assignmentDetail: assignmentDetail.rows[0],
      submissions: submissions.rows[0],
      noSubmissions,
    };
  };

  deleteAssignment = async (id) => {
    this.assignmentRepo.deleteAssignment(id);
    const res = new SimpleResponse(200, null, null);
    return res;
  };

  createAssignment = async (im) => {
    const res = new ResponseFirstType(200);
    res = validateTime(im.getOpenTime(), im.getCloseTime());

    if (res.getErrors().size() > 0) {
      return res;
    }
    const eduClass = new EduClass();
    if (1 == this.classRepo.isClassExist(im.getClassId())) {
      eduClass = new EduClass();
      eduClass.setId(im.getClassId());
    } else {
      res.addError("classId", "not exist", "Lớp không tồn tại");
      return res;
    }
    const assignment = new Assignment();

    assignment.setName(StringUtils.normalizeSpace(im.getName()));
    assignment.setSubject(im.getSubject());
    assignment.setOpenTime(im.getOpenTime());
    assignment.setCloseTime(im.getCloseTime());
    assignment.setEduClass(eduClass);

    assignment = assignRepo.save(assignment);
    try {
      storageService.createFolder(assignment.getId().toString());
    } catch (error) {
      console.log("ERROR in method createAssignment()");
    }
    return res;
  };

  updateAssignment = async (id, im) => {
    const res = new ResponseFirstType();
    const assignment = this.assignmentRepo.findByIdAndDeletedFalse(id);
    if (assignment == null) {
      res.addError("id", "not exist", "Bài tập không tồn tại");
    } else {
      const currTime = new Date();
      if (im.getOpenTime().compareTo(im.getCloseTime()) > 0) {
        res.addError(
          "closeTime",
          "require subsequence date",
          "Vui lòng chọn thời điểm sau ngày giao"
        );
      }
      if (assignment.getOpenTime().compareTo(currTime) < 0) {
        if (assignment.getOpenTime().compareTo(im.getOpenTime()) != 0) {
          res.addError(
            "openTime",
            "not allowed changing",
            "Vui lòng chọn thời điểm ban đầu vì bài tập đã được giao"
          );
          return res;
        }
      } else {
        if (im.getOpenTime().compareTo(currTime) < 0) {
          res.addError(
            "openTime",
            "require future date",
            "Vui lòng chọn thời điểm trong tương lai"
          );
          return res;
        }
      }
      if (assignment.getCloseTime().compareTo(im.getCloseTime()) != 0) {
        if (im.getCloseTime().compareTo(currTime) < 0) {
          res.addError(
            "closeTime",
            "invalid change",
            "Vui lòng chọn thời điểm ban đầu hoặc trong tương lai"
          );
        }
      }
      if (res.getErrors().size() > 0) {
        return res;
      }
    }
    assignment.setName(StringUtils.normalizeSpace(im.getName()));
    assignment.setSubject(im.getSubject());
    assignment.setOpenTime(im.getOpenTime());
    assignment.setCloseTime(im.getCloseTime());

    assignRepo.save(assignment);

    res = new ResponseFirstType(200);

    return res;
  };

  validateTime = async (openTime, closeTime) => {
    const res = new ResponseFirstType(400);

    if (openTime.compareTo(new Date()) < 0) {
      res.addError(
        "openTime",
        "require future date",
        "Vui lòng chọn thời điểm trong tương lai"
      );
    }

    if (openTime.compareTo(closeTime) > 0) {
      res.addError(
        "closeTime",
        "require subsequent date",
        "Vui lòng chọn thời điểm sau ngày giao"
      );
    }

    return res;
  };
}
