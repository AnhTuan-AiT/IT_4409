import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  //Link,
  //Paper,
  Typography,
} from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
//import { BiDetail } from "react-icons/bi";
import { makeStyles } from "@material-ui/core/styles";
import { FcMindMap } from "react-icons/fc";
import { drawerWidth } from "../../../../assets/jss/material-dashboard-react";
//import NegativeButton from "../../../../component/education/classmanagement/NegativeButton";
import StandardTable from "component/table/StandardTable";
import { useHistory } from "react-router";
import { request } from "../../../../api";
import PositiveButton from "../../../../component/education/classmanagement/PositiveButton";
import displayTime from "../../../../utils/DateTimeUtils";
import changePageSize from "../../../../utils/MaterialTableUtils";

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
  grid: {
    paddingLeft: 56,
  },
  negativeBtn: {
    minWidth: 112,
    marginLeft: 10,
    marginRight: 10,
  },
  positiveBtn: {
    minWidth: 112,
  },
  dialogRemoveBtn: {
    fontWeight: "normal",
  },
  listItem: {
    height: 48,
    borderRadius: 6,
    marginBottom: 6,
    backgroundColor: "#f5f5f5",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
  open: { transform: "rotate(-180deg)", transition: "0.3s" },
  close: { transition: "0.3s" },
  item: {
    paddingLeft: 32,
  },
  tabs: { padding: theme.spacing(2) },
  tabSelected: {
    background: "rgba(254,243,199,1)",
    color: "rgba(180,83,9,1) !important",
  },
  tabRoot: {
    margin: "0px 0.5rem",
    borderRadius: "0.375rem",
    textTransform: "none",
  },
}));

/**
 * ok
 * @param {*} props
 * @returns
 */
export default function TeacherViewDetailClassExercises(props) {
  const classes = useStyles();
  const history = useHistory();
  const classId = props.classId;
  const [data, setData] = useState([]);
  const tableRef = useRef(null);

  const cols = [
    {
      field: "name",
      title: "Tên bài tập",
    },
    {
      field: "openTime",
      title: "Bắt đầu",
      filtering: false,
      render: (rowData) => {
        let date = new Date(rowData.openTime);

        return displayTime(date);
      },
    },
    {
      field: "closeTime",
      title: "Kết thúc",
      filtering: false,
      render: (rowData) => {
        let date = new Date(rowData.closeTime);

        return displayTime(date);
      },
    },
    {
      field: "status",
      title: "Trạng thái",
      lookup: {
        CLOSED: "Đã hết hạn",
        STARTED: "Đã giao",
        DELETED: "Đã xóa",
        "NOT STARTED": "Chưa giao",
      },
    },
  ];
  // const [deletedAssignId, setDeletedAssignId] = useState();
  // Student Assignment

  const addStatusProperty = (assignments) => {
    let current = new Date();
    assignments.forEach((assign) => {
      if (assign.deleted) {
        assign.status = "DELETED";
      } else {
        let open = new Date(assign.openTime);

        if (current.getTime() < open.getTime()) {
          assign.status = "NOT STARTED";
        } else {
          let close = new Date(assign.closeTime);

          if (close.getTime() < current.getTime()) {
            assign.status = "CLOSED";
          } else {
            assign.status = "STARTED";
          }
        }
      }
    });

    console.log(assignments);
    return assignments;
  };

  const getAssigns = () => {
    request(
      "get",
      `/edu/class-management/class/assignments/teacher?id=${classId}`,
      (res) => {
        changePageSize(res.data.length, tableRef);
        const assignments = addStatusProperty(res.data);

        assignments.sort((ass1, ass2) => {
          const open1 = new Date(ass1.openTime);
          const open2 = new Date(ass2.openTime);

          if (open1.getTime() !== open2.getTime())
            return open1.getTime() < open2.getTime();
          else return ass1.name.localeCompare(ass2.name);
        });

        setData(assignments);
      }
    );
  };

  useEffect(() => {
    getAssigns();
  }, []);

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar style={{ background: "white" }}>
              <FcMindMap size={40} />
            </Avatar>
          }
          title={<Typography variant="h5">Bài tập</Typography>}
          action={
            <PositiveButton
              label="Tạo mới"
              className={classes.positiveBtn}
              onClick={() => {
                history.push(`/edu/teacher/class/${classId}/assignment/create`);
              }}
            />
          }
        />
        <CardContent>
          <StandardTable
            title=""
            columns={cols}
            tableRef={tableRef}
            data={data}
            hideCommandBar
            options={{
              search: false,
              selection: false,
            }}
            components={{
              Toolbar: () => null,
            }}
            onRowClick={(event, rowData) => {
              history.push({
                pathname: `/edu/teacher/class/${classId}/assignment/${rowData.id}`,
              });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
