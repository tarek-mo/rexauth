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
import { useMutation } from "react-query";
import { register } from "../api/authApi";
import useUser from "../hooks/useUser";
import { toast } from "react-toastify";
import { getErrorMessage } from "../utils/getErrorMessage";
const Register = () => {
  const { saveUserInfo } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isLoading, mutate } = useMutation({
    mutationFn: async () => register({ name, email, password }),
    onSuccess: (data) => {
      saveUserInfo(data);
    },
    onError: (error) => {
      console.log("error register", error);

      toast(getErrorMessage(error), { type: "error" });
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast("Passwords do not match", { type: "error" });
      return;
    }
    mutate();
  };

  // password show/hide
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Container>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>Signup</CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="gap-3">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
            />
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
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              label="Confirm Password"
            />
          </CardBody>
          <CardFooter className="flex-col gap-3">
            <div>
              Already have an account?
              <Link as={RouterLink} to="/login">
                Login
              </Link>
            </div>
            <Button
              isDisabled={isLoading}
              color="primary"
              className="block w-full"
              type="submit"
            >
              Signup
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Container>
  );
};

export default Register;
