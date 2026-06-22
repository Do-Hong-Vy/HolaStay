import { LuTrash2, LuPlus } from "react-icons/lu";

const HouseServicesInput = ({
  serviceCosts,
  handleServiceChange,
  handleAddService,
  handleRemoveService,
}) => {
  return (
    <div className="form-group" style={{ gridColumn: "1 / -1" }}>
      <label>Chi phí dịch vụ</label>
      {serviceCosts.map((service, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "12px",
            alignItems: "center",
          }}
        >
          <input
            className="input-modern"
            placeholder="Tên dịch vụ (VD: Tiền điện)"
            value={service.name}
            onChange={(e) => handleServiceChange(index, "name", e.target.value)}
            style={{ flex: 1 }}
          />
          <input
            className="input-modern"
            type="number"
            min="0"
            placeholder="Giá tiền"
            value={service.fee}
            onChange={(e) => handleServiceChange(index, "fee", e.target.value)}
            style={{ width: "120px" }}
          />
          <input
            className="input-modern"
            placeholder="Đơn vị (VD: số)"
            value={service.unit}
            onChange={(e) => handleServiceChange(index, "unit", e.target.value)}
            style={{ width: "120px" }}
          />
          <button
            type="button"
            className="btn-danger"
            style={{ padding: "8px 12px" }}
            onClick={() => handleRemoveService(index)}
          >
            <LuTrash2 size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn-outline-modern"
        onClick={handleAddService}
        style={{ width: "fit-content", marginTop: "4px" }}
      >
        <LuPlus size={16} /> Thêm dịch vụ
      </button>
    </div>
  );
};

export default HouseServicesInput;
