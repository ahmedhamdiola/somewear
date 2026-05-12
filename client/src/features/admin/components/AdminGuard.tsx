import { Navigate, Outlet } from "react-router-dom";

const AdminGuard = () => {
  const userId = localStorage.getItem("userId");

  // if (!token || !userString) {
  //   return <Navigate to="/login" replace />
  // }

  // const userdata = JSON.parse(userString);

  //if (userdata.role !== "admin") {
  if (userId !== "3") {
    return <Navigate to="/" replace />
  }

  return <Outlet />

};

export default AdminGuard;