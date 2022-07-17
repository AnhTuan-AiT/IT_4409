import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PrimaryButton from "./button/PrimaryButton";

const useStyles = makeStyles(() => ({
  wrapper: {
    background: "white",
    paddingTop: 16,
    // height: "83vh",
  },
  img: {
    width: 300,
    maxHeight: 250,
  },
  imgContainer: {
    width: 300,
    height: 250,
    marginBottom: 16,
    display: "flex",
    alignItems: "flex-end",
  },
  item: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  text: {
    fontSize: "1.1875rem",
    textAlign: "center",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.wrapper}
        flexDirection="column"
      >
        <Typography
          variant="h4"
          style={{ marginBottom: 24, fontWeight: "bold", textAlign: "center" }}
        >
          Chào mừng đến với CMS!
        </Typography>
        <Typography
          variant="body1"
          className={classes.text}
          style={{
            marginBottom: 32,
            maxWidth: 580,
          }}
        >
          CMS là nền tảng đào tạo trực tuyến mở, giúp trải nghiệm dạy và học trở
          nên hiệu quả và thú vị hơn. Những tiện ích tuyệt vời chúng tôi cung
          cấp là miễn phí và sẽ luôn là như vậy.
        </Typography>
        <PrimaryButton style={{ fontWeight: "bold" }}>Khám phá</PrimaryButton>
        <br />
        <Grid
          container
          justify="space-around"
          md={12}
          spacing={4}
          style={{ marginBottom: 24 }}
        >
          <Grid item md={4} className={classes.item}>
            <div className={classes.imgContainer}>
              <img
                src="/static/images/undraw_exams_g4ow.svg"
                className={classes.img}
                alt="exams"
              />
            </div>
            <Typography variant="body1" className={classes.text}>
              Cộng hưởng hiệu quả của đào tạo truyền thống với đào tạo trực
              tuyến.
            </Typography>
          </Grid>
          <Grid item md={4} className={classes.item}>
            <div className={classes.imgContainer}>
              <img
                src="/static/images/undraw_online_test_gba7.svg"
                className={classes.img}
                alt="online_test"
              />
            </div>
            <Typography variant="body1" className={classes.text}>
              +100 tính năng, tiện ích thông minh dành riêng cho bạn.
            </Typography>
          </Grid>
          <Grid item md={4} className={classes.item}>
            <div className={classes.imgContainer}>
              <img
                src="/static/images/undraw_researching_22gp.svg"
                className={classes.img}
                alt="researching"
              />
            </div>
            <Typography variant="body1" className={classes.text}>
              Học tập mọi lúc, mọi nơi trên thiết bị bạn thích.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <div
        style={{
          height: "34vh",
          textAlign: "center",
          backgroundImage: "url(/static/images/footer.jpeg)",
          backgroundSize: "100%",
          backgroundPosition: "bottom center",
          fontSize: "1rem",
          paddingTop: 32,
        }}
      >
        Bản quyền © 2022 AnhTuan-AiT, Bảo lưu mọi quyền
        <br />
        Trường Công nghệ Thông tin và Truyền thông - Đại học Bách Khoa Hà Nội
      </div>
    </>
  );
}
