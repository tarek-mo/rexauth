import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import Landing from "./routes/Landing";
import Login from "./routes/Login";
import Register from "./routes/Register";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./routes/Profile";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        {/* public routes */}
        <Route path="" element={<PublicRoute />}>
          <Route path="/" element={<Landing />} />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
        </Route>
        {/* private routes */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
