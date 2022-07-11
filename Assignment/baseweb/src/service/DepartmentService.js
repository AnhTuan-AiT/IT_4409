import { EduDepartmentRepo } from "../repo/DepartmentRepo.js";

export class EduDepartmentService {
  constructor() {
    this.departmentRepo = new EduDepartmentRepo();
  }

  findAll = async () => {
    const queryResult = await this.departmentRepo.findAll();

    const responseBody = queryResult.rows.map((row) => ({
      id: row.id,
      departmentName: row.department_name,
    }));

    return responseBody;
  };
}
