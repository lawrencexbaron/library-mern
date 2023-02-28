import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (email, password, passwordCheck, name) => {
    setError([]);
    setSuccess(false);

    if (!email || !password || !passwordCheck || !name) {
      return setError("Please enter all fields");
    }
    // Check if passwords match
    if (password !== passwordCheck) {
      return setError("Passwords do not match");
    }
    // Axios post request to backend to login
    try {
      const res = await axios.post("http://localhost:4000/api/user/register", {
        email,
        password,
        passwordCheck,
        name,
      });
      // Set token to local storage
      localStorage.setItem("auth-token", res.data.token);
      // Add success to state
      setSuccess(true);
      dispatch({ type: "LOGIN", payload: res.data });
    } catch (err) {
      // Add error to state
      setError(err.response.data.message);
      setSuccess(false);
    }
  };
  return { signup, error, success };
};
