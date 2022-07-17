import { AUTH_SERVICE_BASE_URL } from "config/config";
import { request } from "../api";

export const GET_SCREEN_SECURITY_INFORMATION_SUCCESS =
  "GET_SCREEN_SECURITY_INFORMATION_SUCCESS";
export const GET_SCREEN_SECURITY_INFORMATION_FAILURE =
  "GET_VIEW_PERMISSIONS_FAILURE";

// For using in mapDispatchToPorps.
export const getScrSecurInfo = (history) => (dispatch, getState) => {
  request(
    "get",
    null,
    (res) => {
      dispatch(getScrSecurInfoSuccess(new Set(res.data)));
    },
    {
      onError: (e) => {
        dispatch(getScrSecurInfoFailure());
      },
      401: () => {},
      rest: (e) => {},
    },
    {},
    { url: `${AUTH_SERVICE_BASE_URL}/screen-security` }
  );
};

// Action creators.
export const getScrSecurInfoSuccess = (permissions) => {
  return {
    type: GET_SCREEN_SECURITY_INFORMATION_SUCCESS,
    permissions,
  };
};

export const getScrSecurInfoFailure = () => {
  return {
    type: GET_SCREEN_SECURITY_INFORMATION_FAILURE,
  };
};
