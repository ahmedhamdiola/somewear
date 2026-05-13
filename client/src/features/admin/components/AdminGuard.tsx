import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const AdminGuard = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users/checkAdmin", {
          withCredentials: true,
        });
        setIsAdmin(res.data.data?.isAdmin === true);
      } catch {
        setIsAdmin(false);
      }
    };
    load();
  }, []);
 
  if (isAdmin === null) return null; 

  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminGuard; 