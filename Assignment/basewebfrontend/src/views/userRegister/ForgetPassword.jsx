import { Button, TextField } from "@material-ui/core";
import { AUTH_SERVICE_BASE_URL } from "config/config";
import { useState } from "react";
import { request } from "../../api";
export default function ForgetPassword() {
  const [userLogin, setUserLogin] = useState("");
  const [msg, setMsg] = useState("");
  function handleChange(e) {
    setUserLogin(e.target.value);
  }
  function handleClick() {
    //alert("reset password for " + userLogin);
    request(
      "get",
      null,
      (res) => {
        console.log("new password sent to email, res = ", res);
        setMsg(res.data.message);
      },
      {},
      {},
      {
        url: `${AUTH_SERVICE_BASE_URL}/public/user/resetpassword/${userLogin}`,
      }
    );
  }
  return (
    <div
      style={{
        display: "flex",

        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          paddingTop: "50px",

          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            paddingRight: "30px",

            justifyContent: "center",
          }}
        >
          <TextField label="userlogin" onChange={handleChange}></TextField>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" onClick={handleClick}>
            Reset password
          </Button>
        </div>
        <h2>{msg}</h2>
      </div>
    </div>
  );
}
