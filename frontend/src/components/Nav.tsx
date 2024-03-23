import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  User,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Link as RouterLink } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useMutation } from "react-query";
import { logout } from "../api/authApi";
import { getErrorMessage } from "../utils/getErrorMessage";
import { toast } from "react-toastify";

const Nav = () => {
  const { userInfo, clearUserInfo } = useUser();
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => logout(),
    onSuccess: (data) => {
      console.log("success logout", data);
      clearUserInfo();
    },
    onError: (error) => {
      console.log("error logout", error);
      toast(getErrorMessage(error), { type: "error" });
    },
  });

  return (
    <Navbar>
      <NavbarBrand as={RouterLink} to={"/"}>
        <h1 className="font-bold text-3xl">RexAuth</h1>
      </NavbarBrand>

      <NavbarContent justify="end">
        {userInfo ? (
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: "https://www.svgrepo.com/show/532363/user-alt-1.svg",
                }}
                className="transition-transform"
                description={userInfo.email}
                name={userInfo.name}
              />
            </DropdownTrigger>
            <DropdownMenu
              disabledKeys={
                isLoading ? ["presentation", "logout"] : ["presentation"]
              }
              aria-label="User Actions"
              variant="flat"
            >
              <DropdownItem key="presentation" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">{userInfo.name}</p>
              </DropdownItem>

              <DropdownItem key="profile">
                <RouterLink to={"/profile"}>Profile</RouterLink>
              </DropdownItem>

              <DropdownItem
                onClick={() => mutate()}
                key="logout"
                color="danger"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className="flex">
              <Link as={RouterLink} to="/login">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={RouterLink}
                color="primary"
                to="/register"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
