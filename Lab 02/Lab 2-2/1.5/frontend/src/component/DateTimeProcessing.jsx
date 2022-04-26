import DateFnsUtils from "@date-io/date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/styles";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { request } from "../Api";

const useStyles = makeStyles((them) => ({
  card: {
    width: 360,
    minHeight: 400,
    borderRadius: "6px",
  },
  datePicker: {
    width: "100%",
  },
  timePicker: {
    width: "100%",
  },
  title: {
    color: "blue",
  },
  name: {
    width: "100%",
  },
  submitBtn: {
    borderRadius: "6px",
    backgroundColor: "#1877f2",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#1834d2",
    },
  },
  resetBtn: {
    textTransform: "none",
  },
}));

function DateTimeProcessing() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(() => {
    let date = new Date();

    date.setDate(date.getDate() + 1);
    date.setHours(8);
    date.setMinutes(0);
    date.setSeconds(0);

    return date;
  });

  const [error, setError] = useState(false);
  const [response, setResponse] = useState({ isSuccess: false });
  const { register, handleSubmit, watch, errors, reset } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onClickResetBtn = () => {
    setSelectedDate(() => {
      let date = new Date();

      date.setDate(date.getDate() + 1);
      date.setHours(8);
      date.setMinutes(0);
      date.setSeconds(0);

      return date;
    });
    reset({ name: "" });
  };

  const onSubmit = (data) => {
    request(
      "POST",
      "/index.php",
      (res) => {
        setResponse(res.data);
      },
      {},
      { name: data.name, date: selectedDate.toString() }
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      fullWidth
      height={window.innerHeight}
    >
      <Card className={classes.card} elevation={8}>
        {response.isSuccess ? (
          <Fragment>
            <CardHeader
              title={
                <Typography variant="h5">Chào {response.name}!</Typography>
              }
            />
            <CardContent>
              <Typography>
                Bạn đã lên lịch một sự kiện diễn ra vào{" "}
                {response["24-hourTime"]}, {response.date}. Dưới đây là một số
                thông tin bổ sung:
              </Typography>
              <br />
              <Typography>
                + Thời gian và ngày diễn ra sự kiện là {response["12-hourTime"]}
                , {response.date} (định dạng 12 giờ).
              </Typography>
              <br />
              <Typography>+ Tháng đó có {response.noDays} ngày.</Typography>
            </CardContent>
          </Fragment>
        ) : (
          <Fragment>
            <CardHeader
              avatar={
                <Avatar style={{ background: "#07BC0C" }}>
                  <AddIcon />
                </Avatar>
              }
              title={<Typography variant="h5">Thêm sự kiện</Typography>}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <TextField
                  name="name"
                  label="Tên*"
                  value={watch("name")}
                  error={errors.name ? true : null}
                  helperText={errors.name?.message}
                  className={classes.name}
                  inputRef={register({
                    required: "Trường này được yêu cầu",
                  })}
                />
                <br />
                <br />
                <LocalizationProvider dateAdapter={DateFnsUtils}>
                  <DatePicker
                    allowKeyboardControl={true}
                    cancelLabel="Huỷ"
                    okLabel="Chọn"
                    // disablePast={true}
                    label="Ngày"
                    mask={"__ / __ / ____"}
                    value={selectedDate}
                    onChange={(newDate) => setSelectedDate(newDate)}
                    renderInput={(props) => (
                      <TextField className={classes.datePicker} {...props} />
                    )}
                  />
                  <br />
                  <br />
                  <TimePicker
                    className={classes.timePicker}
                    allowKeyboardControl={true}
                    cancelLabel="Huỷ"
                    okLabel="Chọn"
                    ampm={false}
                    openTo="hours"
                    views={["hours", "minutes", "seconds"]}
                    inputFormat="HH:mm:ss"
                    mask="__:__:__"
                    minTime={new Date(0, 0, 0, 7)}
                    maxTime={new Date(0, 0, 0, 18, 30)}
                    label="Thời gian"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    onError={(reason) => setError(true)}
                    onAccept={() => setError(false)}
                    renderInput={(props) => (
                      <TextField
                        error={error}
                        helperText={
                          "Vui lòng chọn thời gian trong khoảng 07:00 - 18:30"
                        }
                        className={classes.datePicker}
                        {...props}
                      />
                    )}
                  />
                </LocalizationProvider>
              </CardContent>
              <CardActions>
                <Box display="flex" width="100%" justifyContent="flex-end">
                  <Button
                    // size="small"
                    color="primary"
                    className={classes.resetBtn}
                    onClick={onClickResetBtn}
                  >
                    Đặt lại
                  </Button>
                  <Button
                    type="submit"
                    // size="small"
                    variant="contained"
                    color="primary"
                    className={classes.submitBtn}
                  >
                    Lưu
                  </Button>
                </Box>
              </CardActions>
            </form>
          </Fragment>
        )}
      </Card>
    </Box>
  );
}

export default DateTimeProcessing;
