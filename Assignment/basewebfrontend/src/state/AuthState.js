import { createState, useState } from "@hookstate/core";
import axios from "axios";
import { AUTH_SERVICE_BASE_URL } from "config/config";

export const authState = createState({
  isAuthenticated: false,
  isValidating: false,
  token: undefined,
});

export function useAuthState() {
  return useState(authState);
}

export function validateToken() {
  const token = localStorage.getItem("TOKEN");

  if (token) {
    const tokenUpperCase = token.toUpperCase();

    if (tokenUpperCase !== "NULL" && tokenUpperCase !== "UNDEFINED") {
      authState.isValidating.set(true);

      axios
        .get(`${AUTH_SERVICE_BASE_URL}/ping`, {
          headers: {
            "X-Auth-Token": token,
          },
        })
        .then((res) => {
          authState.merge({
            token: token,
            isAuthenticated: true,
            isValidating: false,
            user: { id: res.data.user },
          });
        })
        .catch((error) => {
          console.log("error ", error);

          authState.isValidating.set(false);
          localStorage.removeItem("TOKEN");
        });
    }
  }
}
