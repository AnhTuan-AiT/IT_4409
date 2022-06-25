import { AssignmentRepo } from "../repo/AssignmentRepo.js";
import { AssignmentSubmissionRepo } from "../repo/AssignmentSubmissionRepo.js";

export class AssignmentService {
  constructor() {
    this.assignmentRepo = new AssignmentRepo();
    this.submissionRepo = new AssignmentSubmissionRepo();
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
}
