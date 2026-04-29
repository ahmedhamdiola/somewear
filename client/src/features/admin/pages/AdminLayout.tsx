import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";
const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;