import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import React, { FormEvent, useState } from "react";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../icons/EyeFilledIcon";
import Container from "../components/Container";
import { useMutation } from "react-query";
import { updateProfile } from "../api/authApi";
import useUser from "../hooks/useUser";
import { toast } from "react-toastify";
import { getErrorMessage } from "../utils/getErrorMessage";
const Profile = () => {
  const { saveUserInfo, userInfo } = useUser();
  const [name, setName] = useState(userInfo?.name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isLoading, mutate } = useMutation({
    mutationFn: async () => updateProfile({ name, email, password }),
    onSuccess: (data) => {
      saveUserInfo(data);
      toast("Profile updated succesfully", { type: "success" });
      setPassword("");
      setConfirmPassword("");
    },
    onError: (error) => {
      console.log("error update profile", error);

      toast(getErrorMessage(error), { type: "error" });
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
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
        <CardHeader>Update Profile</CardHeader>
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
              placeholder="Keep empty to keep the same password"
              // disable autocomplete
              autoComplete="new-password"
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
            {password && (
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                label="Confirm Password"
              />
            )}
          </CardBody>
          <CardFooter className="flex-col gap-3">
            <Button
              isDisabled={isLoading}
              color="primary"
              className="block w-full"
              type="submit"
            >
              Update Profile
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Container>
  );
};

export default Profile;
