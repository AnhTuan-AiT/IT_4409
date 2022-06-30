import { pool } from "../config/db.js";

export class EduClassUserLoginRoleRepo {
    constructor(){}

    save = async() => {

    }

    findAllByUserLoginIdAndThruDate = async(userLoginId, thruDate) => {
        const text = `select 
        e 
    from 
        EduClassUserLoginRole e 
    where 
        e.userLoginId = ?1 
        and e.thruDate = ?2`;

        const values = [userLoginId, thruDate];
        return pool.query(text, values);
    }
}