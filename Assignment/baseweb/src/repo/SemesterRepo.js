import { pool } from "../config/db.js";

export class SemesterRepo {
  constructor() {}

  save = async () => {};

  findById = async (semesterId) => {
    const text = `select s from edu_semester s where s.id = ?1`;

    const values = [semesterId];
    return pool.query(text, values);
  };

  findAll = async () => {
    const text = `select * from edu_semester`;
    return pool.query(text);
  };

  findByActiveTrue = async () => {
    const text = `select * from edu_semester s where s.is_active = true`;

    return pool.query(text);
  };
}
