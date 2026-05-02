import { Navigate, Outlet } from "react-router-dom";

const AdminGuard = () => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  if(!token || !userString){
    return <Navigate to="/login" replace />
  }

  const userdata = JSON.parse(userString);
  
  if(userdata.role !== "admin"){
    return <Navigate to="/" replace />
  }

  return <Outlet/>

};

export default AdminGuard;