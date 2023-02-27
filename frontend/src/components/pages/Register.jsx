import { useState } from "react";
import Label from "../forms/Label";
import Input from "../forms/Input";
import Alert from "../forms/Alert";
import Card from "../forms/Card";
import Button from "../forms/Button";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const { signup, error, success } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, passwordCheck, name);
    setEmail("");
    setPassword("");
    setPasswordCheck("");
    setName("");
  };

  return (
    <>
      <Card className="w-96">
        <div className="p-4">
          {error && error.length > 0 ? (
            <Alert className="bg-red-500">
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
          ) : null}
          {success ? (
            <Alert className="bg-green-500">
              <p className="text-white">Success</p>
            </Alert>
          ) : null}
          <h1 className="text-2xl font-bold text-gray-700">Register</h1>
          <p className="text-sm text-gray-500">
            Already have an account?
            <Link to="/login" className="text-blue-500 ml-1">
              Login
            </Link>
          </p>
        </div>
        <div className="p-4 border-t border-gray-200 w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                id="email"
                className={"w-full"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className={"w-full"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="passwordCheck">Confirm Password</Label>
              <Input
                type="password"
                name="passwordCheck"
                id="passwordCheck"
                placeholder="Confirm your password"
                className={"w-full"}
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                type="text"
                placeholder="Enter your display name"
                name="displayName"
                id="displayName"
                className={"w-full"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Button
                type="submit"
                className={"w-full border border-gray-200 bg-blue-500"}
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </>
  );
}

export default Register;
