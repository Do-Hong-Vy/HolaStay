import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { LuArrowLeft, LuPhone, LuPen } from "react-icons/lu";
import { houseService } from "../../services/houseService";
import { reviewService } from "../../services/reviewService";
import { Carousel } from "react-bootstrap";
import { formatPrice } from "../../utils/formatters";
import ReviewSection from "../../components/ReviewSection";
import HouseGeneralInfo from "../../components/HouseGeneralInfo";
import HouseServiceCosts from "../../components/HouseServiceCosts";

const HouseDetail = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [houseRes, reviewsRes] = await Promise.all([
          houseService.getById(id),
          reviewService.getAll(),
        ]);
        setHouse(houseRes);
        setReviews(reviewsRes.filter((r) => String(r.houseId) === String(id)));
      } catch {
        setError("Lỗi tải dữ liệu. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const images = house?.images || [house?.image].filter(Boolean);

  if (loading)
    return (
      <div
        className="container"
        style={{ padding: "60px 0", textAlign: "center" }}
      >
        Đang tải...
      </div>
    );
  if (error)
    return (
      <div
        className="container"
        style={{
          padding: "60px 0",
          textAlign: "center",
          color: "var(--danger)",
        }}
      >
        {error}
      </div>
    );
  if (!house)
    return (
      <div
        className="container"
        style={{
          padding: "60px 0",
          textAlign: "center",
          color: "var(--danger)",
        }}
      >
        Không tìm thấy nhà trọ.
      </div>
    );

  return (
    <div className="container detail-page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <Link
          to="/explore"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--text-muted)",
            fontSize: "0.9rem",
          }}
        >
          <LuArrowLeft size={18} /> Quay lại danh sách
        </Link>

        {isAdmin && (
          <Link
            to={`/admin/edit/${id}`}
            className="btn-primary-modern"
            style={{
              padding: "6px 14px",
              fontSize: "0.85rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <LuPen size={16} /> Chỉnh sửa
          </Link>
        )}
      </div>

      <div className="detail-layout">
        <div className="detail-main">
          <div
            className="detail-image-wrapper"
            style={{ position: "relative" }}
          >
            <Carousel>
              {images.map((img, idx) => (
                <Carousel.Item key={idx}>
                  <img src={img} alt={`${house.name} - ${idx + 1}`} />
                </Carousel.Item>
              ))}
            </Carousel>
            <span className="detail-price-badge">
              {formatPrice(house.currentPrice)}
            </span>
          </div>
          <h1 className="detail-title" style={{ margin: "24px 0 16px 0" }}>
            {house.name}
          </h1>
          <p className="detail-description">{house.description}</p>
          <div className="detail-amenities">
            {house.amenities?.map((a) => (
              <span key={a} className="modern-badge">
                {a}
              </span>
            ))}
          </div>

          {/* Reviews */}
          <div className="reviews-section">
            <ReviewSection
              houseId={id}
              reviews={reviews}
              setReviews={setReviews}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="detail-sidebar">
          <HouseGeneralInfo house={house} />
          <HouseServiceCosts house={house} />

          <div className="detail-info-card">
            <h4>Liên hệ chủ nhà</h4>
            <div className="info-row">
              <div className="info-icon icon-contact">
                <LuPhone size={20} />
              </div>
              <div>
                <p className="info-label">Hotline / Zalo</p>
                <p className="info-value">
                  {house.contactPhone || (
                    <span
                      style={{
                        color: "var(--danger)",
                        fontStyle: "italic",
                        fontSize: "0.85rem",
                      }}
                    >
                      Chưa cập nhật
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseDetail;
