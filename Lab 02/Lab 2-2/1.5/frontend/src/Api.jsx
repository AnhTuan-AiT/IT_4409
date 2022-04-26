import axios from "axios";
import { API_URL } from "./config/config";

const isFunction = (func) =>
  func &&
  (Object.prototype.toString.call(func) === "[object Function]" ||
    "function" === typeof func ||
    func instanceof Function);

export const request = async (
  method,
  url,
  successHandler,
  errorHandlers,
  data
) => {
  try {
    const reqMethod = method.toUpperCase();
    let res;

    switch (reqMethod) {
      case "GET":
        res = await axios.get(API_URL + url, {
          headers: {
            "content-type": "application/json",
          },
        });
        break;
      case "POST":
        res = await axios.post(API_URL + url, data, {
          headers: {
            "content-type": "application/json",
          },
        });
        break;
      case "PUT":
        res = axios.put(API_URL + url, data, {
          headers: {
            "content-type": "application/json",
          },
        });
        break;
    }

    if (isFunction(successHandler)) {
      successHandler(res);
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx.
      switch (error.response.status) {
        case 401:
          console.log("Unauthorized");
          break;
        case 403:
          console.log("Fobidden");
          break;
        default:
          if (isFunction(errorHandlers[error.response.status])) {
            errorHandlers[error.response.status](error);
          } else {
            console.log("Error");
          }
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(
        "The request was made but no response was received",
        error.request
      );
    } else {
      // Something happened in setting up the request that triggered an Error.
      console.log(
        "Something happened in setting up the request that triggered an Error",
        error.message
      );
    }
    console.log(error.config);
  }
};
