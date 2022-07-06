import { pool } from "../config/db.js";

export class EduClassUserLoginRoleRepo {
  constructor() {}

  save = async ({ classId, userLoginId, roleId }) => {
    const text = `insert
	into
	edu_class_user_login_role (class_id,
	user_login_id,
	role_id)
values($1,$2,$3)
`;

    const values = [classId, userLoginId, roleId];
    return pool.query(text, values);
  };

  findAllByUserLoginIdAndThruDate = async (userId, thruDate) => {
    const text = `select 
        * 
    from 
        edu_class_user_login_role e 
    where 
        e.user_login_id = $1`;

    const values = [userId];
    return pool.query(text, values);
  };
}
