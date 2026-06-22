export const formatPrice = (price, isDeposit = false) => {
  if (!price) return isDeposit ? "Không yêu cầu" : "Đang cập nhật";
  const suffix = isDeposit ? "" : "/tháng";
  if (price >= 1000000) return `${(price / 1000000).toFixed(1)} triệu${suffix}`;
  return `${(price / 1000).toFixed(0)}k${suffix}`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
};

export const renderServiceFee = (value, unit) => {
  if (!value && value !== 0 && value !== "0") return "Chưa cập nhật";
  const strVal = String(value).trim();
  if (/[a-zA-Z/]/.test(strVal)) return strVal;
  const num = Number(strVal);
  if (num === 0) return "Miễn phí";
  return `${formatPrice(num, true)} / ${unit}`;
};
