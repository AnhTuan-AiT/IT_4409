import { LinearProgress } from "@material-ui/core";
import { AUTH_SERVICE_BASE_URL } from "config/config";
import { useEffect, useState } from "react";
import { useStyles } from "routers/MainAppRoutes";
import { request } from "../api";
import NotAuthorized from "./common/NotAuthorzied";

function withScreenSecurity(SecurityComponent, screenName, viewError) {
  return function ScreenSecurityComponent({ ...props }) {
    const classes = useStyles();
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    console.log(SecurityComponent.name);

    useEffect(() => {
      setIsChecking(true);

      request(
        "GET",
        null,
        (res) => {
          console.log(res);
          setIsChecking(false);
          if (res.data.result === "INCLUDED") setIsAuthorized(true);
        },
        {
          onError: () => {
            console.log("error");
            setIsChecking(false);
          },
        },
        {},
        {
          url: `${AUTH_SERVICE_BASE_URL}/check-authority?applicationId=${screenName}`,
        }
      );
    }, []);
    if (isChecking)
      return <LinearProgress className={classes.loadingProgress} />;
    else if (isAuthorized) return <SecurityComponent {...props} />;
    else if (viewError) return <NotAuthorized />;
    else return "";
  };
}
export default withScreenSecurity;
