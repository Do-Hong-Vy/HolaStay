import { Outlet, NavLink, Link, Navigate, useNavigate } from "react-router-dom";
import {
  LuColumns3,
  LuCirclePlus,
  LuLogOut,
  LuHouse,
} from "react-icons/lu";

const AdminLayout = () => {
  const navigate = useNavigate();

  if (localStorage.getItem("isAdmin") !== "true") {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <LuColumns3 size={24} />
          Admin Panel
        </div>
        <nav className="admin-nav">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <LuColumns3 size={20} /> Quản lý nhà trọ
          </NavLink>
          <NavLink
            to="/admin/add"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <LuCirclePlus size={20} /> Thêm trọ mới
          </NavLink>
          <Link to="/" style={{ marginTop: "auto" }}>
            <LuHouse size={20} /> Về trang chủ
          </Link>
          <Link to="/" className="danger" onClick={handleLogout} style={{ marginTop: "4px" }}>
            <LuLogOut size={20} /> Đăng xuất
          </Link>
        </nav>
      </aside>
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
