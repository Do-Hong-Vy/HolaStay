import { useState } from "react";
import { LuStar, LuSend } from "react-icons/lu";
import { reviewService } from "../services/reviewService";
import { formatDate } from "../utils/formatters";

const ReviewSection = ({ houseId, reviews, setReviews }) => {
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!newComment.trim() || !newName.trim()) {
      setErrorMsg("Vui lòng nhập tên và nội dung đánh giá.");
      return;
    }
    const review = {
      houseId,
      studentName: newName.trim(),
      rating: newRating,
      comment: newComment.trim(),
      date: new Date().toISOString().split("T")[0],
    };
    try {
      const res = await reviewService.create(review);
      setReviews([res, ...reviews]);
      setNewComment("");
      setNewName("");
      setNewRating(5);
      alert("Cảm ơn bạn đã gửi đánh giá!");
    } catch {
      alert("Lỗi khi gửi đánh giá. Vui lòng kiểm tra lại kết nối!");
    }
  };

  return (
    <div className="detail-info-card" style={{ marginTop: "32px" }}>
      <h4>Đánh giá từ sinh viên</h4>

      <div style={{ marginBottom: "24px" }}>
        {reviews.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>
            Chưa có đánh giá nào cho nhà trọ này.
          </p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-avatar">
                {review.studentName?.charAt(0)}
              </div>
              <div className="review-content">
                <div className="review-header">
                  <span className="name">{review.studentName}</span>
                  <span className="date">{formatDate(review.date)}</span>
                </div>
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <LuStar
                      key={i}
                      size={13}
                      color="#F59E0B"
                      fill={i < review.rating ? "#F59E0B" : "none"}
                    />
                  ))}
                </div>
                <div className="bubble-review">{review.comment}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
        <h5 style={{ marginBottom: "16px", color: "var(--text)" }}>Viết đánh giá của bạn</h5>
        <form onSubmit={handleSubmitReview} className="review-form">
          <div style={{ marginBottom: "16px" }}>
            <p style={{ marginBottom: "8px", fontWeight: 600 }}>Chấm điểm:</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <LuStar
                key={star}
                size={24}
                style={{ cursor: "pointer", marginRight: "4px" }}
                color={star <= (hoverRating || newRating) ? "#F59E0B" : "#DDD"}
                fill={star <= (hoverRating || newRating) ? "#F59E0B" : "none"}
                onClick={() => setNewRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
          </div>
          
          {errorMsg && (
            <div style={{ color: "var(--danger)", fontSize: "0.85rem", fontWeight: 500, marginBottom: "12px" }}>
              {errorMsg}
            </div>
          )}

          <input
            className="input-modern"
            placeholder="Tên của bạn..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{ marginBottom: "12px" }}
          />
          <textarea
            className="textarea-modern"
            rows={3}
            placeholder="Chia sẻ trải nghiệm ở trọ của bạn..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="btn-primary-modern"
            style={{ width: "100%", marginTop: "14px" }}
          >
            <LuSend size={16} /> Gửi đánh giá
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewSection;
