import { AssignmentService } from "../service/AssignmentService.js";
import { ClassService } from "../service/ClassService.js";
import { RequestBody2JSON, URLSearchParams2JSON } from "../utils/http.js";

export class AssignmentController {
  constructor() {
    this.assignmentService = new AssignmentService();
    this.classService = new ClassService();
  }

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  getAssignDetail = async (req, res) => {
    const { assignmentId, userId } = URLSearchParams2JSON(req);

    const assignmentDetail = await this.assignmentService.getAssignmentDetail(
      userId,
      assignmentId
    );
    res.end(JSON.stringify(assignmentDetail));
  };

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  getAssignDetail4Teacher = async (req, res) => {
    const { assignmentId } = URLSearchParams2JSON(req);

    const assignmentDetail =
      await this.assignmentService.getAssignmentDetail4Teacher(assignmentId);

    res.end(JSON.stringify(assignmentDetail));
  };

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  createAssign = async (req, res) => {
    RequestBody2JSON(req, async (body) => {
      const responseBody = await this.assignmentService.createAssignment(body);
      res.status = responseBody.status;
      res.end(JSON.stringify(responseBody));
    });
  };

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  updateAssign = async (req, res) => {
    const { assignmentId } = URLSearchParams2JSON(req);
    RequestBody2JSON(req, async (body) => {
      const responseBody = await this.assignmentService.updateAssignment(
        assignmentId,
        {
          ...body,
          closeTime: new Date(body.closeTime),
          openTime: new Date(body.openTime),
        }
      );
      res.status = responseBody.status;
      res.end(JSON.stringify(responseBody));
    });
  };

  /**
   * done
   * @param {*} req
   * @param {*} res
   */
  deleteAssign = async (req, res) => {
    const { assignmentId } = URLSearchParams2JSON(req);

    const responseBody = await this.assignmentService.deleteAssignment(
      assignmentId
    );

    res.status = responseBody.status;
    res.end(JSON.stringify(responseBody));
  };
}
