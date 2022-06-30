import { EduCourseRepo } from "../repo/EduCourseRepo.js"

export class CourseService {
    constructor() {
        this.eduCouseRepo = new EduCourseRepo();
    }

    findAll =  async() => {
        const eduCourse = await this.eduCouseRepo.findAll();
        return {
            eduCourse: eduCourse.rows[0]
        };
    }
}