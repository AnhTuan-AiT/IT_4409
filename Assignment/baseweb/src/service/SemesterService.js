import {SemesterRepo} from "../repo/SemesterRepo.js"

export class SemesterService {
    constructor(){
        this.semesterRepo = new SemesterRepo();
    }

    findAll = async() => {
        const semester = this.semesterRepo.findAll();

        return {
            semester: semester.rows[0]
        };
    }
}