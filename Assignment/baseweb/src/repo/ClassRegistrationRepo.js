import { pool } from "../config/db.js";

export class ClassRegistrationRepo {
  constructor() {}

  save = async (id, userId, status) => {
    const text = `insert
	into
	edu_class_registration (class_id,
	student_id,
	status
	)
values($1,$2,$3);`;

    const values = [id, userId, status];
    return pool.query(text, values);
  };

  updateStatus = async (id, userId, status) => {
    const text = `update
	edu_class_registration
set
	status = $3
where
	class_id = $1
	and student_id = $2`;

    const values = [id, userId, status];
    return pool.query(text, values);
  };

  checkRegistration = async (classID, studentId) => {
    const text = `select 
    status 
from 
    edu_class_registration 
where
    class_id = $1 
    and student_id = $2`;

    const values = [classID, studentId];
    return pool.query(text, values);
  };
}
