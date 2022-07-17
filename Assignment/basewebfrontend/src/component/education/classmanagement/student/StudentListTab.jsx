import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Link,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { request } from "api";
import StandardTable from "component/table/StandardTable";
import { useEffect, useRef, useState } from "react";
import { FcConferenceCall } from "react-icons/fc";
import changePageSize from "utils/MaterialTableUtils";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
  },
}));

/**
 * ok
 * @param {*} param0
 * @returns
 */
function StudentListTab({ classId }) {
  const classes = useStyles();

  //
  const [students, setStudents] = useState([]);

  // Table refs.
  const studentTableRef = useRef(null);

  const studentCols = [
    {
      field: "name",
      title: "Thành viên",
    },
    {
      field: "email",
      title: "Email",
      render: (rowData) => (
        <Link href={`mailto:${rowData.email}`}>{rowData.email}</Link>
      ),
    },
  ];

  const getStudentsOfClass = () => {
    request(
      "get",
      `/edu/class-management/class/students?id=${classId}`,
      (res) => {
        changePageSize(res.data.length, studentTableRef);
        setStudents(res.data);
      }
    );
  };

  useEffect(() => {
    getStudentsOfClass();
  }, []);

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar style={{ background: "white" }}>
            {/*#ffeb3b <PeopleAltRoundedIcon /> */}
            <FcConferenceCall size={40} />
          </Avatar>
        }
        title={<Typography variant="h5">Danh sách sinh viên</Typography>}
      />

      <CardContent>
        <StandardTable
          title=""
          columns={studentCols}
          tableRef={studentTableRef}
          hideCommandBar
          data={students}
          components={{
            Toolbar: () => null,
          }}
          options={{
            search: false,
            selection: false,
            debounceInterval: 500,
            toolbarButtonAlignment: "left",
          }}
        />
      </CardContent>
    </Card>
  );
}

export default StudentListTab;
