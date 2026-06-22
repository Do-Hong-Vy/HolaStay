import { Link } from "react-router-dom";
import { LuHouse, LuHeart } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 mb-4">
            <div className="footer-brand mb-3">
              <LuHouse size={24} />
              <span style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                HolaStay
              </span>
            </div>
            <p className="footer-desc">
              Nền tảng tìm kiếm nhà trọ dành riêng cho sinh viên khu vực Hòa
              Lạc. Thông tin chân thực, đánh giá từ cộng đồng, giúp bạn tìm được
              nơi ở lý tưởng.
            </p>
          </div>
          <div className="col-6 col-md-3 mb-4">
            <h4 className="mb-3">Khu vực</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/explore" className="text-decoration-none">
                  Hòa Lạc
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/explore" className="text-decoration-none">
                  Tân Xã
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/explore" className="text-decoration-none">
                  Thạch Hòa
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/explore" className="text-decoration-none">
                  Bình Yên
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-4 mb-4">
            <h4 className="mb-3">Liên hệ</h4>
            <ul className="list-unstyled">
              <li className="mb-2">Email: holastay@gmail.com</li>
              <li className="mb-2">Hotline: 0123 456 789</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} HolaStay. Made with{" "}
          <LuHeart size={14} color="#ef4444" fill="#ef4444" /> by Đỗ Hồng Vỹ.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
