import { NavLink, useNavigate } from "react-router-dom";
import { FaBox, FaUsers, FaShoppingCart, FaCheckCircle, FaHome, FaSignOutAlt, FaEnvelope } from "react-icons/fa";
import Logo from "../../../assets/LogoWhite.svg";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post("http://localhost:3000/users/logout", {}, { withCredentials: true }).catch(() => {});
    navigate("/login");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-black text-white flex flex-row items-center justify-around px-2 md:px-4 md:w-[220px] md:h-screen md:flex-col md:justify-start md:top-0 z-50">
      <div className="hidden md:block mb-6">
        <img src={Logo} className="h-14 object-contain cursor-pointer " />
      </div>
      <nav className="flex flex-row w-full justify-around md:flex-col md:gap-2 mt-0 md:mt-4">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 p-2 md:px-3 md:py-2 bg-mist-700 rounded-md text-white md:bg-mist-700"
              : "flex items-center gap-3 p-2 md:px-3 md:py-2 hover:bg-mist-700 rounded-md text-gray-400 md:text-white"
          }
          to="/admin" end
        >
          <FaHome className="text-xl md:text-base" />
          <span className="hidden md:block">admin</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 p-2 md:px-3 md:py-2 bg-mist-700 rounded-md text-white md:bg-mist-700"
              : "flex items-center gap-3 p-2 md:px-3 md:py-2 hover:bg-mist-700 rounded-md text-gray-400 md:text-white"
          }
          to="/admin/products"
        >
          <FaBox className="text-xl md:text-base" />
          <span className="hidden md:block">products</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 p-2 md:px-3 md:py-2 bg-mist-700 rounded-md text-white md:bg-mist-700"
              : "flex items-center gap-3 p-2 md:px-3 md:py-2 hover:bg-mist-700 rounded-md text-gray-400 md:text-white"
          }
          to="/admin/users"
        >
          <FaUsers className="text-xl md:text-base" />
          <span className="hidden md:block">users</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 p-2 md:px-3 md:py-2 bg-mist-700 rounded-md text-white md:bg-mist-700"
              : "flex items-center gap-3 p-2 md:px-3 md:py-2 hover:bg-mist-700 rounded-md text-gray-400 md:text-white"
          }
          to="/admin/orders-new"
        >
          <FaShoppingCart className="text-xl md:text-base" />
          <span className="hidden md:block">new orders</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 p-2 md:px-3 md:py-2 bg-mist-700 rounded-md text-white md:bg-mist-700"
              : "flex items-center gap-3 p-2 md:px-3 md:py-2 hover:bg-mist-700 rounded-md text-gray-400 md:text-white"
          }
          to="/admin/orders-completed"
        >
          <FaCheckCircle className="text-xl md:text-base" />
          <span className="hidden md:block">completed orders</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 p-2 md:px-3 md:py-2 bg-mist-700 rounded-md text-white md:bg-mist-700"
              : "flex items-center gap-3 p-2 md:px-3 md:py-2 hover:bg-mist-700 rounded-md text-gray-400 md:text-white"
          }
          to="/admin/contact-messages"
        >
          <FaEnvelope className="text-xl md:text-base" />
          <span className="hidden md:block">messages</span>
        </NavLink>
        
      </nav>
      <button 
      onClick={handleLogout}
      className="md:mt-auto flex items-center gap-3 p-2 md:px-3 md:py-2 rounded-md hover:bg-mist-700 text-gray-400 md:text-white"
      >
        <FaSignOutAlt className="text-red-500 text-xl md:text-base" />
        <span className="hidden md:block">logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
