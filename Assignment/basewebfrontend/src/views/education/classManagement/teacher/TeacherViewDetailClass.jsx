import { a11yProps, AntTab, AntTabs, TabPanel } from "component/tab";
import { useMemo, useState } from "react";
import { useParams } from "react-router";

import { useTheme } from "@material-ui/core/styles";
import TeacherViewDetailClassStudentList from "./TeacherViewDetailClassStudentList";
import TeacherViewDetailClassStudentRegistered from "./TeacherViewDetailClassStudentRegistered";
//import TClassUpdatePopup from "./TClassUpdatePopup";
import TeacherViewDetailClassExercises from "./TeacherViewDetailClassExercises";
import TeacherViewDetailClassExerciseSubmission from "./TeacherViewDetailClassExerciseSubmission";
import TeacherViewDetailClassGeneralInfo from "./TeacherViewDetailClassGeneralInfo";
//import TeacherViewQuizDetail from "component/education/course/TeacherViewQuizDetail";
import withScreenSecurity from "component/withScreenSecurity";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

/*
const useStyles = makeStyles((theme) => ({
  btn: {
    // width: 180,
    marginLeft: theme.spacing(1),
  },
  courseName: { fontWeight: theme.typography.fontWeightMedium },
  // editBtn: {
  //   margin: theme.spacing(2),
  //   width: 100,
  //   fontWeight: theme.typography.fontWeightRegular,
  // },
  testName: { fontSize: "1.25rem", paddingTop: theme.spacing(1) },
  time: {
    paddingLeft: 6,
    color: teal[800],
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: "1rem",
  },
}));
*/
const tabsLabel = [
  "Thông tin chung",
  "Thành viên",
  "Đăng ký",
  "Bài tập",
  "Thống kê",
  // "Lịch sử học",
  // "Buổi học",
];

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function TeacherViewDetailClass() {
  const params = useParams();
  const classId = params.classId;
  let query = useQuery();
  const [selectedTab, setSelectedTab] = useState(
    query.get("tab") ? parseInt(query.get("tab")) : 0
  );
  // const [open, setOpen] = useState(false);
  const theme = useTheme();

  //
  function handleChangeTab(e, newTab) {
    setSelectedTab(newTab);
  }

  return (
    <div>
      <AntTabs
        value={selectedTab}
        onChange={handleChangeTab}
        aria-label="ant example"
        scrollButtons="auto"
        variant="scrollable"
      >
        {tabsLabel.map((label, idx) => (
          <AntTab
            key={label}
            label={label}
            component={Link}
            to={`/edu/teacher/class/detail/${classId}/?tab=${idx}`}
            {...a11yProps(idx)}
          />
        ))}
      </AntTabs>

      <TabPanel value={selectedTab} index={0} dir={theme.direction}>
        <TeacherViewDetailClassGeneralInfo classId={classId} />
      </TabPanel>
      <TabPanel value={selectedTab} index={1} dir={theme.direction}>
        <TeacherViewDetailClassStudentList classId={classId} />
      </TabPanel>
      <TabPanel value={selectedTab} index={2} dir={theme.direction}>
        <TeacherViewDetailClassStudentRegistered classId={classId} />
      </TabPanel>
      <TabPanel value={selectedTab} index={3} dir={theme.direction}>
        <TeacherViewDetailClassExercises classId={classId} />
      </TabPanel>

      <TabPanel value={selectedTab} index={4} dir={theme.direction}>
        <TeacherViewDetailClassExerciseSubmission classId={classId} />
      </TabPanel>
    </div>
  );
}

const screenName = "SCREEN_EDUCATION_TEACHING_MANAGEMENT_TEACHER";
export default withScreenSecurity(TeacherViewDetailClass, screenName, true);
