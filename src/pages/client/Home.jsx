import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchHouses } from "../../redux/houseSlice";
import { motion } from "framer-motion";
import { LuSearch, LuChevronRight } from "react-icons/lu";
import HouseCard from "../../components/HouseCard";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { houses, loading, error } = useSelector((state) => state.house);

  useEffect(() => {
    dispatch(fetchHouses());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/explore");
    }
  };

  const featuredHouses = houses.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hero-inner">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Tìm Kiếm Nhà Trọ <br />
            <span>Hoàn Hảo Tại Hòa Lạc</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Hơn {houses.length}+ nhà trọ chất lượng, phù hợp cho sinh viên với
            giá tốt, gần FPT & ĐHQG.
          </motion.p>

          <motion.form
            className="hero-search"
            onSubmit={handleSearch}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <LuSearch size={20} className="hero-search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm khu vực, tên nhà trọ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Khám Phá Ngay</button>
          </motion.form>
        </div>
      </motion.section>

      {/* Featured */}
      {loading && (
        <section className="featured-section">
          <div className="container" style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
            Đang tải nhà trọ nổi bật...
          </div>
        </section>
      )}
      {error && (
        <section className="featured-section">
          <div className="container" style={{ textAlign: "center", padding: "40px 0", color: "var(--danger)" }}>
            Lỗi tải dữ liệu: {error}
          </div>
        </section>
      )}
      {!loading && !error && featuredHouses.length > 0 && (
        <section className="featured-section">
          <div className="container">
            <div className="section-header-row">
              <div>
                <h2>Nhà Trọ Nổi Bật</h2>
                <p>Những lựa chọn hàng đầu được sinh viên yêu thích nhất.</p>
              </div>
              <Link to="/explore" className="view-all-link">
                Xem thêm <LuChevronRight size={18} />
              </Link>
            </div>
            <div className="featured-grid">
              {featuredHouses.map((house) => (
                <HouseCard key={house.id} house={house} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
