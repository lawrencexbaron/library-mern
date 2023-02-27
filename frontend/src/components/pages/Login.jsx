import { useState } from "react";
import Label from "../forms/Label";
import Input from "../forms/Input";
import Alert from "../forms/Alert";
import Card from "../forms/Card";
import Button from "../forms/Button";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, success, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <>
      <Card className="w-96">
        <div className="p-4">
          {error && error.length > 0 ? (
            // Show me tailwindcss transition fade in

            <Alert className="bg-red-500 ">
              {Array.isArray(error) ? (
                error.map((err, index) => (
                  <p key={index} className="text-white">
                    {err}
                  </p>
                ))
              ) : (
                <p className="text-white">{error}</p>
              )}
            </Alert>
          ) : (
            ""
          )}
          {success ? (
            <Alert className="bg-green-500">
              <p className="text-white">Successfully Logged In</p>
            </Alert>
          ) : (
            ""
          )}
          <h1 className="text-2xl font-bold text-gray-700">Login</h1>
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </div>
        <div className="p-4 border-t border-gray-200">
          <form method="POST" onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                className="w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                className="w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Button
                type="submit"
                className="w-full border border-gray-200 bg-blue-500"
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </>
  );
}

export default Login;
