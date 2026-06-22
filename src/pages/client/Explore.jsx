import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchHouses } from "../../redux/houseSlice";
import {
  LuSlidersHorizontal,
  LuHouse as HomeIcon,
  LuWind,
  LuThermometer,
  LuWifi,
  LuCar,
  LuUtensils,
  LuSun,
  LuLayers,
  LuShirt,
  LuShield,
  LuDoorClosed,
  LuHeart,
} from "react-icons/lu";
import HouseCard from "../../components/HouseCard";

const areas = [
  "Tất cả",
  "Hòa Lạc",
  "Tân Xã",
  "Thạch Hòa",
  "Phú Hữu",
  "Bình Yên",
];
const allAmenities = [
  { name: "Khép kín", icon: LuDoorClosed },
  { name: "Điều hòa", icon: LuWind },
  { name: "Nóng lạnh", icon: LuThermometer },
  { name: "Wifi miễn phí", icon: LuWifi },
  { name: "Chỗ để xe", icon: LuCar },
  { name: "Nấu ăn", icon: LuUtensils },
  { name: "Ban công", icon: LuSun },
  { name: "Gác xép", icon: LuLayers },
  { name: "Máy giặt", icon: LuShirt },
  { name: "Bảo vệ 24/7", icon: LuShield },
  { name: "Giặt giũ", icon: LuShirt },
];

const Explore = () => {
  const dispatch = useDispatch();
  const { houses, favorites, loading, error } = useSelector(
    (state) => state.house,
  );
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [filterArea, setFilterArea] = useState("Tất cả");
  const [filterAmenities, setFilterAmenities] = useState([]);
  const [filterPrice, setFilterPrice] = useState("All");
  const [sortBy, setSortBy] = useState("priceAsc");
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    dispatch(fetchHouses());
  }, [dispatch]);

  const handleAmenityToggle = (amenity) => {
    setFilterAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const processedHouses = useMemo(() => {
    let result = [...houses];

    if (showFavorites) {
      result = result.filter((h) => favorites.includes(h.id));
    }
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(s) ||
          h.area.toLowerCase().includes(s) ||
          h.address.toLowerCase().includes(s),
      );
    }
    if (filterArea !== "Tất cả") {
      result = result.filter((h) => h.area === filterArea);
    }
    if (filterAmenities.length > 0) {
      result = result.filter((h) =>
        filterAmenities.every((a) => h.amenities.includes(a)),
      );
    }
    if (filterPrice !== "All") {
      result = result.filter((h) => {
        if (filterPrice === "Under2m") return h.currentPrice < 2000000;
        if (filterPrice === "2m-3m")
          return h.currentPrice >= 2000000 && h.currentPrice <= 3000000;
        if (filterPrice === "Over3m") return h.currentPrice > 3000000;
        return true;
      });
    }
    if (sortBy === "priceAsc")
      result.sort((a, b) => a.currentPrice - b.currentPrice);
    else if (sortBy === "priceDesc")
      result.sort((a, b) => b.currentPrice - a.currentPrice);

    return result;
  }, [
    houses,
    favorites,
    showFavorites,
    search,
    filterArea,
    filterAmenities,
    filterPrice,
    sortBy,
  ]);

  return (
    <div className="container">
      <div className="explore-header">
        <h2>Khám phá Nhà trọ</h2>
        <p>
          {search
            ? `Kết quả tìm kiếm cho: "${search}"`
            : "Tìm nơi ở lý tưởng cho hành trình đại học của bạn."}
        </p>
      </div>

      <div className="explore-layout">
        {/* Filter Sidebar */}
        <div className="filter-sidebar">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
            }}
          >
            <h3 style={{ margin: 0 }}>
              <LuSlidersHorizontal size={18} /> Bộ lọc
            </h3>
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "var(--accent)",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                padding: 0,
              }}
              onClick={() => {
                setFilterArea("Tất cả");
                setFilterAmenities([]);
                setFilterPrice("All");
                setSortBy("priceAsc");
                setShowFavorites(false);
              }}
            >
              Xóa tất cả
            </button>
          </div>

          <div className="filter-group">
            <label className="filter-title">Khác</label>
            <div className="filter-tags">
              <button
                type="button"
                className={`modern-badge ${showFavorites ? "active" : ""}`}
                onClick={() => setShowFavorites(!showFavorites)}
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <LuHeart
                  size={14}
                  color={showFavorites ? "#ef4444" : "currentColor"}
                  fill={showFavorites ? "#ef4444" : "none"}
                />
                Nhà trọ quan tâm
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-title">Khu vực</label>
            <div className="filter-tags">
              {areas.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`modern-badge ${filterArea === a ? "active" : ""}`}
                  onClick={() => setFilterArea(a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-title">Mức giá</label>
            <div className="filter-tags">
              {[
                { value: "All", label: "Tất cả" },
                { value: "Under2m", label: "< 2 triệu" },
                { value: "2m-3m", label: "2 - 3 triệu" },
                { value: "Over3m", label: "> 3 triệu" },
              ].map((p) => (
                <button
                  key={p.value}
                  type="button"
                  className={`modern-badge ${filterPrice === p.value ? "active" : ""}`}
                  onClick={() => setFilterPrice(p.value)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-title">Sắp xếp</label>
            <div className="filter-tags">
              <button
                type="button"
                className={`modern-badge ${sortBy === "priceAsc" ? "active" : ""}`}
                onClick={() => setSortBy("priceAsc")}
              >
                Giá tăng dần
              </button>
              <button
                type="button"
                className={`modern-badge ${sortBy === "priceDesc" ? "active" : ""}`}
                onClick={() => setSortBy("priceDesc")}
              >
                Giá giảm dần
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-title">Tiện ích</label>
            <div className="filter-tags">
              {allAmenities.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  type="button"
                  className={`modern-badge ${filterAmenities.includes(name) ? "active" : ""}`}
                  onClick={() => handleAmenityToggle(name)}
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <Icon size={14} />
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Houses Grid */}
        <div>
          {loading && (
            <div className="empty-state">
              <p>Đang tải dữ liệu...</p>
            </div>
          )}
          {error && (
            <div className="empty-state">
              <p style={{ color: "var(--danger)" }}>{error}</p>
            </div>
          )}
          {!loading && !error && processedHouses.length === 0 && (
            <div className="empty-state">
              <HomeIcon size={48} />
              <h3>Không tìm thấy nhà trọ phù hợp.</h3>
              <p>Hãy thử thay đổi bộ lọc nhé!</p>
            </div>
          )}
          <div className="houses-grid">
            {processedHouses.map((house) => (
              <HouseCard key={house.id} house={house} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
