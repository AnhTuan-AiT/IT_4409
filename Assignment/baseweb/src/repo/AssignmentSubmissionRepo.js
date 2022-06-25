import { pool } from "../config/db.js";

export class AssignmentSubmissionRepo {
  constructor() {}

  getSubmitedFilenameOf = async (assignmentId, studentId) => {
    const text = `select
	eas.original_file_name
from
	edu_assignment_submission eas
where
	eas.assignment_id = $1
	and eas.student_id = $2`;

    const values = [assignmentId, studentId];
    return pool.query(text, values);
  };
}
