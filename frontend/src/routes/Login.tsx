import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link,
} from "@nextui-org/react";
import React, { FormEvent, useState } from "react";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../icons/EyeFilledIcon";
import { Link as RouterLink } from "react-router-dom";
import Container from "../components/Container";
import useUser from "../hooks/useUser";
import { useMutation } from "react-query";
import { login } from "../api/authApi";
import { toast } from "react-toastify";
import { getErrorMessage } from "../utils/getErrorMessage";

const Login = () => {
  const { saveUserInfo } = useUser();
  // form credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, mutate } = useMutation({
    mutationFn: async () => login({ email, password }),
    onSuccess: (data) => {
      console.log("success login", data);
      saveUserInfo(data);
    },
    onError: (error) => {
      console.log("error login", error);
      toast(getErrorMessage(error), { type: "error" });
    },
  });

  // password show/hide
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    mutate();
  };
  return (
    <Container>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>Login</CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="gap-3">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="Email"
            />

            <Input
              label="Password"
              variant="bordered"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </CardBody>
          <CardFooter className="flex-col gap-3">
            <div>
              New User ?{" "}
              <Link as={RouterLink} to="/register">
                Sign Up
              </Link>
            </div>
            <Button
              isDisabled={isLoading}
              color="primary"
              className="block w-full"
              type="submit"
            >
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
