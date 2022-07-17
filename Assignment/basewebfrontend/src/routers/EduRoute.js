import { Route, Switch, useRouteMatch } from "react-router";
import ClassCreate from "../component/education/class/ClassCreate";
import { MainBoard } from "../component/education/whiteboard/MainBoard";
// import ClassesList from "../component/education/class/ClassesList";
// import AddNewCourse from "../component/education/course/AddNewCourse";
// import CourseDetail from "../component/education/course/CourseDetail";
// import CourseList from "../component/education/course/CourseList";
// import CreateChapterMaterialOfCourse from "../component/education/course/CreateChapterMaterialOfCourse";
// import CreateChapterOfCourse from "../component/education/course/CreateChapterOfCourse";
// import CreateTopicOfCourse from "../component/education/course/CreateTopicOfCourse";
// import StudentCourseChapterDetail from "../component/education/course/StudentCourseChapterDetail";
// import StudentCourseChapterMaterialDetail from "../component/education/course/StudentCourseChapterMaterialDetail";
// import TeacherCourseChapterDetail from "../component/education/course/TeacherCourseChapterDetail";
// import TeacherCourseChapterMaterialDetail from "../component/education/course/TeacherCourseChapterMaterialDetail";
// import TeacherCourseDetail from "../component/education/course/TeacherCourseDetail";
// import TeacherCourseList from "../component/education/course/TeacherCourseList";
// import TeacherCourseTopicDetail from "../component/education/course/TeacherCourseTopicDetail";
import ClassRegistration from "../views/education/classManagement/student/ClassRegistration";
import SAssignmentDetail from "../views/education/classManagement/student/SAssignmentDetail";
import SClassDetail from "../views/education/classManagement/student/SClassDetail";
import SClassList from "../views/education/classManagement/student/SClassList";
import CreateAssignment from "../views/education/classManagement/teacher/CreateAssignment";
import StudentLearningProgressDetail from "../views/education/classManagement/teacher/StudentLearningProgressDetail";
import TAssignmentDetail from "../views/education/classManagement/teacher/TAssignmentDetail";
// import TClassDetail from "../views/Education/ClassManagement/Teacher/TClassDetail";
import TClassList from "../views/education/classManagement/teacher/TClassList";
import TeacherViewDetailClass from "../views/education/classManagement/teacher/TeacherViewDetailClass";

import NotFound from "../views/errors/NotFound";

export default function EduRoute() {
  let { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route
          component={StudentLearningProgressDetail}
          path={`${path}/student/learning/detail/:id`}
          exact
        />

        {/* <Route
          component={TeacherCourseList}
          path={`${path}/teacher/course/list`}
        />
        <Route
          component={TeacherCourseDetail}
          path={`${path}/course/detail/:id`}
          exact
        />
        <Route
          component={CreateChapterOfCourse}
          path={`${path}/course/detail/chapter/create/:courseId`}
          exact
        />

        <Route
          component={CreateTopicOfCourse}
          path={`${path}/course/detail/topic/create/:courseId`}
          exact
        />

        <Route
          component={TeacherCourseChapterDetail}
          path={`${path}/teacher/course/chapter/detail/:chapterId`}
          exact
        />

        <Route
          component={TeacherCourseTopicDetail}
          path={`${path}/teacher/course/topic/detail/:quizCourseTopicId/:courseId`}
          exact
        />

        <Route
          component={StudentCourseChapterDetail}
          path={`${path}/student/course/chapter/detail/:chapterId`}
          exact
        />

        <Route
          component={CreateChapterMaterialOfCourse}
          path={`${path}/course/detail/chapter/material/create/:chapterId`}
          exact
        />

        <Route
          component={TeacherCourseChapterMaterialDetail}
          path={`${path}/teacher/course/chapter/material/detail/:chapterMaterialId`}
          exact
        /> */}

        {/* <Route
          component={TeacherViewLearningSessionDetail}
          path={`${path}/teacher/class/session/detail/:sessionId`}
          exact
        /> */}

        <Route component={ClassCreate} path={`${path}/class/add`} />

        {/* <Route
          component={StudentCourseChapterMaterialDetail}
          path={`${path}/student/course/chapter/material/detail/:chapterMaterialId`}
          exact
        /> */}

        {/* <Route
          component={CourseList}
          path={`${path}/teaching-assignment/courses`}
        />

        <Route component={CourseDetail} path={`${path}/course/detail`} />

        <Route component={AddNewCourse} path={`${path}/course/create`} /> */}

        {/* <Route component={ClassesList} path={`${path}/classes-list`} /> */}

        <Route component={ClassCreate} path={`${path}/class/add`} />

        {/**
         * route for quiz test
         */}

        {/* Class management. */}
        <Route
          component={ClassRegistration}
          path={`${path}/class/register`}
          exact
        />

        <Route
          component={SClassList}
          path={`${path}/student/class/list`}
          exact
        />

        <Route
          component={SAssignmentDetail}
          path={`${path}/student/class/:classId/assignment/:assignmentId`}
          exact
        />

        <Route
          component={SClassDetail}
          path={`${path}/student/class/:id`}
          exact
        />

        <Route
          component={MainBoard}
          path={`${path}/student/class/session/detail/:sessionId/whiteboard/:whiteboardId`}
          exact
        />

        <Route
          component={TClassList}
          path={`${path}/teacher/class/list`}
          exact
        />

        <Route
          component={TeacherViewDetailClass}
          path={`${path}/teacher/class/detail/:classId`}
          exact
        />
        {/* <Route
          component={MainBoard}
          path={`${path}/teacher/class/session/detail/:sessionId/whiteboard/:whiteboardId`}
          exact
        /> */}

        <Route
          component={CreateAssignment}
          path={`${path}/teacher/class/:classId/assignment/create`}
          exact
        />

        <Route
          component={CreateAssignment}
          path={`${path}/teacher/class/:classId/assignment/:assignmentId/edit`}
          exact
        />

        <Route
          component={TAssignmentDetail}
          path={`${path}/teacher/class/:classId/assignment/:assignmentId`}
          exact
        />

        {/* <Route
          component={TClassDetail}
          path={`${path}/teacher/class/:id`}
          exact
        /> */}

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
