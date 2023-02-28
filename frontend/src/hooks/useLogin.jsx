import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError([]);
    setSuccess(false);

    if (!email || !password) {
      return setError("Please enter all fields");
    }

    // Axios post request to backend to login
    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:4000/api/user/login", {
        email,
        password,
      });
      // Set token to local storage
      localStorage.setItem("auth-token", res.data.token);
      // Add success to state
      setSuccess(true);
      dispatch({ type: "LOGIN", payload: res.data.user });
    } catch (err) {
      setError(err.response.data.message);
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };
  return { login, error, success, isLoading };
};
