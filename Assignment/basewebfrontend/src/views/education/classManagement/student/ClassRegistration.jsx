import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import PrimaryButton from "component/button/PrimaryButton";
import StandardTable from "component/table/StandardTable";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "state/AuthState";
import { request } from "../../../../api";
import changePageSize from "../../../../utils/MaterialTableUtils";
import { errorNoti, successNoti } from "../../../../utils/notification";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
    borderRadius: "6px",
  },
}));

/**
 * ok
 * @returns
 */
function ClassRegistration() {
  const classes = useStyles();

  //
  const [semester, setSemester] = useState("");
  const [registeredClasses, setRegisteredClasses] = useState(new Set());

  //
  const { user } = useAuthState();

  // Table.
  const tableRef = useRef(null);
  const [filterParams, setFilterParams] = useState({
    code: "",
    courseId: "",
    courseName: "",
    classType: "",
    departmentId: "",
  });

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
      field: "courseName",
      title: "Tên học phần",
    },
    {
      field: "classType",
      title: "Loại lớp",
    },
    {
      field: "departmentId",
      title: "Khoa/Viện",
    },
    {
      field: "",
      title: "",
      cellStyle: { textAlign: "center" },
      render: (rowData) =>
        registeredClasses.has(rowData.id) ? null : (
          <PrimaryButton disableRipple onClick={() => onRegist(rowData)}>
            Đăng ký
          </PrimaryButton>
        ),
    },
  ];

  // Functions.
  const getData = (query) =>
    new Promise((resolve, reject) => {
      // console.log("Query", query);

      const filters = query.filters; // array.
      const data = { seed: true };

      if (filters.length > 0) {
        filters.map((filter) => {
          data[filter.column.field] = filter.value;
        });
      }

      request(
        "POST",
        `/edu/class-management/class/?userId=${user.id.get()}&page=${
          query.page
        }&size=${query.pageSize}`,
        (res) => {
          let { content, number, totalElements } = res.data.page;

          setFilterParams({
            code: null,
            classCode: "",
            courseId: "",
            courseName: "",
            classType: "",
            departmentId: "",
            ...data,
          });
          setSemester(res.data.semesterId);
          setRegisteredClasses(new Set(res.data.registeredClasses));

          changePageSize(content.length, tableRef);
          resolve({
            data: content,
            page: number,
            totalCount: totalElements,
          });
        },
        {
          onError: (e) => {
            console.log(e);
            changePageSize(5, tableRef);
            reject({
              message: "Đã có lỗi xảy ra trong quá trình tải dữ liệu. Thử lại ",
              errorCause: "query",
            });
          },
        },
        data
      );
    });

  const onRegist = (rowData) => {
    let tmp = new Set(registeredClasses);
    tmp.add(rowData.id);
    setRegisteredClasses(tmp);

    request(
      "POST",
      `/edu/class-management/class/register?userId=${user.id.get()}`,
      () => {
        successNoti(
          "Đăng ký thành công. Vui lòng chờ giảng viên phê duyệt.",
          3000
        );
      },
      {
        400: (e) => {
          errorNoti(e.response.body);
        },
      },
      { classId: rowData.id }
    );
  };

  useEffect(() => {
    let cols = tableRef.current.dataManager.columns;

    cols[0].tableData.filterValue = filterParams.classCode;
    cols[1].tableData.filterValue = filterParams.courseId;
    cols[2].tableData.filterValue = filterParams.courseName;
    cols[3].tableData.filterValue = filterParams.classType;
    cols[4].tableData.filterValue = filterParams.departmentId;

    // console.log("filter params", filterParams);
  }, [registeredClasses]);

  return (
    <MuiThemeProvider>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar style={{ background: "#ff5722" }}>R</Avatar>}
          title={
            <Typography variant="h5">
              Đăng ký lớp học - Học kỳ {semester}
            </Typography>
          }
        />
        <CardContent>
          <StandardTable
            title=""
            columns={columns}
            tableRef={tableRef}
            data={getData}
            hideCommandBar
            components={{
              Toolbar: () => null,
            }}
            options={{
              selection: false,
              filtering: true,
              search: false,
              debounceInterval: 500,
              sorting: false,
            }}
          />
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
}

export default ClassRegistration;
