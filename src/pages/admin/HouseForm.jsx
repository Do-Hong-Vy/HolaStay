import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addHouse, updateHouse } from "../../redux/houseSlice";
import { LuArrowLeft, LuSave } from "react-icons/lu";
import { houseService } from "../../services/houseService";
import HouseGeneralInput from "../../components/admin/HouseGeneralInput";
import HouseServicesInput from "../../components/admin/HouseServicesInput";
import HouseMediaInput from "../../components/admin/HouseMediaInput";

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

          <HouseGeneralInput
            form={form}
            handleChange={handleChange}
            errors={errors}
          />

          <HouseServicesInput
            serviceCosts={form.serviceCosts}
            handleServiceChange={handleServiceChange}
            handleAddService={handleAddService}
            handleRemoveService={handleRemoveService}
          />

          <HouseMediaInput
            form={form}
            errors={errors}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            handleAddImage={handleAddImage}
            handleRemoveImage={handleRemoveImage}
          />

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
