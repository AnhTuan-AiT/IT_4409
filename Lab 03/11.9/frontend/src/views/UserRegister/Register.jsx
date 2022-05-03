import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
// import { DevTool } from "react-hook-form-devtools";
import PositiveButton from "../../components/button/PositiveButton";
import CustomizedDialogs from "../../components/dialog/CustomizedDialogs";

const theme = createTheme({
  overrides: {
    MuiMenuItem: {
      root: {
        marginBottom: 2,
        "&$selected, &$selected:focus, &$selected:hover": {
          // This is to refer to the prop provided by M-UI
          color: "white",
          backgroundColor: "#1976d2", // updated backgroundColor
          marginBottom: 2,
        },
      },
    },
  },
});

const useStyles = makeStyles(() => ({
  img: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: "6px",
    borderBottomRightRadius: "6px",
  },
  imgWrapper: {
    minWidth: 730,
    minHeight: 580,
  },
  wrapper: {
    background: "#311b92",
    height: "100vh",
    minHeight: 694,
    minWidth: 1366,
  },
  form: {
    background: "white",
    borderTopLeftRadius: "6px",
    borderBottomLeftRadius: "6px",
    paddingLeft: 24,
    paddingRight: 24,
    maxWidth: 540,
  },
  formField: {
    width: 220,
  },
  container: {
    flex: "0 1 auto",
    boxShadow: "5px 5px 5px white",
    borderRadius: "6px",
    maxWidth: 1294,
  },
  createBtn: {
    borderRadius: 20,
    width: 160,
    textTransform: "none",
    fontWeight: "bold",
    backgroundColor: "#1877f2",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "#1834d2",
    },
  },
  createBtnWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  createBtnContainer: {
    width: "100%",
    marginTop: 44,
    marginBottom: 16,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -16,
    marginLeft: -12,
  },
  title: {
    fontFamily: "'Roboto', sans-serif",
  },
  confirmBtn: {
    marginRight: theme.spacing(1),
  },
}));

const schools = [
  { id: "gdqp", name: "Khoa Giáo dục Quốc phòng & An ninh" },
  { id: "gdtc", name: "Khoa Giáo dục Thể chất" },
  { id: "fpt", name: "Khoa Lý luận Chính trị" },
  { id: "sme", name: "Trường Cơ khí" },
  { id: "sbft", name: "Viện Công nghệ Sinh học và Công nghệ Thực phẩm" },
  { id: "soict", name: "Trường Công nghệ Thông tin và Truyền thông" },
  { id: "bktextile", name: "Viện Dệt may - Da giầy và Thời trang" },
  { id: "inest", name: "Viện Khoa học và Công nghệ Môi trường" },
  { id: "mse", name: "Viện Khoa học và Kỹ thuật Vật liệu" },
  { id: "sem", name: "Viện Kinh tế và Quản lý" },
  { id: "chemeng", name: "Viện Kỹ thuật Hóa học" },
  { id: "sofl", name: "Viện Ngoại ngữ" },
  { id: "feed", name: "Viện Sư phạm Kỹ thuật" },
  { id: "sami", name: "Viện Toán ứng dụng và Tin học" },
  { id: "sep", name: "Viện Vật lý Kỹ thuật" },
  { id: "seee", name: "Trường Điện - Điện tử" },
];

export default function Register() {
  const classes = useStyles();

  //
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = React.useState(false);

  // Dialog.
  const [open, setOpen] = useState(false);

  // Forms.
  const { register, handleSubmit, control, errors, reset, watch } = useForm({
    defaultValues: {
      userLoginId: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      phoneNumber: "",
      lastName: "",
      email: "",
      school: "",
    },
    submitFocusError: false,
  });

  // Functions.
  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      reset();
      setLoading(false);
      setOpen(true);
    }, 1000);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={classes.wrapper}
    >
      <Box width="91.67%" display="flex" justifyContent="center">
        <Grid
          container
          md={12}
          alignItems="stretch"
          className={classes.container}
        >
          <Grid item md={5} xs={5} sm={5} className={classes.form}>
            <Grid
              container
              md={12}
              alignItems="center"
              justify="center"
              style={{ height: "100%" }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{ height: 56 }}
                >
                  <Typography variant="h4" className={classes.title}>
                    Tạo tài khoản
                  </Typography>
                </Box>
                <Grid container justify="space-between" md={12}>
                  <Controller
                    name="userLoginId"
                    control={control}
                    onChange={([event]) => {
                      return event.target.value.trim();
                    }}
                    rules={{
                      required: "Trường này được yêu cầu",
                      maxLength: {
                        value: 60,
                        message:
                          "Vui lòng chọn tên người dùng không vượt quá 60 kí tự",
                      },
                    }}
                    as={
                      <TextField
                        value={watch("userLoginId")}
                        label="Tên người dùng*"
                        error={!!errors.userLoginId}
                        helperText={errors.userLoginId?.message}
                        className={classes.formField}
                        style={{ marginBottom: errors.userLoginId ? 0 : 20 }}
                      />
                    }
                  />
                  <Controller
                    name="firstName"
                    control={control}
                    onChange={([event]) => {
                      return event.target.value.trimLeft();
                    }}
                    rules={{
                      required: "Trường này được yêu cầu",
                      maxLength: {
                        value: 100,
                        message: "Vui lòng sử dụng họ không vượt quá 100 kí tự",
                      },
                    }}
                    as={
                      <TextField
                        value={watch("firstName")}
                        label="Họ*"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        className={classes.formField}
                        style={{ marginBottom: errors.firstName ? 0 : 20 }}
                      />
                    }
                  />
                  {/* <TextField
                    name="phoneNumber"
                    value={watch("phoneNumber")}
                    label="Số điện thoại*"
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                    className={classes.formField}
                    style={{ marginBottom: errors.phoneNumber ? 0 : 20 }}
                    inputRef={register({
                      required: "Trường này được yêu cầu",
                      pattern: {
                        value: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
                        message: "Số điện thoại không hợp lệ",
                      },
                    })}
                  /> */}
                  <Controller
                    name="phoneNumber"
                    control={control}
                    onChange={([event]) => {
                      return event.target.value.trim();
                    }}
                    rules={{
                      required: "Trường này được yêu cầu",
                      minLength: {
                        value: 9,
                        message: "Số điện thoại không hợp lệ",
                      },
                      maxLength: {
                        value: 10,
                        message: "Số điện thoại không hợp lệ",
                      },
                      pattern: {
                        value:
                          /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
                        message: "Số điện thoại không hợp lệ",
                      },
                    }}
                    as={
                      <TextField
                        value={watch("phoneNumber")}
                        label="Số điện thoại*"
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                        className={classes.formField}
                        style={{ marginBottom: errors.phoneNumber ? 0 : 20 }}
                      />
                    }
                  />
                  <Controller
                    name="lastName"
                    control={control}
                    onChange={([event]) => {
                      return event.target.value.trimLeft();
                    }}
                    rules={{
                      required: "Trường này được yêu cầu",
                      maxLength: {
                        value: 100,
                        message:
                          "Vui lòng sử dụng tên không vượt quá 100 kí tự",
                      },
                    }}
                    as={
                      <TextField
                        value={watch("lastName")}
                        label="Tên*"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        className={classes.formField}
                        style={{ marginBottom: errors.lastName ? 0 : 20 }}
                      />
                    }
                  />
                  <Controller
                    name="password"
                    control={control}
                    onChange={([event]) => {
                      return event.target.value.trim();
                    }}
                    rules={{
                      required: "Trường này được yêu cầu",
                      minLength: {
                        value: 8,
                        message: "Vui lòng chọn mật khẩu chứa ít nhất 8 kí tự",
                      },
                      maxLength: {
                        value: 60,
                        message:
                          "Vui lòng chọn mật khẩu không vượt quá 60 kí tự",
                      },
                    }}
                    as={
                      <FormControl>
                        <InputLabel
                          error={!!errors.password}
                          htmlFor="standard-adornment-password"
                        >
                          Mật khẩu*
                        </InputLabel>
                        <Input
                          id="standard-adornment-password"
                          error={!!errors.password}
                          value={watch("password")}
                          type={showPassword ? "text" : "password"}
                          className={classes.formField}
                          style={{ marginBottom: errors.password ? 0 : 20 }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <FormHelperText
                          error={!!errors.password}
                          className={classes.formField}
                        >
                          {errors.password?.message}
                        </FormHelperText>
                      </FormControl>
                    }
                  />
                  <Controller
                    name="confirmPassword"
                    control={control}
                    onChange={([event]) => {
                      return event.target.value.trim();
                    }}
                    rules={{
                      required: "Trường này được yêu cầu",
                      validate: {
                        same: (confirmPassword) => {
                          if (confirmPassword !== watch("password")) {
                            return "Mật khẩu không khớp";
                          }
                          return true;
                        },
                      },
                    }}
                    as={
                      <FormControl>
                        <InputLabel
                          error={!!errors.confirmPassword}
                          htmlFor="standard-adornment-confirm-password"
                        >
                          Xác nhận mật khẩu*
                        </InputLabel>
                        <Input
                          id="standard-adornment-confirm-password"
                          error={!!errors.confirmPassword}
                          value={watch("confirmPassword")}
                          type={showPassword ? "text" : "password"}
                          className={classes.formField}
                          style={{
                            marginBottom: errors.confirmPassword ? 0 : 20,
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle confirm password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <FormHelperText
                          error={!!errors.confirmPassword}
                          className={classes.formField}
                        >
                          {errors.confirmPassword?.message}
                        </FormHelperText>
                      </FormControl>
                    }
                  />
                  <TextField
                    name="email"
                    value={watch("email")}
                    label="Email*"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    className={classes.formField}
                    style={{ marginBottom: errors.email ? 0 : 20 }}
                    inputRef={register({
                      required: "Trường này được yêu cầu",
                      maxLength: {
                        value: 100,
                        message:
                          "Vui lòng sử dụng email không vượt quá 100 kí tự",
                      },
                      pattern: {
                        value:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Email không hợp lệ",
                      },
                    })}
                  />
                  <ThemeProvider theme={theme}>
                    <Controller
                      as={
                        <TextField
                          select
                          label="Trường/Viện*"
                          error={!!errors.school}
                          helperText={errors.school?.message}
                          className={classes.formField}
                        >
                          {schools.map((school) => (
                            <MenuItem key={school.id} value={school.id}>
                              {school.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      }
                      name="school"
                      control={control}
                      rules={{
                        validate: {
                          required: (school) => {
                            if (!school) {
                              return "Trường này được yêu cầu";
                            }
                            return true;
                          },
                        },
                      }}
                    />
                  </ThemeProvider>

                  <Box
                    display="flex"
                    justifyContent="center"
                    className={classes.createBtnContainer}
                  >
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      className={classes.createBtnWrapper}
                    >
                      <Button
                        disabled={loading}
                        variant="contained"
                        type="submit"
                        color="primary"
                        className={classes.createBtn}
                      >
                        Tạo
                      </Button>
                      {loading && (
                        <CircularProgress
                          size={32}
                          className={classes.buttonProgress}
                        />
                      )}
                    </motion.div>
                  </Box>
                </Grid>
              </form>
              {/* <DevTool control={control} /> */}
            </Grid>
          </Grid>
          <Grid item md={7} xs={7} sm={7} className={classes.imgWrapper}>
            <CardMedia
              image="/static/images/sign_up.jpg"
              className={classes.img}
            />
          </Grid>
        </Grid>
      </Box>

      <CustomizedDialogs
        open={open}
        handleClose={handleClose}
        title="Đăng ký tài khoản thành công"
        centerTitle
        content={
          <Typography color="textSecondary" gutterBottom style={{ padding: 8 }}>
            Vui lòng chờ quản trị viên phê duyệt để sử dụng các tính năng của hệ
            thống.
          </Typography>
        }
        actions={
          <PositiveButton
            label="OK"
            onClick={handleClose}
            className={classes.confirmBtn}
          />
        }
      />
    </Box>
  );
}
