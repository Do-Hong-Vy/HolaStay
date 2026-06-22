import { LuTrash2, LuPlus } from "react-icons/lu";

const HouseMediaInput = ({
  form,
  errors,
  handleChange,
  handleImageChange,
  handleAddImage,
  handleRemoveImage,
}) => {
  return (
    <>
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
    </>
  );
};

export default HouseMediaInput;
