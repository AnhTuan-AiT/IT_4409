import { pool } from "../config/db.js";

export class AssignmentRepo {
  constructor() {}

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
  };
}
