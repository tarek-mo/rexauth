import useUser from "../hooks/useUser";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { userInfo } = useUser();
  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
