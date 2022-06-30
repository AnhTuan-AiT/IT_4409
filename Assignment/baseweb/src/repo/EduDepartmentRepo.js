import { pool } from "../config/db.js";

export class EduDepartmentRepo {
    constructor(){}

    save = async(id, name) => {
        const text = `insert into edu_department values(?1, ?2)`;

        values = [id, name];
        return pool.query(text, values);
    }
}