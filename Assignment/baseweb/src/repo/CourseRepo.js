import { pool } from "../config/db.js";

export class CourseRepo {
  findById = async (id) => {
    const text = `select * from edu_course ec where ec.id = $1`;

    const values = [id];
    return pool.query(text, values);
  };

  findAll = async () => {
    const text = `select * from edu_course ec  order by ec.course_name`;
    return pool.query(text);
  };
}
