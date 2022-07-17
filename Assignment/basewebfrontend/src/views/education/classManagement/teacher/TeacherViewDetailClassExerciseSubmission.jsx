import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import StandardTable from "component/table/StandardTable";
import { useEffect, useRef, useState } from "react";
import ReactExport from "react-data-export";
import {
  //FcApproval,
  //FcClock,
  FcConferenceCall,
} from "react-icons/fc";
import { request } from "../../../../api";
import { drawerWidth } from "../../../../assets/jss/material-dashboard-react";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    margin: "auto",
    width: `calc(100vw - ${drawerWidth + theme.spacing(4) * 2 + 1}px)`,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    marginTop: theme.spacing(2),
  },
}));
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default function TeacherViewDetailClassExerciseSubmission(props) {
  const classes = useStyles();
  //const params = useParams();
  const classId = props.classId;
  //const history = useHistory();
  const [studentAssignmentList, setStudentAssignmentList] = useState([]);
  const [fetchedStudentAssignment, setFetchedStudentAssignment] =
    useState(false);

  const [classDetail, setClassDetail] = useState({});
  //const studentTableRef = useRef(null);
  const studentAssignTableRef = useRef(null);

  const TableBorderStyle = "medium";
  const TableHeaderStyle = {
    style: {
      font: { sz: "14", bold: true },
      alignment: { vertical: "center", horizontal: "center" },
      border: {
        top: { style: TableBorderStyle },
        bottom: { style: TableBorderStyle },
        left: { style: TableBorderStyle },
        right: { style: TableBorderStyle },
      },
    },
  };

  const TableCellStyle = {
    style: {
      font: { sz: "14" },
      alignment: { vertical: "center", horizontal: "center" },
      border: {
        top: { style: TableBorderStyle },
        bottom: { style: TableBorderStyle },
        left: { style: TableBorderStyle },
        right: { style: TableBorderStyle },
      },
    },
  };
  const stuAssignCols = [
    {
      field: "studentName",
      title: "Thành viên",
      cellStyle: {
        minWidth: 200,
      },
    },
  ].concat(
    !fetchedStudentAssignment
      ? []
      : !studentAssignmentList.length
      ? []
      : studentAssignmentList[0].assignmentList.map((assignment, index) => {
          return {
            field: "assignmentList[" + index + "].assignmentStatus",
            title: assignment.assignmentName,
          };
        }),
    [
      {
        field: "totalSubmitedAssignment",
        //field: "totalSubmitedAssignment",
        title: "Tổng số bài nộp",
      },
    ]
  );

  const DataSet = [
    {
      columns: [
        {
          title: "Họ và tên sinh viên",
          ...TableHeaderStyle,
          width: { wch: "Họ và tên sinh viên".length },
        },
      ].concat(
        !fetchedStudentAssignment
          ? []
          : !studentAssignmentList.length
          ? []
          : studentAssignmentList[0].assignmentList.map((assignment) => {
              return {
                title: assignment.assignmentName,
                ...TableHeaderStyle,
                width: { wch: assignment.assignmentName.length + 3 },
              };
            }),
        [
          {
            title: "Tổng số bài nộp",
            ...TableHeaderStyle,
            width: { wch: "Tổng số bài nộp".length },
          },
        ]
      ),
      data: !fetchedStudentAssignment
        ? []
        : studentAssignmentList.map((data) => {
            return [{ value: data.studentName, ...TableCellStyle }].concat(
              data.assignmentList.map((data2) => {
                return { value: data2.assignmentStatus, ...TableCellStyle };
              }),
              [{ value: data.totalSubmitedAssignment, ...TableCellStyle }]
            );
          }),
    },
  ];
  const getStudentAssignment = () => {
    request(
      "get",
      `/edu/class-management/class/all-student-assignments/teacher?id=${classId}`,
      (res) => {
        setStudentAssignmentList(res.data);
        setFetchedStudentAssignment(true);
      }
    );
  };

  useEffect(() => {
    //getClassDetail();
    //getAssigns();
    getStudentAssignment();
    //getStudents("register");
    //getStudents();
  }, []);

  return (
    <div>
      <Card className={classes.card}>
        {/* <CardActionArea disableRipple onClick={onClickStuAssignCard}> */}
        <CardHeader
          avatar={
            <Avatar style={{ background: "white" }}>
              {/*#ffeb3b <PeopleAltRoundedIcon /> */}
              <FcConferenceCall size={40} />
            </Avatar>
          }
          title={<Typography variant="h5">Danh sách nộp bài tập</Typography>}
          action={
            studentAssignmentList.length !== 0 ? (
              <ExcelFile
                filename={"Danh sách nộp bài tập lớp " + classDetail.code}
                element={
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "0px" }}
                  >
                    Xuất Excel
                  </Button>
                }
              >
                <ExcelSheet
                  dataSet={DataSet}
                  name={"Danh sách nộp bài tập lớp " + classDetail.code}
                />
              </ExcelFile>
            ) : null
          }
        />
        {/* </CardActionArea>
          <Collapse in={openStuAssignCard} timeout="auto"> */}
        <CardContent>
          {/* {studentAssignmentList.length !== 0 ? (
            <ExcelFile
              filename={"Danh sách nộp bài tập lớp " + classDetail.code}
              element={
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: "0px" }}
                >
                  Xuất Excel
                </Button>
              }
            >
              <ExcelSheet
                dataSet={DataSet}
                name={"Danh sách nộp bài tập lớp " + classDetail.code}
              />
            </ExcelFile>
          ) : null} */}
          <StandardTable
            title=""
            columns={stuAssignCols}
            tableRef={studentAssignTableRef}
            data={studentAssignmentList}
            hideCommandBar
            components={{
              Toolbar: () => null,
            }}
            options={{
              draggable: false,
              selection: false,
              pageSize: 10,
              toolbarButtonAlignment: "left",
              // exportButton: true,
              // exportFileName: "Danh sách nộp bài tập lớp " + classDetail.code,
              // exportDelimiter: ",",
            }}
          />
        </CardContent>
        {/* </Collapse> */}
      </Card>
    </div>
  );
}
