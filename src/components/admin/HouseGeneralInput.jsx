const HouseGeneralInput = ({ form, handleChange, errors }) => {
  return (
    <>
      <div className="form-group">
        <label>Tên nhà trọ</label>
        <input
          className={`input-modern ${errors.name ? "input-error" : ""}`}
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="VD: Nhà Trọ Hoa Mai"
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Tiền cọc (VNĐ)</label>
          <input
            className={`input-modern ${errors.price ? "input-error" : ""}`}
            name="price"
            type="number"
            min="0"
            value={form.price}
            onChange={handleChange}
            placeholder="500000"
          />
          {errors.price && (
            <span className="field-error">{errors.price}</span>
          )}
        </div>
        <div className="form-group">
          <label>Giá thuê / tháng (VNĐ)</label>
          <input
            className={`input-modern ${errors.currentPrice ? "input-error" : ""}`}
            name="currentPrice"
            type="number"
            min="0"
            value={form.currentPrice}
            onChange={handleChange}
            placeholder="1800000"
          />
          {errors.currentPrice && (
            <span className="field-error">{errors.currentPrice}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Khu vực</label>
          <select
            className="select-modern"
            name="area"
            value={form.area}
            onChange={handleChange}
          >
            <option>Hòa Lạc</option>
            <option>Tân Xã</option>
            <option>Thạch Hòa</option>
            <option>Bình Yên</option>
            <option>Phú Hữu</option>
          </select>
        </div>
        <div className="form-group">
          <label>Địa chỉ</label>
          <input
            className={`input-modern ${errors.address ? "input-error" : ""}`}
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Xóm 3, Tân Xã, Thạch Thất"
          />
          {errors.address && (
            <span className="field-error">{errors.address}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>Tiện ích</label>
        <input
          className="input-modern"
          name="amenities"
          value={form.amenities}
          onChange={handleChange}
          placeholder="Khép kín, Điều hòa, Nóng lạnh"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Số phòng còn lại</label>
          <input
            className="input-modern"
            name="availableRooms"
            type="number"
            min="0"
            value={form.availableRooms}
            onChange={handleChange}
            placeholder="VD: 5"
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại liên hệ</label>
          <input
            className="input-modern"
            name="contactPhone"
            value={form.contactPhone}
            onChange={handleChange}
            placeholder="VD: 0981234567"
          />
        </div>
      </div>
    </>
  );
};

export default HouseGeneralInput;
