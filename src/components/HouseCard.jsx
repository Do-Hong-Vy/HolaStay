import { Link } from "react-router-dom";
import { LuHeart, LuStar } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/houseSlice";
import { formatPrice } from "../utils/formatters";

const HouseCard = ({ house }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.house);

  const rating = !house.rating || house.rating === "0.0" ? "Mới" : house.rating;
  const isFavorite = favorites.includes(house.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(house.id));
  };

  return (
    <Link to={`/house/${house.id}`} className="modern-card house-card">
      <div className="house-card-image">
        <img src={house.image} alt={house.name} />

        {/* Available Rooms Badge (Top Left) */}
        <div
          className="house-card-rooms-pill"
          style={
            house.availableRooms === 0 || house.availableRooms === "0"
              ? { background: "var(--danger)" }
              : {}
          }
        >
          {house.availableRooms === undefined ||
          house.availableRooms === null ||
          house.availableRooms === ""
            ? "Đang cập nhật"
            : house.availableRooms === 0 || house.availableRooms === "0"
            ? "Hết phòng"
            : `Còn ${house.availableRooms} phòng`}
        </div>

        {/* Heart Icon (Top Right) */}
        <div className="house-card-heart" onClick={handleFavoriteClick}>
          <LuHeart
            size={18}
            color={isFavorite ? "#EF4444" : "#fff"}
            fill={isFavorite ? "#EF4444" : "rgba(0,0,0,0.3)"}
          />
        </div>
      </div>

      <div className="house-card-body">
        <div className="house-card-header">
          <h3 title={house.name}>{house.name}</h3>
          <div className="house-card-rating">
            <LuStar size={13} color="#f59e0b" fill="#f59e0b" />
            <span>{rating}</span>
          </div>
        </div>

        <p className="house-card-address">{house.address}</p>

        <p className="house-card-desc" title={house.description}>
          {house.description}
        </p>

        <div className="house-card-footer">
          <div className="house-card-amenities">
            {house.amenities?.slice(0, 2).map((a) => (
              <span key={a} className="modern-badge">
                {a}
              </span>
            ))}
            {house.amenities?.length > 2 && (
              <span className="modern-badge">
                +{house.amenities.length - 2}
              </span>
            )}
          </div>

          <div className="house-card-pricing">
            <div className="price-rent-wrapper">
              <span className="price-rent">
                {formatPrice(house.currentPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HouseCard;
