import useUser from "../hooks/useUser";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { userInfo } = useUser();
  return userInfo ? <Navigate to={"/profile"} /> : <Outlet />;
};

export default PublicRoute;
