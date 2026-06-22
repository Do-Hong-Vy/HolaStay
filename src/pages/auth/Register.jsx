import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LuMail, LuLock, LuUserPlus, LuHouse, LuUser, LuEye, LuEyeOff } from "react-icons/lu";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    alert("Đăng ký thành công! Đang chuyển hướng...");
    navigate("/login");
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
            <h2>Tham gia HolaStay ngay.</h2>
            <p>
              Cùng tham gia cộng đồng sinh viên tìm trọ lớn nhất khu vực Hòa Lạc
              – Thạch Thất.
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

            <div className="auth-mobile-brand">
              <Link to="/">
                <LuHouse size={22} style={{ color: "var(--accent)" }} />
                HolaStay
              </Link>
            </div>

            <div className="auth-form-header">
              <h2>Tạo tài khoản mới</h2>
              <p>Điền thông tin bên dưới để bắt đầu tìm trọ.</p>
            </div>

            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Họ và tên</label>
                <div className="input-with-icon">
                  <LuUser size={18} />
                  <input
                    className="input-modern"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

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
                    placeholder="Ít nhất 6 ký tự"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Xác nhận mật khẩu</label>
                <div className="input-with-icon">
                  <LuLock size={18} />
                  <input
                    className="input-modern"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary-modern auth-submit-btn"
              >
                <LuUserPlus size={18} /> Tạo tài khoản
              </button>
            </form>

            <div className="auth-switch">
              <p>
                Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
