import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = async () => {
    // remove user from local storage to log user out
    localStorage.removeItem("auth-token");
    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};
