import { pool } from "../config/db.js";

export class AssignmentSubmissionRepo {
  constructor() { }

  findByAssignmentIdAndStudentUserLoginId = async(assignmentId, studentId) => {
    const text = `select 
  eas 
from 
  edu_assignment_submission eas 
where 
  eas.assignment.id = ?1 
  and eas.student.userLoginId = ?2`;

    const values = [assignmentId, studentId];
    return pool.query(text, values);
  }
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
  }

  checkSubmission = async (assignmentId) => {
    const text = `select
  count(1)
from
	edu_assignment_submission eas
where
	eas.assignment_id = $1
limit 1`;

    const values = [assignmentId];
    return pool.query(text, values);
  }

  
}


