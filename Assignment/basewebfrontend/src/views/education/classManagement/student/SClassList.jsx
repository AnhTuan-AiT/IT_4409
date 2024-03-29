import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { useEffect, useRef, useState } from "react";
import { FaListUl } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { GiSandsOfTime } from "react-icons/gi";
import { useHistory } from "react-router";
import { useAuthState } from "state/AuthState";
import { request } from "../../../../api";
import changePageSize, {
  localization,
  tableIcons,
} from "../../../../utils/MaterialTableUtils";
import { infoNoti } from "../../../../utils/notification";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
  },
  approved: {
    color: "green",
    borderColor: "green",
    fontSize: "1rem",
    width: 160,
  },
  pendingApproval: {
    fontSize: "1rem",
  },
}));

function SClassList() {
  const classes = useStyles();
  const history = useHistory();

  const { user } = useAuthState();

  // Table.
  const columns = [
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
      field: "semester",
      title: "Học kỳ",
    },
    {
      field: "status",
      title: "Trạng thái",
      filtering: false,
      headerStyle: {
        textAlign: "center",
      },
      render: (rowData) => (
        <Box display="flex" justifyContent="center">
          {rowData.status === "APPROVED" ? (
            <Chip
              icon={<FcApproval size={24} />}
              label="Đã phê duyệt"
              variant="outlined"
              className={classes.approved}
            />
          ) : (
            <Chip
              icon={<GiSandsOfTime size={24} />}
              label="Chờ phê duyệt"
              color="primary"
              variant="outlined"
              className={classes.pendingApproval}
            />
          )}
        </Box>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const tableRef = useRef(null);

  // Functions.
  const getClasses = () => {
    request(
      "get",
      `/edu/class-management/class/list/student/?studentId=${user.id.get()}`,
      (res) => {
        changePageSize(res.data.length, tableRef);
        setData(res.data);
      }
    );
  };

  useEffect(() => {
    getClasses();
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
        <CardContent>
          <MaterialTable
            title=""
            columns={columns}
            data={data}
            tableRef={tableRef}
            icons={tableIcons}
            localization={localization}
            components={{
              Toolbar: () => null,
              Container: (props) => <Paper {...props} elevation={0} />,
            }}
            options={{
              filtering: true,
              search: false,
              pageSize: 10,
              debounceInterval: 300,
              sorting: false,
            }}
            onRowClick={(event, rowData) => {
              // console.log(rowData);

              if (rowData.status === "APPROVED") {
                history.push(`/edu/student/class/${rowData.id}`);
              } else {
                infoNoti(
                  `Vui lòng chờ giảng viên phê duyệt để xem thông tin của lớp ${rowData.name}.`,
                  3000
                );
              }
            }}
          />
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
}

export default SClassList;
