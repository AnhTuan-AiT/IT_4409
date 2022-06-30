import { pool } from "../config/db.js";

export class ClassRegistrationRepo {
    constructor() { }

    checkRegistration = async (classID, studentId) => {
        const text = `select 
    status 
from 
    edu_class_registration 
where
    class_id = ?1 
    and student_id = ?2`;

    const values = [classID, studentId];
    return pool.query(text, values);
    }
}