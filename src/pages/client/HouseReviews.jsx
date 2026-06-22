import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import { houseService } from "../../services/houseService";
import { reviewService } from "../../services/reviewService";
import ReviewSection from "../../components/ReviewSection";

const HouseReviews = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [houseRes, reviewsRes] = await Promise.all([
          houseService.getById(id),
          reviewService.getAll(),
        ]);
        setHouse(houseRes);
        setReviews(
          reviewsRes.filter((r) => String(r.houseId) === String(id)),
        );
      } catch {
        setError("Lỗi tải dữ liệu. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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
        style={{ padding: "60px 0", textAlign: "center", color: "var(--danger)" }}
      >
        {error}
      </div>
    );

  return (
    <div
      className="container"
      style={{ maxWidth: "800px", padding: "40px 24px" }}
    >
      <Link
        to={`/house/${id}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--text-muted)",
          marginBottom: "24px",
          fontSize: "0.9rem",
        }}
      >
        <LuArrowLeft size={18} /> Quay lại {house?.name}
      </Link>

      <h2 style={{ fontWeight: 800, marginBottom: "28px" }}>
        Tất cả đánh giá ({reviews.length})
      </h2>

      {/* Reuse ReviewSection component */}
      <ReviewSection houseId={id} reviews={reviews} setReviews={setReviews} />
    </div>
  );
};

export default HouseReviews;
