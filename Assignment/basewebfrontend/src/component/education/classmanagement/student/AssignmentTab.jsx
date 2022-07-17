import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { request } from "api";
import StandardTable from "component/table/StandardTable";
import { useEffect, useRef, useState } from "react";
import { FcMindMap } from "react-icons/fc";
import { useHistory } from "react-router";
import displayTime from "utils/DateTimeUtils";
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
function AssignmentTab({ classId }) {
  const classes = useStyles();
  const history = useHistory();

  // Tables.
  const [assigns, setAssigns] = useState([]);

  // Table refs.
  const assignTableRef = useRef(null);

  const assignCols = [
    // {
    //   field: "id",
    //   title: "Mã bài tập",
    //   headerStyle: {
    //     textAlign: "center",
    //   },
    //   width: 150,
    //   cellStyle: {
    //     textAlign: "center",
    //     fontSize: "1rem",
    //     padding: 5,
    //   },
    // },
    {
      field: "name",
      title: "Tên bài tập",
    },
    {
      field: "closeTime",
      title: "Hạn nộp",
      render: (rowData) => {
        let closeTime = new Date(rowData.closeTime);
        return displayTime(closeTime);
      },
    },
  ];

  const getAssign = () => {
    request(
      "get",
      `/edu/class-management/class/assignments/student?id=${classId}`,
      (res) => {
        changePageSize(res.data.length, assignTableRef);
        setAssigns(res.data);
      }
    );
  };

  useEffect(() => {
    getAssign();
  }, []);

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar style={{ background: "white" }}>
            <FcMindMap size={40} />
          </Avatar>
        }
        title={<Typography variant="h5">Bài tập</Typography>}
      />
      <CardContent>
        <StandardTable
          title="Bài tập"
          columns={assignCols}
          tableRef={assignTableRef}
          data={assigns}
          hideCommandBar
          components={{
            Toolbar: () => null,
          }}
          options={{
            search: false,
            selection: false,
            sorting: false,
            toolbarButtonAlignment: "left",
          }}
          onRowClick={(event, rowData) => {
            history.push(
              `/edu/student/class/${classId}/assignment/${rowData.id}`
            );
          }}
        />
      </CardContent>
    </Card>
  );
}

export default AssignmentTab;
