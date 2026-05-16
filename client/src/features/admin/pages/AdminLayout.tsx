import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";
const AdminLayout = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">

      <Sidebar />

      <div className="flex-1 bg-gray-100 p-4 md:p-6 overflow-y-auto md:ml-[220px] mb-16 md:mb-0">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;