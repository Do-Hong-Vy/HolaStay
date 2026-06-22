import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHouses, deleteHouse } from "../../redux/houseSlice";
import { Link } from "react-router-dom";
import { LuHouse, LuPen, LuTrash, LuMapPin, LuBanknote } from "react-icons/lu";
import { formatPrice } from "../../utils/formatters";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { houses, loading, error } = useSelector((state) => state.house);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchHouses());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhà trọ này?")) {
      try {
        await dispatch(deleteHouse(id)).unwrap();
      } catch {
        alert("Không thể xóa nhà trọ do lỗi hệ thống. Vui lòng thử lại sau!");
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHouses = houses.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ margin: 0 }}>Quản lý nhà trọ</h2>
        <Link to="/admin/add" className="btn-primary-modern">
          + Thêm nhà trọ mới
        </Link>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <LuHouse size={24} />
          </div>
          <div className="stat-info">
            <h3>{houses.length}</h3>
            <p>Tổng số nhà trọ</p>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ color: "#10B981", background: "rgba(16, 185, 129, 0.1)" }}
          >
            <LuMapPin size={24} />
          </div>
          <div className="stat-info">
            <h3>{new Set(houses.map((h) => h.area)).size}</h3>
            <p>Khu vực quản lý</p>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ color: "#F59E0B", background: "rgba(245, 158, 11, 0.1)" }}
          >
            <LuBanknote size={24} />
          </div>
          <div className="stat-info">
            <h3>
              {houses.length
                ? formatPrice(
                    houses.reduce((acc, h) => acc + h.currentPrice, 0) /
                      houses.length,
                  )
                : 0}
            </h3>
            <p>Giá thuê trung bình</p>
          </div>
        </div>
      </div>

      <div className="admin-table-wrapper">
        {error && (
          <div
            style={{
              padding: "16px 20px",
              background: "rgba(239, 68, 68, 0.1)",
              color: "var(--danger)",
              borderRadius: "8px",
              marginBottom: "16px",
              fontWeight: 500,
            }}
          >
            Lỗi tải dữ liệu: {error}
          </div>
        )}
        {loading ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "var(--text-muted)",
            }}
          >
            Đang tải...
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên trọ</th>
                <th>Khu vực</th>
                <th>Phòng trống</th>
                <th>Giá thuê</th>
                <th style={{ textAlign: "right" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentHouses.map((house) => (
                <tr key={house.id}>
                  <td style={{ color: "var(--text-muted)" }}>{house.id}</td>
                  <td>
                    <div className="table-house-info">
                      <img
                        className="table-house-img"
                        src={house.image}
                        alt={house.name}
                      />
                      <span style={{ fontWeight: 600 }}>{house.name}</span>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-muted)" }}>{house.area}</td>
                  <td>
                    <span
                      style={{
                        fontWeight: 600,
                        color: "var(--success, #10B981)",
                      }}
                    >
                      {house.availableRooms || 0}
                    </span>
                  </td>
                  <td>
                    <span className="modern-badge">
                      {formatPrice(house.currentPrice)}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <Link to={`/admin/edit/${house.id}`} className="btn-edit">
                        <LuPen size={14} style={{ marginRight: "4px" }} /> Sửa
                      </Link>
                      <button
                        className="btn-danger-modern"
                        onClick={() => handleDelete(house.id)}
                      >
                        <LuTrash size={14} style={{ marginRight: "4px" }} /> Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && !error && houses.length > itemsPerPage && (
          <div className="admin-pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="page-btn"
            >
              Trước
            </button>
            {Array.from(
              { length: Math.ceil(houses.length / itemsPerPage) },
              (_, i) => i + 1,
            ).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`page-btn ${currentPage === page ? "active" : ""}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(houses.length / itemsPerPage)),
                )
              }
              disabled={currentPage === Math.ceil(houses.length / itemsPerPage)}
              className="page-btn"
            >
              Sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
