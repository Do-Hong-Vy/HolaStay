import { LuZap, LuDroplet, LuWifi, LuShield, LuCar, LuShirt, LuCheckCircle } from "react-icons/lu";
import { renderServiceFee } from "../utils/formatters";

const HouseServiceCosts = ({ house }) => {
  const renderFeeWithFallback = (val, unit) => {
    if (val === undefined || val === null || val === "") {
      return <span style={{ color: "var(--danger)", fontStyle: "italic", fontSize: "0.85rem" }}>Chưa cập nhật</span>;
    }
    return renderServiceFee(val, unit);
  };

  const getIconAndClass = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("điện")) return { Icon: LuZap, className: "icon-electric" };
    if (lowerName.includes("nước")) return { Icon: LuDroplet, className: "icon-utility" };
    if (lowerName.includes("mạng") || lowerName.includes("internet") || lowerName.includes("wifi")) return { Icon: LuWifi, className: "icon-utility" };
    if (lowerName.includes("vệ sinh") || lowerName.includes("an ninh") || lowerName.includes("rác")) return { Icon: LuShield, className: "icon-generic" };
    if (lowerName.includes("xe")) return { Icon: LuCar, className: "icon-generic" };
    if (lowerName.includes("giặt")) return { Icon: LuShirt, className: "icon-utility" };
    return { Icon: LuCheckCircle, className: "icon-generic" };
  };

  return (
    <div className="detail-info-card">
      <h4>Chi phí dịch vụ (Dự kiến)</h4>
      {house.serviceCosts && house.serviceCosts.length > 0 ? (
        house.serviceCosts.map((service, idx) => {
          const { Icon, className } = getIconAndClass(service.name);
          return (
            <div className="info-row" key={idx}>
              <div className={`info-icon ${className}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="info-label">{service.name.toUpperCase()}</p>
                <p className="info-value">
                  {renderFeeWithFallback(service.fee, service.unit)}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "12px" }}>
          Chưa có thông tin dịch vụ
        </p>
      )}
    </div>
  );
};

export default HouseServiceCosts;
