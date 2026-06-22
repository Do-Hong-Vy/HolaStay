import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addHouse, updateHouse } from "../../redux/houseSlice";
import { LuArrowLeft, LuTrash2, LuPlus, LuSave } from "react-icons/lu";
import { houseService } from "../../services/houseService";

const HouseForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    images: [""],
    price: "",
    currentPrice: "",
    area: "Tân Xã",
    address: "",
    amenities: "",
    serviceCosts: [
      { name: "Tiền điện", fee: "", unit: "số" },
      { name: "Tiền nước", fee: "", unit: "người" },
      { name: "Mạng Internet", fee: "", unit: "phòng" },
      { name: "Phí vệ sinh, an ninh", fee: "", unit: "người" },
    ],
    contactPhone: "",
    availableRooms: "",
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (isEdit) {
      houseService
        .getById(id)
        .then((h) => {
          setForm({
            name: h.name,
            description: h.description,
            images: h.images?.length ? h.images : h.image ? [h.image] : [""],
            price: h.price,
            currentPrice: h.currentPrice,
            area: h.area,
            address: h.address,
            amenities: h.amenities?.join(", ") || "",
            serviceCosts: h.serviceCosts || [],
            contactPhone: h.contactPhone || "",
            availableRooms: h.availableRooms || "",
          });
        })
        .catch(() => {
          alert("Không tìm thấy nhà trọ hoặc có lỗi xảy ra!");
          navigate("/admin");
        });
    }
  }, [id, isEdit, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Tên nhà trọ không được để trống.";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Tên nhà trọ phải có ít nhất 3 ký tự.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Mô tả không được để trống.";
    } else if (form.description.trim().length < 10) {
      newErrors.description = "Mô tả phải có ít nhất 10 ký tự.";
    }

    const validImages = form.images.filter((img) => img.trim() !== "");
    if (validImages.length === 0) {
      newErrors.images = "Vui lòng thêm ít nhất 1 link ảnh.";
    }

    if (!form.price || Number(form.price) <= 0) {
      newErrors.price = "Tiền cọc phải lớn hơn 0.";
    }

    if (!form.currentPrice || Number(form.currentPrice) <= 0) {
      newErrors.currentPrice = "Giá thuê phải lớn hơn 0.";
    }

    if (!form.address.trim()) {
      newErrors.address = "Địa chỉ không được để trống.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm({ ...form, images: newImages });
    if (errors.images) {
      setErrors({ ...errors, images: "" });
    }
  };

  const handleAddImage = () => {
    setForm({ ...form, images: [...form.images, ""] });
  };

  const handleRemoveImage = (index) => {
    const newImages = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: newImages.length > 0 ? newImages : [""] });
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...form.serviceCosts];
    newServices[index][field] = value;
    setForm({ ...form, serviceCosts: newServices });
  };

  const handleAddService = () => {
    setForm({
      ...form,
      serviceCosts: [...form.serviceCosts, { name: "", fee: "", unit: "" }],
    });
  };

  const handleRemoveService = (index) => {
    const newServices = form.serviceCosts.filter((_, i) => i !== index);
    setForm({ ...form, serviceCosts: newServices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const data = {
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      address: form.address.trim(),
      price: Number(form.price),
      currentPrice: Number(form.currentPrice),
      amenities: form.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      serviceCosts: form.serviceCosts
        .filter((s) => s.name.trim() !== "")
        .map((s) => ({
          name: s.name.trim(),
          fee: Number(s.fee) || 0,
          unit: s.unit.trim(),
        })),
      images: form.images.filter((img) => img.trim() !== ""),
      image: form.images.find((img) => img.trim() !== "") || "",
    };

    try {
      if (isEdit) {
        await dispatch(updateHouse({ id, data })).unwrap();
        navigate(`/house/${id}`);
      } else {
        await dispatch(addHouse(data)).unwrap();
        navigate("/admin");
      }
    } catch {
      setSubmitError("Đã có lỗi xảy ra khi lưu nhà trọ. Vui lòng thử lại!");
    }
  };

  return (
    <div className="house-form-page">
      <button
        onClick={() => navigate(isEdit ? `/house/${id}` : "/admin")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--text-muted)",
          marginBottom: "20px",
          fontSize: "0.9rem",
          fontFamily: "inherit",
        }}
      >
        <LuArrowLeft size={16} /> Quay lại
      </button>

      <h2>{isEdit ? "Chỉnh sửa nhà trọ" : "Thêm nhà trọ mới"}</h2>
      <p className="subtitle">
        {isEdit
          ? "Cập nhật thông tin nhà trọ."
          : "Điền thông tin để thêm nhà trọ vào hệ thống."}
      </p>

      <div className="house-form-card">
        <form onSubmit={handleSubmit} noValidate>
          {submitError && (
            <div
              style={{
                padding: "12px 16px",
                background: "rgba(239, 68, 68, 0.1)",
                color: "var(--danger)",
                borderRadius: "8px",
                marginBottom: "16px",
                fontWeight: 500,
              }}
            >
              {submitError}
            </div>
          )}

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
            <label>Link ảnh</label>
            {form.images.map((img, index) => (
              <div
                key={index}
                style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
              >
                <input
                  className={`input-modern ${errors.images ? "input-error" : ""}`}
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="/img/house1.jpg hoặc https://..."
                  style={{ flex: 1 }}
                />
                {form.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="btn-outline-modern"
                    style={{
                      padding: "0 12px",
                      color: "var(--danger)",
                      borderColor: "var(--danger)",
                    }}
                    title="Xóa ảnh này"
                  >
                    <LuTrash2 size={16} />
                  </button>
                )}
              </div>
            ))}
            {errors.images && (
              <div className="field-error" style={{ marginBottom: "8px" }}>
                {errors.images}
              </div>
            )}

            <button
              type="button"
              onClick={handleAddImage}
              className="btn-outline-modern"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.85rem",
                padding: "6px 12px",
                marginTop: "4px",
              }}
            >
              <LuPlus size={16} /> Thêm ảnh khác
            </button>
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

          <div className="form-group" style={{ gridColumn: "1 / -1" }}>
            <label>Chi phí dịch vụ</label>
            {form.serviceCosts.map((service, index) => (
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
                  onChange={(e) =>
                    handleServiceChange(index, "name", e.target.value)
                  }
                  style={{ flex: 1 }}
                />
                <input
                  className="input-modern"
                  type="number"
                  min="0"
                  placeholder="Giá tiền"
                  value={service.fee}
                  onChange={(e) =>
                    handleServiceChange(index, "fee", e.target.value)
                  }
                  style={{ width: "120px" }}
                />
                <input
                  className="input-modern"
                  placeholder="Đơn vị (VD: số)"
                  value={service.unit}
                  onChange={(e) =>
                    handleServiceChange(index, "unit", e.target.value)
                  }
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

          <div className="form-group">
            <label>Mô tả</label>
            <textarea
              className={`textarea-modern ${errors.description ? "input-error" : ""}`}
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="Mô tả chi tiết về nhà trọ..."
            />
            {errors.description && (
              <span className="field-error">{errors.description}</span>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary-modern">
              <LuSave size={16} /> {isEdit ? "Cập nhật" : "Thêm mới"}
            </button>
            <button
              type="button"
              className="btn-outline-modern"
              onClick={() => navigate(isEdit ? `/house/${id}` : "/admin")}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HouseForm;
