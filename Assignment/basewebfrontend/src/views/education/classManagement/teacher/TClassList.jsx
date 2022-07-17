import { Avatar, Card, CardHeader, Typography } from "@material-ui/core";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { request } from "api";
import StandardTable, { Offset } from "component/table/StandardTable";
import withScreenSecurity from "component/withScreenSecurity";
import { useEffect, useRef, useState } from "react";
import { FaListUl } from "react-icons/fa";
import { useHistory } from "react-router";
import { useAuthState } from "state/AuthState";
import changePageSize from "utils/MaterialTableUtils";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
  },
}));

const status = {
  OPEN: "MỞ",
  HIDDEN: "ẨN",
};

/**
 * ok
 * @returns
 */
function TClassList() {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAuthState();

  // Table.
  const [data, setData] = useState();
  const [classesOfUser, setClassesOfUser] = useState();
  const tableRef1 = useRef(null);
  const tableRef2 = useRef(null);

  const columns = [
    {
      field: "classCode",
      title: "Mã lớp",
    },
    {
      field: "courseId",
      title: "Mã môn",
    },
    {
      field: "courseName",
      title: "Tên môn",
    },
    {
      field: "createdByUserLoginId",
      title: "Người tạo",
    },

    {
      field: "semester",
      title: "Học kỳ",
    },

    {
      field: "statusId",
      title: "Trạng thái",
      render: (rowData) => status[rowData.statusId],
    },
  ];

  const cols = [
    {
      field: "classCode",
      title: "Mã lớp",
    },
    {
      field: "courseId",
      title: "Mã học phần",
    },
    {
      field: "name",
      title: "Tên học phần",
    },
    {
      field: "classType",
      title: "Loại lớp",
    },
    {
      field: "department",
      title: "Khoa/Viện",
    },
    {
      field: "semester",
      title: "Học kỳ",
    },
    {
      field: "statusId",
      title: "Trạng thái",
      render: (rowData) => status[rowData.statusId],
    },
  ];

  // Functions.
  const getClasses = () => {
    request(
      "get",
      `/edu/class-management/class/list/teacher?teacherId=${user.id.get()}`,
      (res) => {
        changePageSize(res.data.length, tableRef1);
        setData(res.data);
      }
    );
  };

  function getClassesOfUser() {
    request(
      "get",
      `/edu/class-management/class/get-classes-of-user/?userLoginId=${user.id.get()}`,
      (res) => {
        console.log("getClassesOfUser, res.data = ", res.data);
        changePageSize(res.data.length, tableRef2);
        setClassesOfUser(res.data);
      }
    );
  }

  useEffect(() => {
    getClasses();
    getClassesOfUser();
  }, []);

  return (
    <MuiThemeProvider>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar style={{ background: "#ff7043" }}>
              <FaListUl size={24} />
            </Avatar>
          }
          title={<Typography variant="h5">Danh sách lớp</Typography>}
        />

        <StandardTable
          title=""
          columns={cols}
          data={data}
          tableRef={tableRef1}
          hideCommandBar
          components={{ Toolbar: () => null }}
          options={{
            filtering: true,
            search: false,
            selection: false,
            debounceInterval: 500,
          }}
          onRowClick={(event, rowData) => {
            history.push({
              pathname: `/edu/teacher/class/detail/${rowData.id}/`,
            });
          }}
        />
        <Offset />
        <StandardTable
          title=""
          columns={columns}
          data={classesOfUser}
          tableRef={tableRef2}
          hideCommandBar
          options={{
            selection: false,
          }}
          onRowClick={(event, rowData) => {
            history.push({
              pathname: `/edu/teacher/class/detail/${rowData.classId}/`,
            });
          }}
        />
      </Card>
    </MuiThemeProvider>
  );
}

const screenName = "SCREEN_EDUCATION_TEACHING_MANAGEMENT_TEACHER";
export default withScreenSecurity(TClassList, screenName, true);
