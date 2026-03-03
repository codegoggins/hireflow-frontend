import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
import Navbar from "../components/shared/Navbar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-main-black">
      <Sidebar />
      <div className="flex-1 ml-60 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
