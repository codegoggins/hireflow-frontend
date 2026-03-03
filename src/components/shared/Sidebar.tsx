import { NavLink, useNavigate } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuUsers,
  LuCalendarCheck,
  LuListOrdered,
  LuUserCheck,
  LuChartBar,
  LuBuilding2,
  LuFileText,
  LuSettings,
  LuLogOut,
} from "react-icons/lu";
import Logo from "./Logo";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: LuLayoutDashboard },
  { label: "Candidates", path: "/candidates", icon: LuUsers },
  { label: "Interviews", path: "/interviews", icon: LuCalendarCheck },
  { label: "Queue", path: "/queue", icon: LuListOrdered },
  { label: "Interviewers", path: "/interviewers", icon: LuUserCheck },
  { label: "Analytics", path: "/analytics", icon: LuChartBar },
  { label: "Departments", path: "/departments", icon: LuBuilding2 },
  { label: "Reports", path: "/reports", icon: LuFileText },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/auth/login");
  };

  return (
    <aside className="w-60 h-screen bg-main-black border-r border-white/10 flex flex-col fixed left-0 top-0">
      <div className="p-5">
        <Logo className="text-white" />
      </div>
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-auth-green/15 text-auth-green"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80"
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 pb-4 flex flex-col gap-1 pt-4">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-auth-green/15 text-auth-green"
                : "text-white/50 hover:bg-white/5 hover:text-white/80"
            }`
          }
        >
          <LuSettings size={18} />
          Settings
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/50 hover:bg-white/5 hover:text-red-400 transition-colors w-full cursor-pointer"
        >
          <LuLogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
