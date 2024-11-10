import { Outlet } from "react-router-dom";
import Sidebar from "../../fragments/sidebar/Sidebar"

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pl-24 py-10 pr-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
