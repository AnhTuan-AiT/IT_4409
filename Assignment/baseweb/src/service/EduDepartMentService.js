import {EduDepartmentRepo} from "../repo/EduDepartmentRepo.js"

export class EduDepartmentService {
    constructor() {
        this.eduDepartmentRepo = new EduDepartmentRepo();
    }

    findAll = async() => {
        const department = await this.eduDepartmentRepo.findAll();

        return {
            department: department.rows[0]
        };
    }

}