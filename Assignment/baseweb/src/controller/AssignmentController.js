import { baseURL } from "../../app.js";
import { AssignmentService } from "../service/AssignmentService.js";

export class AssignmentController {
  constructor() {
    this.assignmentService = new AssignmentService();
  }

  getAssignDetail = async (req, res) => {
    const currentUrl = new URL(req.url, baseURL);
    const searchParams = currentUrl.searchParams;

    const assignmentId = searchParams.get("assignmentId");
    const studentId = searchParams.get("studentId");
    const assignmentDetail = await this.assignmentService.getAssignmentDetail(
      assignmentId,
      studentId
    );
    res.end(JSON.stringify(assignmentDetail));
  };
}
