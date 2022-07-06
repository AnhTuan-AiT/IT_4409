import { SemesterRepo } from "../repo/SemesterRepo.js";

export class SemesterService {
  constructor() {
    this.semesterRepo = new SemesterRepo();
  }

  /**
   * done
   */
  findAll = async () => {
    const queryResult = await this.semesterRepo.findAll();

    const responseBody = queryResult.rows.map((row) => ({
      id: row.id,
      semesterName: row.semester_name,
      lastUpdatedStamp: row.last_updated_stamp,
      createdStamp: row.created_stamp,
      isActive: row.is_active,
    }));

    return responseBody;
  };
}
