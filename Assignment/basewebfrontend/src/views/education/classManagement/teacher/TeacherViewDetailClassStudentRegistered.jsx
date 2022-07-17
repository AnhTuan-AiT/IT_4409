import { Avatar, Card, CardContent, CardHeader, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useRef, useState } from "react";
import { FcApproval } from "react-icons/fc";
import { request } from "../../../../api";
import { drawerWidth } from "../../../../assets/jss/material-dashboard-react";
import { StyledBadge } from "../../../../component/education/classmanagement/StyledBadge";
import changePageSize from "../../../../utils/MaterialTableUtils";

import PrimaryButton from "component/button/PrimaryButton";
import TertiaryButton from "component/button/TertiaryButton";
import StandardTable from "component/table/StandardTable";

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
const registCols = [
  {
    field: "name",
    title: "Sinh viên",
  },
  {
    field: "email",
    title: "Email",
    render: (rowData) => (
      <Link href={`mailto:${rowData.email}`}>{rowData.email}</Link>
    ),
  },
];

/**
 * ok
 */
export default function TeacherViewDetailClassStudentRegistered(props) {
  const classId = props.classId;
  const classes = useStyles();

  //
  const [registStudents, setRegistStudents] = useState();
  const [selectedRegists, setSelectedRegists] = useState();

  //
  const studentTableRef = useRef(null);
  const registTableRef = useRef(null);
  const [fetchedStudents, setFetchedStudents] = useState(false);
  const [students, setStudents] = useState([]);

  //
  const onUpdateStatus = (type) => {
    request(
      "put",
      "/edu/class-management/class/registration-status",
      (res) => {
        let data = res.data;
        let tmp = [];
        let result;

        // In case it is necessary to update the student list.
        if (type === "APPROVED" && fetchedStudents) {
          let newStudents = [];

          for (let i = 0; i < registStudents.length; i++) {
            result = data[registStudents[i].id];

            if (result === undefined || result.status !== 200) {
              // Not selected or status update failed.
              tmp.push(registStudents[i]);
            } else {
              // Successfully update.
              newStudents.push({
                name: registStudents[i].name,
                id: registStudents[i].id,
                email: registStudents[i].email,
              });
            }
          }

          setStudents([...students, ...newStudents]);
        } else {
          for (let i = 0; i < registStudents.length; i++) {
            result = data[registStudents[i].id];

            if (result === undefined || result.status !== 200) {
              // Not selected or status update failed.
              tmp.push(registStudents[i]);
            }
          }
        }

        setRegistStudents(tmp);
      },
      {},
      {
        classId: classId,
        studentIds: selectedRegists,
        status: type,
      }
    );
  };

  // Approve or deny registrations.
  const onSelectionChange = (rows) => {
    setSelectedRegists(rows.map((row) => row.id));
  };

  const getStudents = (type) => {
    // if (type === "register") {
    request(
      "get",
      `/edu/class-management/class/registered-students?id=${classId}`,
      (res) => {
        setRegistStudents(res.data);
        // console.log("registered students = " + res.data);
        changePageSize(res.data.length, registTableRef);
      }
    );
    // } else {
    //   request(
    //     "get",
    //     `/edu/class-management/class/students?id=${classId}`,
    //     (res) => {
    //       setStudents(res.data);
    //       setFetchedStudents(true);
    //       changePageSize(res.data.length, studentTableRef);
    //     }
    //   );
    // }
  };

  useEffect(() => {
    getStudents("register");
  }, []);

  return (
    <div>
      <Card className={classes.card} elevation={0}>
        {/* <CardActionArea
              disableRipple
              onClick={() => setOpenRegistCard(!openRegistCard)}
            > */}
        <CardHeader
          avatar={
            <Avatar style={{ background: "white" }}>
              <FcApproval size={40} />
            </Avatar>
          }
          title={
            <StyledBadge badgeContent={registStudents?.length} color="error">
              Phê duyệt sinh viên đăng ký
            </StyledBadge>
          }
          titleTypographyProps={{
            variant: "h5",
          }}
        />
        {/* </CardActionArea> */}
        {/* <Collapse in={openRegistCard} timeout="auto"> */}
        <CardContent>
          <StandardTable
            title=""
            columns={registCols}
            tableRef={registTableRef}
            data={registStudents}
            hideCommandBar
            components={{
              Action: (props) => {
                if (props.action.icon === "refuse") {
                  return (
                    <TertiaryButton
                      className={classes.negativeBtn}
                      onClick={(event) =>
                        props.action.onClick(event, props.data)
                      }
                    >
                      Từ chối
                    </TertiaryButton>
                  );
                }
                if (props.action.icon === "approve") {
                  return (
                    <PrimaryButton
                      className={classes.positiveBtn}
                      onClick={(event) =>
                        props.action.onClick(event, props.data)
                      }
                    >
                      Phê duyệt
                    </PrimaryButton>
                  );
                }
              },
            }}
            options={{
              search: false,
              pageSize: 10,
              toolbarButtonAlignment: "left",
              showTextRowsSelected: false,
            }}
            actions={[
              {
                icon: "approve",
                position: "toolbarOnSelect",
                onClick: () => onUpdateStatus("APPROVED"),
              },
              {
                icon: "refuse",
                position: "toolbarOnSelect",
                onClick: () => onUpdateStatus("REFUSED"),
              },
            ]}
            onSelectionChange={(rows) => onSelectionChange(rows)}
          />
        </CardContent>
        {/* </Collapse> */}
      </Card>
    </div>
  );
}
