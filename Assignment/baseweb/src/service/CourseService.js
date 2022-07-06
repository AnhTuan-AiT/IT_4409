import { CourseRepo } from "../repo/EduCourseRepo.js";

export class CourseService {
  constructor() {
    this.courseRepo = new CourseRepo();
  }

  findAll = async () => {
    const queryResult = await this.courseRepo.findAll();

    const responseBody = queryResult.rows.map((row) => ({
      id: row.id,
      courseName: row.course_name,
      credit: row.credit,
      lastUpdatedStamp: row.last_updated_stamp,
      createdStamp: row.created_stamp,
    }));

    return responseBody;
  };
}
