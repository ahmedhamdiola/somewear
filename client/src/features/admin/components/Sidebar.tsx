import { NavLink, useNavigate } from "react-router-dom";
import { FaBox, FaUsers, FaShoppingCart, FaCheckCircle, FaHome, FaSignOutAlt } from "react-icons/fa";
import Logo from "../../../assets/LogoWhite.svg";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = ()=> {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-[220px] h-screen bg-black text-white p-4 flex flex-col  ">
      <div>
        <img src={Logo} className="h-14 object-contain cursor-pointer " />
      </div>
      <nav className="flex flex-col gap-2 mt-4 ">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center  gap-3 px-3 py-2 bg-mist-700 rounded-md"
              : "flex items-center gap-3 px-3 py-2 hover:bg-mist-700 rounded-md"
          }
          to="/admin" end
        >
          <FaHome />
          admin
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center  gap-3 px-3 py-2 bg-mist-700 rounded-md"
              : "flex items-center gap-3 px-3 py-2 hover:bg-mist-700 rounded-md"
          }
          to="/admin/products"
        >
          <FaBox />
          products
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center  gap-3 px-3 py-2 bg-mist-700 rounded-md"
              : "flex items-center gap-3 px-3 py-2 hover:bg-mist-700 rounded-md"
          }
          to="/admin/users"
        >
          <FaUsers />
          users
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center  gap-3 px-3 py-2 bg-mist-700 rounded-md"
              : "flex items-center gap-3 px-3 py-2 hover:bg-mist-700 rounded-md"
          }
          to="/admin/orders-new"
        >
          <FaShoppingCart />
          new orders
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center  gap-3 px-3 py-2 bg-mist-700 rounded-md"
              : "flex items-center gap-3 px-3 py-2 hover:bg-mist-700 rounded-md"
          }
          to="/admin/orders-completed"
        >
          <FaCheckCircle />
          completed orders
        </NavLink>
        
      </nav>
      <button 
      onClick={handleLogout}
      className="mt-auto flex items-center gap-3 px-3 py-2 rounded-md hover:bg-mist-700"
      >
        <FaSignOutAlt  className="text-red-500 "/>
        logout
      </button>
    </div>
  );
};

export default Sidebar;
