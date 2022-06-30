import { pool } from "../config/db.js";

export class AssignmentRepo {
	constructor() { }

	getAssignmentDetail = async (id) => {
		const text = `select
	assignment_name "name",
	subject,
	close_time closeTime,
	open_time openTime,
	deleted
from
	edu_assignment ea
where
	ea.id = $1`;

		const values = [id];
		return pool.query(text, values);
	}

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
	eas.assignment_id = ?1
orderby
	eas.last_updated_stamp desc`;
		const values = [assignmentId];
		return pool.query(text, values);
	}

	getClassIdOf = async (assignmentId) => {
		const text = `select 
	cast(class_id as varchar)
from 
	edu_assignment ea
where
	ea.id=?1`;
		const values = [assignmentId];
		return pool.query(text, values);
	}

	getSubmissionsOf = async (assignmentId, studentIds) => {
		const text = `select 
	eas.student_id studentId,
	eas.original_file_name originalFileName
from 
	edu_assignment_submission eas
where
	eas.assignment_id = ?1
	and eas.student_id in ?2`;

		const values = [assignmentId, studentIds];
		return pool.query(text, values);
	}

	deleteAssignment = async (id) => {
		const text = `update 
	edu_assignment
set 
	deleted = true	
where
	id = ?1`;

		const values = [id];
		return pool.query(text, values);
	}

	isAssignExist = async (id) => {
		const text = `select 
	count(1)
from 
	edu_assignment ea
where
	id = ?1`;

		const values = [id];
		return pool.query(text, values);
	}

	getCloseTime = async (assignmentId) => {
		const text = `select 
	close_time
from 
	edu_assignment
where
	id = ?1
	and deleted = false`;

		const values = [assignmentId];
		return pool.query(text, values);
	}

	findByIdAndDeletedFalse = async (id) => {
		const text = `select 
	ea 
from 
	edu_assignment ea 
where 
	ea.id = ?1 
	and ea.deleted = false`;

		const values = [id];
		return pool.query(text, values);
	}

	hasDownloadingPermission = async (teacherId, assignmentId) => {
		const text = `select 
	count(1)
from 
	edu_assignment ea
inner join edu_class ec on
	ea.class_id = ec.id
where
	ea.id = ?2
	and ec.teacher_id = ?1`;

		const values = [teacherId, assignmentId];
		return pool.query(text, values);
	}
}
