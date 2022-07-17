import DateFnsUtils from "@date-io/date-fns";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { request } from "api";
import PrimaryButton from "component/button/PrimaryButton";
import TertiaryButton from "component/button/TertiaryButton";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthState } from "state/AuthState";
import withScreenSecurity from "../../withScreenSecurity";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  popoverPaper: {
    minWidth: 300,
    borderRadius: 8,
    boxShadow:
      "0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
  },
  modeList: {
    paddingLeft: 8,
    paddingRight: 8,
    "& .MuiListItem-root": {
      paddingLeft: 8,
      paddingRight: 8,
      borderRadius: 6,
    },
    "& .Mui-selected, .Mui-selected:hover": {
      color: "#ffffff",
      backgroundColor: "#1976d2", // updated backgroundColor
    },
  },
  field: {
    minWidth: 300,
  },
}));

/**
 * ok
 * @returns
 */
function ClassCreate() {
  const classes = useStyles();
  const history = useHistory();
  const [isRequesting, setIsRequesting] = useState(false);

  const [classId, setClassId] = useState(null);
  const [classType, setClassType] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [className, setClassName] = useState(null);

  const [departmentId, setDepartmentId] = useState(null);
  const [semesterId, setSemesterId] = useState(null);

  const [coursePool, setCoursePool] = useState([]);
  const [semesterPool, setSemesterPool] = useState([]);
  const [departmentPool, setDepartmentPool] = useState([]);

  //
  const { user } = useAuthState();

  /*
    const departmentPool = [
      { departmentId: "ATTT", departmentName: "An toàn thông tin" },
      { departmentId: "CNPM", departmentName: "Công nghệ phần mềm" },
      { departmentId: "HTTT", departmentName: "Hệ thống thông tin" },
      { departmentId: "KHMT", departmentName: "Khoa học máy tính" },
      { departmentId: "KTMT", departmentName: "Kĩ thuật máy tính" },
      { departmentId: "TTMMT", departmentName: "Truyền thông và mạng máy tính" },
      { departmentId: "TTMT", departmentName: "Trung tâm máy tính" },
      { departmentId: "KCNTT", departmentName: "Viện CNTT&TT" },
    ];
    */
  const classTypePool = [
    { type: "LT" },
    { type: "BT" },
    { type: "LT+BT" },
    { type: "TN" },
    { type: "DA" },
  ];
  const [invalidCourseId, setInvalidCourseId] = useState(false);
  const [invalidClassId, setInvalidClassId] = useState(false);
  const [invalidRequirementField, setInvalidRequirementField] = useState(false);

  // function isNormalInteger(str) {
  //   str = str.trim();
  //   if (!str) {
  //     return false;
  //   }
  //   str = str.replace(/^0+/, "") || "0";
  //   var n = Math.floor(Number(str));
  //   return n !== Infinity && String(n) === str && n >= 0;
  // }

  const getAllCourses = () => {
    request(
      "get",
      "/edu/class-management/class/get-all-courses",
      (res) => {
        const data = res.data;
        data.sort((c1, c2) => {
          return c1.id.localeCompare(c2.id);
        });
        setCoursePool(data);
      },
      {
        onError: () => {
          setCoursePool([]);
        },
      }
    );
  };

  const getAllDepartments = () => {
    request(
      "GET",
      "/edu/class-management/class/get-all-departments",
      (res) => {
        setDepartmentPool(res.data);
      },
      {
        onError: () => {
          setDepartmentPool([]);
        },
      }
    );
  };

  const getAllSemesters = () => {
    request(
      "GET",
      "/edu/class-management/class/get-all-semesters",
      (res) => {
        setSemesterPool(res.data);

        //setSemesterPool(response);
        //console.log('getDepartmentList = ',departments);
      },
      {
        onError: () => {
          setSemesterPool([]);
        },
      }
    );

    /*
        authGet(dispatch, token, "/edu/get-all-semester").then((res) => {
          console.log(res);
          setSemesterPool(res);
        });
        */
  };

  useEffect(() => {
    getAllCourses();
    getAllDepartments();
    getAllSemesters();
  }, []);

  const onClassIdChange = (event) => {
    setClassId(event.target.value);
    /*let classIdTemp = event.target.value;
    
      if (classIdTemp === null || classIdTemp.trim() === "" || isNormalInteger(classIdTemp))
        setInvalidClassId(false);          
      else
        setInvalidClassId(true);      
        */
    // remove checking digits
    setInvalidClassId(false);
  };

  // const onCourseIdChange = (event) => {
  //   let id = event.target.value;
  //   setCourseId(id);

  //   if (id === "") {
  //     setInvalidCourseId(false);
  //     setClassName(null);
  //     return;
  //   }

  //   let ok = false;
  //   coursePool.forEach((course) => {
  //     if (course.courseId === id) {
  //       setClassName(course.courseName);
  //       console.log(course.courseName);
  //       ok = true;
  //     }
  //   });
  //   if (!ok) {
  //     setInvalidCourseId(true);
  //     setClassName(null);
  //   } else {
  //     setInvalidCourseId(false);
  //   }
  // };

  const handleSubmit = () => {
    const data = {
      classCode: classId,
      semesterId: semesterId,
      courseId: courseId,
      classType: classType,
      departmentId: departmentId,
    };

    let invalidRequirementFieldTemp =
      classId === null ||
      classId.trim() === "" ||
      semesterId === null ||
      courseId === null ||
      classType === null ||
      departmentId === null;

    setInvalidRequirementField(invalidRequirementFieldTemp);
    if (invalidClassId) {
      alert("Mã học phần không thỏa mãn");
      return;
    }

    if (invalidRequirementFieldTemp) {
      alert("Điền các trường còn trống");
      return;
    }

    setIsRequesting(true);

    request(
      "POST",
      `/edu/class-management/class/add?teacherId=${user.id.get()}`,
      (res) => {
        setIsRequesting(false);
        console.log(res);
        if (res.data.message === "duplicate") {
          alert("Mã lớp đã tồn tại");
        } else if (res.status === 200) {
          history.push("/edu/teacher/class/list");
        }
      },
      {},
      data
    );
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Thêm mới lớp học
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            {invalidCourseId && (
              <Typography variant="h5" component="h5" color="error">
                Không tồn tại mã học phần {" " + courseId}
              </Typography>
            )}
            {invalidClassId && (
              <Typography variant="h5" component="h5" color="error">
                Mã học phần không thỏa mãn, chỉ bao gồm số không dấu
              </Typography>
            )}
            <div>
              <div>
                <TextField
                  className={classes.field}
                  variant="outlined"
                  size="small"
                  autoFocus
                  required
                  id="classId"
                  label="Mã lớp"
                  value={classId}
                  onChange={onClassIdChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  className={classes.field}
                  variant="outlined"
                  size="small"
                  required
                  id="select-course"
                  select
                  label="Học phần"
                  value={courseId}
                  onChange={(event) => {
                    setCourseId(event.target.value);
                  }}
                  SelectProps={{
                    MenuProps: {
                      classes: { list: classes.modeList },
                      PopoverClasses: {
                        paper: classes.popoverPaper,
                      },
                    },
                  }}
                >
                  {coursePool.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.id} - {item.courseName}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div>
                <TextField
                  className={classes.field}
                  variant="outlined"
                  size="small"
                  required
                  id="select-class-type"
                  select
                  label="Loại lớp"
                  value={classType}
                  onChange={(event) => {
                    setClassType(event.target.value);
                  }}
                  SelectProps={{
                    MenuProps: {
                      classes: { list: classes.modeList },
                      PopoverClasses: {
                        paper: classes.popoverPaper,
                      },
                    },
                  }}
                >
                  {classTypePool.map((item) => (
                    <MenuItem key={item.type} value={item.type}>
                      {item.type}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  className={classes.field}
                  required
                  variant="outlined"
                  size="small"
                  id="select-semester"
                  select
                  label="Học kì"
                  value={semesterId}
                  onChange={(event) => {
                    setSemesterId(event.target.value);
                  }}
                  SelectProps={{
                    MenuProps: {
                      classes: { list: classes.modeList },
                      PopoverClasses: {
                        paper: classes.popoverPaper,
                      },
                    },
                  }}
                >
                  {semesterPool.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.id}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  className={classes.field}
                  variant="outlined"
                  size="small"
                  required
                  id="select-department"
                  select
                  label="Trường/Khoa/Viện"
                  value={departmentId}
                  onChange={(event) => {
                    setDepartmentId(event.target.value);
                  }}
                  SelectProps={{
                    MenuProps: {
                      classes: { list: classes.modeList },
                      PopoverClasses: {
                        paper: classes.popoverPaper,
                      },
                    },
                  }}
                >
                  {departmentPool.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.id}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
          </form>
        </CardContent>
        <CardActions style={{ marginBottom: 32 }}>
          <PrimaryButton
            disabled={isRequesting}
            style={{ marginLeft: "45px" }}
            onClick={handleSubmit}
          >
            Lưu
          </PrimaryButton>
          <TertiaryButton
            onClick={() => history.push("/edu/teacher/class/list")}
          >
            Hủy
          </TertiaryButton>
        </CardActions>
      </Card>
    </MuiPickersUtilsProvider>
  );
}

const screenName = "SCREEN_EDUCATION_TEACHING_MANAGEMENT_TEACHER";
export default withScreenSecurity(ClassCreate, screenName, true);
