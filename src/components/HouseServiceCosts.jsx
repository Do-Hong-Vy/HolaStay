import { LuZap, LuDroplet, LuWifi, LuShield } from "react-icons/lu";
import { renderServiceFee } from "../utils/formatters";

const HouseServiceCosts = ({ house }) => {
  const renderFeeWithFallback = (val, unit) => {
    if (val === undefined || val === null || val === "") {
      return <span style={{ color: "var(--danger)", fontStyle: "italic", fontSize: "0.85rem" }}>Chưa cập nhật</span>;
    }
    return renderServiceFee(val, unit);
  };

  return (
    <div className="detail-info-card">
      <h4>Chi phí dịch vụ (Dự kiến)</h4>
      <div className="info-row">
        <div className="info-icon icon-electric">
          <LuZap size={20} />
        </div>
        <div>
          <p className="info-label">Tiền điện</p>
          <p className="info-value">
            {renderFeeWithFallback(house.electricityFee, "số")}
          </p>
        </div>
      </div>
      <div className="info-row">
        <div className="info-icon icon-utility">
          <LuDroplet size={20} />
        </div>
        <div>
          <p className="info-label">Tiền nước</p>
          <p className="info-value">
            {renderFeeWithFallback(house.waterFee, "người")}
          </p>
        </div>
      </div>
      <div className="info-row">
        <div className="info-icon icon-utility">
          <LuWifi size={20} />
        </div>
        <div>
          <p className="info-label">Mạng Internet</p>
          <p className="info-value">
            {renderFeeWithFallback(house.internetFee, "phòng")}
          </p>
        </div>
      </div>
      <div className="info-row">
        <div className="info-icon icon-generic">
          <LuShield size={20} />
        </div>
        <div>
          <p className="info-label">Phí vệ sinh, an ninh</p>
          <p className="info-value">
            {renderFeeWithFallback(house.cleaningFee, "người")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HouseServiceCosts;
