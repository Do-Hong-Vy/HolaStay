import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LuMail, LuLock, LuHouse, LuEye, LuEyeOff } from "react-icons/lu";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@holastay.vn" && password === "admin") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      // Lưu thông tin user giả lập
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/");
    }
  };

  return (
    <div className="auth-split-page">
      <div className="auth-card">
        {/* Left: Image + Branding */}
        <div
          className="auth-split-image"
          style={{ backgroundImage: `url('/img/hero-bg.jpg')` }}
        >
          <div className="auth-split-overlay"></div>
          <div className="auth-split-branding">
            <h2>Chào mừng đến với HolaStay.</h2>
            <p>
              Nền tảng tìm kiếm chỗ ở sinh viên an toàn, tiện nghi và hiện đại
              nhất khu vực Hòa Lạc.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="auth-split-form">
          <div className="auth-form-inner">
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                marginBottom: "32px",
                fontWeight: "600",
              }}
            >
              <LuHouse size={18} /> Về trang chủ
            </Link>

            {/* Mobile-only brand */}
            <div className="auth-mobile-brand">
              <Link to="/">
                <LuHouse size={28} color="var(--primary)" />
                HolaStay
              </Link>
            </div>

            <div className="auth-form-header">
              <h2>Đăng nhập</h2>
              <p>Vui lòng nhập thông tin để truy cập tài khoản của bạn.</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <div className="input-with-icon">
                  <LuMail size={18} />
                  <input
                    className="input-modern"
                    type="email"
                    placeholder="sinhvien@fpt.edu.vn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Mật khẩu</label>
                <div className="input-with-icon">
                  <LuLock size={18} />
                  <input
                    className="input-modern"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <LuEyeOff size={18} />
                    ) : (
                      <LuEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="auth-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Ghi nhớ đăng nhập
                </label>
                <a href="#" className="forgot-link">
                  Quên mật khẩu?
                </a>
              </div>

              <button
                type="submit"
                className="btn-primary-modern auth-submit-btn"
              >
                Đăng nhập
              </button>
            </form>

            <div className="auth-switch">
              <p>
                Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
