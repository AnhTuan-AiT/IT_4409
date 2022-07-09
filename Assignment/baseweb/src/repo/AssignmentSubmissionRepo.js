import { pool } from "../config/db.js";

export class AssignmentSubmissionRepo {
  getStudentSubmissionsOf = async (assignmentId) => {
    const text = `select
	eas.student_id studentId,
	concat(p.first_name, ' ', p.middle_name, ' ', p.last_name) "name",
	eas.last_updated_stamp submissionDate,
	eas.original_file_name originalFileName
from
	edu_assignment_submission eas
inner join user_login ul on
	eas.student_id = ul.user_login_id
inner join person p on
	ul.party_id = p.party_id
where
	eas.assignment_id = $1
order by
	eas.last_updated_stamp desc`;

    const values = [assignmentId];
    return pool.query(text, values);
  };

  findByAssignmentIdAndStudentUserLoginId = async (assignmentId, studentId) => {
    const text = `select 
  eas 
from 
  edu_assignment_submission eas 
where 
  eas.assignment.id = ?1 
  and eas.student.userLoginId = ?2`;

    const values = [assignmentId, studentId];
    return pool.query(text, values);
  };

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
  };
}
