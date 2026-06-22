import { NavLink, Link, useNavigate } from "react-router-dom";
import { LuHouse, LuUser, LuSun, LuMoon, LuLogOut } from "react-icons/lu";
import { useTheme } from "../contexts/ThemeContext";
import { useState } from "react";

const NavBar = () => {
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <LuHouse size={22} />
          HolaStay
        </Link>

        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Khám phá
          </NavLink>
        </div>

        <div className="navbar-right">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={dark ? "Sáng" : "Tối"}
          >
            {dark ? <LuSun size={16} /> : <LuMoon size={16} />}
          </button>
          <div className="navbar-auth">
            {isAdmin ? (
              <Link
                to="/admin"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: 600,
                  color: "var(--primary)",
                }}
              >
                <LuUser size={20} /> Admin
              </Link>
            ) : user ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <span
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "var(--text)",
                  }}
                >
                  {user.email.split("@")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "var(--danger)",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    padding: "6px 12px",
                    borderRadius: "6px",
                  }}
                >
                  <LuLogOut size={16} /> Đăng xuất
                </button>
              </div>
            ) : (
              <Link to="/login">
                <LuUser size={20} />
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
