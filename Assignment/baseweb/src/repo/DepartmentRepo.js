import { pool } from "../config/db.js";

export class EduDepartmentRepo {
  constructor() {}

  save = async () => {};

  findAll = async () => {
    const text = `select * from edu_department ed order by ed.id`;
    return pool.query(text);
  };
}
