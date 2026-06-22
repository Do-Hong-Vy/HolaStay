import { LuMap, LuMapPin, LuBanknote, LuWallet, LuBed } from "react-icons/lu";
import { formatPrice } from "../utils/formatters";

const HouseGeneralInfo = ({ house }) => {
  return (
    <div className="detail-info-card">
      <h4>Thông tin chung</h4>
      <div className="info-row">
        <div className="info-icon icon-location">
          <LuMap size={20} />
        </div>
        <div>
          <p className="info-label">Khu vực</p>
          <p className="info-value">{house.area}</p>
        </div>
      </div>
      <div className="info-row">
        <div className="info-icon icon-location">
          <LuMapPin size={20} />
        </div>
        <div>
          <p className="info-label">Địa chỉ</p>
          <p className="info-value">{house.address}</p>
        </div>
      </div>
      <div className="info-row">
        <div className="info-icon icon-price">
          <LuBanknote size={20} />
        </div>
        <div>
          <p className="info-label">Giá thuê hàng tháng</p>
          <p
            className="info-value"
            style={{ color: "var(--text)", fontWeight: 800 }}
          >
            {formatPrice(house.currentPrice)}
          </p>
        </div>
      </div>
      <div className="info-row">
        <div className="info-icon icon-price">
          <LuWallet size={20} />
        </div>
        <div>
          <p className="info-label">Tiền cọc</p>
          <p className="info-value">{formatPrice(house.price, true)}</p>
        </div>
      </div>
      <div className="info-row">
        <div className="info-icon icon-generic">
          <LuBed size={20} />
        </div>
        <div>
          <p className="info-label">Phòng trống</p>
          <p className="info-value">
            {house.availableRooms
              ? `${house.availableRooms} phòng`
              : "Đang cập nhật"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HouseGeneralInfo;
