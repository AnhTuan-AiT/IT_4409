import { baseURL } from "../../app.js";
import { AssignmentService } from "../service/AssignmentService.js";
import { ClassService } from "../service/ClassService.js";

export class AssignmentController {
  constructor() {
    this.assignmentService = new AssignmentService();
    this.classService = new ClassService();
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

  getAssignDetail4Teacher = async (req, res) => {
    const currentUrl = new URL(req.url, baseURL);
    const searchParams = currentUrl.searchParams;

    const assignmentId = searchParams.get("assignmentId");
    const classId = await this.assignmentService.getClassIdOf(assignmentId);
    const noOfStudents = await this.classService.getNoStudentOf(classId);
    const submissions = await this.assignmentService.getStudentSubmissionsOf(assignmentId);
    const noSubmissions = noOfStudents == 0 ? "0/0" : submissions.size() +
      "/" +
      noOfStudents +
      " (" +
      100 * submissions.size() / noOfStudents +
      "%)";
    const assignmentDetail4Teacher = await this.assignmentService.getAssignmentDetail4Teacher(
      assignmentId,
      submissions,
      noSubmissions
    );
    res.end(JSON.stringify(assignmentDetail4Teacher))
  };

  createAsign = async (req, res) => {
    const assign = {
      classId: req.body.classId,
      name: req.body.name,
      openTime: req.body.openTime,
      closeTime: req.body.closeTime,
      subject: req.body.subject
    }

    assignmentService.createAsignment(assign).then(assign => {
      res.status(200).json({ asignment: assign })
    }).catch(err => {
      res.status(500).json({ error: err.message })
    });
  }

  updateAsign = async (req, res) => {
    const currentUrl = new URL(req.url, baseURL);
    const searchParams = currentUrl.searchParams;

    const assignmentId = searchParams.get("assignmentId");

    const assign = {
      classId: req.body.classId,
      name: req.body.name,
      openTime: req.body.openTime,
      closeTime: req.body.closeTime,
      subject: req.body.subject
    }
    
    this.assignmentService.updateAssignment(assignmentId, assign).then(assign => {
      res.status(200).json({ assignment: assign })
    }).catch(err => {
      res.status(500).json({ error: err.message })
    });
  }

  deleteAsign = async (req, res) => {
    const currentUrl = new URL(req.url, baseURL);
    const searchParams = currentUrl.searchParams;

    const assignmentId = searchParams.get("assignmentId");

    this.assignmentService.deleteAssignment(assignmentId).then(assignmentId => {
      res.status(200).json({ assignmentId: assignmentId })
    }).catch(err => {
      res.status(500).json({ error: err.message })
    })
  }
}
