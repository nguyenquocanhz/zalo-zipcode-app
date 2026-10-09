import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Box,
  Text,
  Button,
  Input,
  Select,
  Icon,
  Sheet,
} from "zmp-ui";
import { openWebview } from "zmp-sdk";
import {
  GAS_UPDATE_INFO,
  GAS_PRODUCTS,
  ZONE_DEFINITIONS,
  GAS_PRICE_HISTORY,
  VEHICLE_MODELS,
  GAS_STATIONS,
  calculateDistance,
  calculatePreciseDistance,
  formatMoney,
  formatLiter,
} from "../../utils/gas-data";
import {
  getInitialGasData,
  fetchLatestGasData,
} from "../../utils/gas-service";

const { Option } = Select;

function copyText(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => {});
  } else {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
}

export default function GasPriceTab() {
  const [gasData, setGasData] = useState(() => getInitialGasData());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState("");

  const [subTab, setSubTab] = useState("prices"); // 'prices' | 'calc' | 'history' | 'stations'
  const [zone, setZone] = useState("zone1"); // 'zone1' | 'zone2'
  const [categoryFilter, setCategoryFilter] = useState("all"); // 'all' | 'gasoline' | 'diesel'
  const [zoneSheetOpen, setZoneSheetOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  /* Hàm làm mới realtime dữ liệu */
  const refreshData = useCallback(async (manual = false) => {
    setIsRefreshing(true);
    if (manual) setRefreshMessage("Đang đồng bộ...");
    try {
      const res = await fetchLatestGasData();
      if (res) {
        setGasData(res);
        if (manual) {
          setRefreshMessage("✓ Đã cập nhật");
          setTimeout(() => setRefreshMessage(""), 2200);
        }
      }
    } catch (e) {
      if (manual) {
        setRefreshMessage("Offline");
        setTimeout(() => setRefreshMessage(""), 2200);
      }
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  /* Tự động làm mới realtime (Polling + Focus) */
  useEffect(() => {
    // 1. Kiểm tra làm mới ngầm khi vừa vào tab
    refreshData(false);

    // 2. Tự động kiểm tra chu kỳ mỗi 3 phút (180 giây)
    const intervalId = setInterval(() => {
      refreshData(false);
    }, 180000);

    // 3. Tự động làm mới khi người dùng mở lại Mini App (Window focus)
    const onFocus = () => {
      refreshData(false);
    };
    window.addEventListener("focus", onFocus);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("focus", onFocus);
    };
  }, [refreshData]);

  /* State Máy tính tiền xăng: Chế độ 1 (Theo dòng xe) */
  const [vehicleType, setVehicleType] = useState("motorbike"); // 'motorbike' | 'car'
  const [selectedVehicleId, setSelectedVehicleId] = useState("vision");
  const [calcFuelId, setCalcFuelId] = useState("ron95_3");
  const [currentLevel, setCurrentLevel] = useState(0.15); // 0 (cạn), 0.15 (đèn báo), 0.25 (1/4), 0.5 (nửa bình)

  /* State Máy tính: Chế độ 2 (Đổi tiền <-> Lít) */
  const [calcMode, setCalcMode] = useState("moneyToLiter"); // 'moneyToLiter' | 'literToMoney'
  const [inputMoney, setInputMoney] = useState("50000");
  const [inputLiter, setInputLiter] = useState("2.5");
  const [quickFuelId, setQuickFuelId] = useState("ron95_3");

  /* State Máy tính: Chế độ 3 (Hành trình chuyến đi) */
  const [tripDistance, setTripDistance] = useState("100");
  const [tripConsumption, setTripConsumption] = useState("2.0");
  const [tripFuelId, setTripFuelId] = useState("ron95_3");

  /* State Tra cứu Trạm Xăng & Định vị GPS */
  const [stationProvince, setStationProvince] = useState("all");
  const [stationSearch, setStationSearch] = useState("");
  const [stationFilterType, setStationFilterType] = useState("all"); // 'all' | 'qr' | '247'
  const [userLocation, setUserLocation] = useState(null); // { lat, lng, name }
  const [isLocating, setIsLocating] = useState(false);
  const [locateError, setLocateError] = useState("");

  /* Chế độ Cứu hộ hết xăng (Bán kính tăng dần 200m -> 500m -> 1km...) */
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [emergencyRadius, setEmergencyRadius] = useState("auto"); // 'auto' | '200' | '500' | '1000' | '2000' | '5000'
  const [emergencyNotice, setEmergencyNotice] = useState("");

  /* Định vị GPS khi người dùng bấm nút, để tính khoảng cách tới cây xăng */
  const handleLocateMe = useCallback(() => {
    setLocateError("");
    if (!navigator.geolocation) {
      setLocateError("Thiết bị không hỗ trợ định vị. Bạn vẫn có thể tìm cây xăng theo tên đường hoặc tỉnh.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          name: "Vị trí GPS của bạn",
        });
        setIsLocating(false);
      },
      (err) => {
        setLocateError(
          err.code === 1
            ? "Bạn chưa cho phép truy cập vị trí. Bạn vẫn có thể tìm cây xăng theo tên đường hoặc tỉnh."
            : "Không lấy được vị trí lúc này. Thử lại, hoặc tìm cây xăng theo tên đường hoặc tỉnh."
        );
        setIsEmergencyMode(false);
        setIsLocating(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  }, []);

  /* Mở chỉ đường trong webview của Zalo, không đưa người dùng ra khỏi Mini App */
  const openDirections = (st) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${st.lat},${st.lng}`;
    openWebview({ url, config: { style: "normal", leftButton: "back" } }).catch((err) => {
      console.warn("Không mở được chỉ đường:", err);
    });
  };

  const handleCopyPrice = (product, price) => {
    copyText(`${product.name}: ${formatMoney(price)} (${zone === "zone1" ? "Vùng 1" : "Vùng 2"})`);
    setCopiedId(product.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  /* Lọc danh sách sản phẩm xăng dầu từ gasData */
  const filteredProducts = useMemo(() => {
    const list = gasData.products || GAS_PRODUCTS;
    if (categoryFilter === "all") return list;
    return list.filter((p) => p.category === categoryFilter);
  }, [categoryFilter, gasData.products]);

  /* Dòng xe đang được chọn */
  const selectedVehicle = useMemo(() => {
    return VEHICLE_MODELS.find((v) => v.id === selectedVehicleId) || VEHICLE_MODELS[0];
  }, [selectedVehicleId]);

  /* Sản phẩm xăng dầu tính toán cho xe */
  const currentFuelForVehicle = useMemo(() => {
    const list = gasData.products || GAS_PRODUCTS;
    return list.find((p) => p.id === calcFuelId) || list[1];
  }, [calcFuelId, gasData.products]);

  /* Tính toán đổ đầy bình */
  const vehicleCalcResult = useMemo(() => {
    if (!selectedVehicle || !currentFuelForVehicle) return null;
    const pricePerLiter = zone === "zone1" ? currentFuelForVehicle.priceZone1 : currentFuelForVehicle.priceZone2;
    const capacity = selectedVehicle.tankCapacity;
    const remainingLiters = capacity * currentLevel;
    const neededLiters = capacity - remainingLiters;
    const totalCost = neededLiters * pricePerLiter;
    const estimatedDistance = (capacity / selectedVehicle.fuelConsumption) * 100;

    return {
      capacity,
      remainingLiters,
      neededLiters,
      pricePerLiter,
      totalCost,
      estimatedDistance,
    };
  }, [selectedVehicle, currentFuelForVehicle, zone, currentLevel]);

  /* Sản phẩm xăng dầu cho đổi nhanh tiền <-> lít */
  const quickFuel = useMemo(() => {
    const list = gasData.products || GAS_PRODUCTS;
    return list.find((p) => p.id === quickFuelId) || list[1];
  }, [quickFuelId, gasData.products]);

  /* Kết quả đổi tiền <-> lít */
  const quickCalcResult = useMemo(() => {
    const price = zone === "zone1" ? quickFuel.priceZone1 : quickFuel.priceZone2;
    if (calcMode === "moneyToLiter") {
      const money = parseFloat(inputMoney) || 0;
      const liters = price > 0 ? money / price : 0;
      return { liters, money, price };
    } else {
      const liters = parseFloat(inputLiter) || 0;
      const money = liters * price;
      return { liters, money, price };
    }
  }, [calcMode, inputMoney, inputLiter, quickFuel, zone]);

  /* Sản phẩm xăng dầu cho chuyến đi */
  const tripFuel = useMemo(() => {
    const list = gasData.products || GAS_PRODUCTS;
    return list.find((p) => p.id === tripFuelId) || list[1];
  }, [tripFuelId, gasData.products]);

  /* Kết quả chi phí chuyến đi */
  const tripResult = useMemo(() => {
    const dist = parseFloat(tripDistance) || 0;
    const cons = parseFloat(tripConsumption) || 0;
    const price = zone === "zone1" ? tripFuel.priceZone1 : tripFuel.priceZone2;
    const totalLiters = (dist * cons) / 100;
    const totalCost = totalLiters * price;
    return { dist, cons, totalLiters, totalCost, price };
  }, [tripDistance, tripConsumption, tripFuel, zone]);

  /* Lọc và sắp xếp danh sách trạm xăng theo cự ly GPS chuẩn trắc địa */
  const { stations: filteredStations, activeNotice: dynamicEmergencyNotice } = useMemo(() => {
    let list = GAS_STATIONS.map((st) => {
      let precise = null;
      if (userLocation && st.lat && st.lng) {
        precise = calculatePreciseDistance(userLocation.lat, userLocation.lng, st.lat, st.lng);
      }
      return { ...st, precise, distance: precise ? precise.km : null };
    });

    // Luôn sắp xếp theo cự ly mét tăng dần từ gần tới xa nếu đã có vị trí
    if (userLocation) {
      list.sort((a, b) => {
        if (!a.precise) return 1;
        if (!b.precise) return -1;
        return a.precise.meters - b.precise.meters;
      });
    }

    let activeNotice = "";

    // 🚨 NẾU ĐANG BẬT CHẾ ĐỘ CỨU HỘ HẾT XĂNG
    if (isEmergencyMode && userLocation) {
      if (emergencyRadius === "auto") {
        const closest = list[0];
        if (!closest || !closest.precise) {
          activeNotice = "Chưa xác định được tọa độ trạm xăng gần nhất.";
        } else if (closest.precise.meters <= 200) {
          list = list.filter((st) => st.precise && st.precise.meters <= 200);
          activeNotice = `🚨 Có ${list.length} trạm trong bán kính 200m! Gần nhất: ${closest.name} (${closest.precise.text} · dắt bộ ~${closest.precise.walkingMinutes} phút).`;
        } else if (closest.precise.meters <= 500) {
          list = list.filter((st) => st.precise && st.precise.meters <= 500);
          activeNotice = `⚡ Bán kính 200m không có trạm. Tự động mở rộng lên 500m: Trạm gần nhất cách ${closest.precise.text} (dắt bộ ~${closest.precise.walkingMinutes} phút).`;
        } else if (closest.precise.meters <= 1000) {
          list = list.filter((st) => st.precise && st.precise.meters <= 1000);
          activeNotice = `⚡ Bán kính 500m không có trạm. Tự động mở rộng lên 1 km: Trạm gần nhất cách ${closest.precise.text} (dắt bộ ~${closest.precise.walkingMinutes} phút).`;
        } else if (closest.precise.meters <= 2000) {
          list = list.filter((st) => st.precise && st.precise.meters <= 2000);
          activeNotice = `⚠️ Bán kính 1 km không có trạm. Tự động mở rộng lên 2 km: Trạm gần nhất cách ${closest.precise.text}. Khuyến nghị mua chai xăng hoặc gọi cứu hộ!`;
        } else {
          list = list.filter((st) => st.precise && st.precise.meters <= 5000);
          activeNotice = `⚠️ Đã mở rộng lên bán kính 5 km: Trạm gần nhất cách ${closest.precise.text}.`;
        }
      } else if (emergencyRadius !== "all") {
        const rVal = parseInt(emergencyRadius, 10);
        list = list.filter((st) => st.precise && st.precise.meters <= rVal);
        const closest = list[0];
        activeNotice = `Đang lọc trạm trong bán kính ≤ ${rVal < 1000 ? `${rVal}m` : `${rVal/1000}km`}${closest ? ` (Gần nhất: ${closest.precise.text})` : " (Không có trạm trong bán kính này)"}`;
      }
    } else {
      // Chế độ tra cứu thông thường
      list = list.filter((st) => {
        const matchProv = stationProvince === "all" || st.province === stationProvince;
        const q = stationSearch.trim().toLowerCase();
        const matchSearch =
          !q ||
          st.name.toLowerCase().includes(q) ||
          st.address.toLowerCase().includes(q) ||
          st.district.toLowerCase().includes(q) ||
          st.fuels.some((f) => f.toLowerCase().includes(q));

        let matchType = true;
        if (stationFilterType === "qr") matchType = !!st.hasQrPayment || !!st.hasBankTransfer;
        if (stationFilterType === "247") matchType = !!st.open247;

        return matchProv && matchSearch && matchType;
      });
    }

    return { stations: list, activeNotice };
  }, [stationProvince, stationSearch, stationFilterType, userLocation, isEmergencyMode, emergencyRadius]);

  return (
    <Box className="gas-tab-container">
      {/* ── Sub Navigation Tabs ── */}
      <Box className="gas-subtabs" px={4} pt={2} pb={3}>
        <button
          type="button"
          className={`gas-subtab-btn ${subTab === "prices" ? "active" : ""}`}
          onClick={() => setSubTab("prices")}
        >
          <Icon icon="zi-poll" size={16} style={{ marginRight: 4 }} />
          <span>Bảng Giá</span>
        </button>
        <button
          type="button"
          className={`gas-subtab-btn ${subTab === "calc" ? "active" : ""}`}
          onClick={() => setSubTab("calc")}
        >
          <Icon icon="zi-more-grid" size={16} style={{ marginRight: 4 }} />
          <span>Tính Tiền Xăng</span>
        </button>
        <button
          type="button"
          className={`gas-subtab-btn ${subTab === "history" ? "active" : ""}`}
          onClick={() => setSubTab("history")}
        >
          <Icon icon="zi-clock-1" size={16} style={{ marginRight: 4 }} />
          <span>Lịch Sử</span>
        </button>
        <button
          type="button"
          className={`gas-subtab-btn ${subTab === "stations" ? "active" : ""}`}
          onClick={() => setSubTab("stations")}
        >
          <Icon icon="zi-location" size={16} style={{ marginRight: 4 }} />
          <span>Cây Xăng</span>
        </button>
      </Box>

      {/* ═══════════════ SUB-TAB 1: BẢNG GIÁ XĂNG DẦU ═══════════════ */}
      {subTab === "prices" && (
        <Box px={4} pb={6}>
          {/* Banner thông tin kỳ điều hành Realtime */}
          <Box className="gas-info-banner" p={3} mb={3}>
            <Box flex alignItems="center" justifyContent="space-between">
              <Box flex alignItems="center" style={{ gap: 6 }}>
                <Icon icon="zi-calendar" size={16} className="text-blue" />
                <Text size="small" bold>
                  Kỳ {gasData.updateInfo.effectiveDate}
                </Text>
                <span className="badge-tag-live">
                  <span className="live-dot" /> Realtime
                </span>
              </Box>

              <button
                type="button"
                className={`refresh-btn ${isRefreshing ? "rotating" : ""}`}
                onClick={() => refreshData(true)}
                title="Làm mới bảng giá trực tuyến"
                disabled={isRefreshing}
              >
                <Icon icon="zi-reload" size={13} style={{ marginRight: 4 }} />
                <span>{refreshMessage || (isRefreshing ? "Đang tải..." : "Làm mới")}</span>
              </button>
            </Box>

            <Box flex alignItems="center" justifyContent="space-between" mt={1}>
              <Text size="xSmall" className="gas-banner-desc">
                Áp dụng {gasData.updateInfo.effectiveTime} · {gasData.updateInfo.announcedBy}
              </Text>
              <Text size="xxSmall" className="last-sync-time">
                Cập nhật: {gasData.lastUpdated}
              </Text>
            </Box>

            {gasData.backendSource && (
              <Box flex alignItems="center" justifyContent="space-between" mt={2} pt={2} style={{ borderTop: "1px dashed rgba(0, 104, 255, 0.2)" }}>
                <Box flex alignItems="center" style={{ gap: 4 }}>
                  <Icon icon="zi-cloud" size={13} className="text-blue" />
                  <Text size="xxSmall" className="text-muted">
                    Nguồn API: <strong>{gasData.backendSource}</strong>
                  </Text>
                </Box>
                {gasData.serverInfo?.status === "online" && !gasData.fromCache && (
                  <span className="live-badge">
                    ● Live
                  </span>
                )}
              </Box>
            )}
          </Box>

          {/* Vùng điều hành Switcher */}
          <Box className="zone-selector-card" p={3} mb={3}>
            <Box flex alignItems="center" justifyContent="space-between" mb={2}>
              <Text size="small" bold>
                Khu vực áp dụng:
              </Text>
              <button
                type="button"
                className="zone-info-link"
                onClick={() => setZoneSheetOpen(true)}
              >
                <Icon icon="zi-help-circle" size={14} style={{ marginRight: 3 }} />
                <span>Xem danh sách tỉnh Vùng 1 & 2</span>
              </button>
            </Box>

            <Box flex className="zone-btn-group">
              <button
                type="button"
                className={`zone-btn ${zone === "zone1" ? "active" : ""}`}
                onClick={() => setZone("zone1")}
              >
                <span className="zone-btn-title">Vùng 1 (Chuẩn)</span>
                <span className="zone-btn-sub">Hà Nội, TP.HCM, Cảng...</span>
              </button>
              <button
                type="button"
                className={`zone-btn ${zone === "zone2" ? "active" : ""}`}
                onClick={() => setZone("zone2")}
              >
                <span className="zone-btn-title">Vùng 2 (+tối đa 2%)</span>
                <span className="zone-btn-sub">Vùng xa, miền núi, đảo...</span>
              </button>
            </Box>
          </Box>

          {/* Lọc loại nhiên liệu */}
          <Box flex className="gas-filter-pills" mb={3}>
            <button
              type="button"
              className={`pill-btn ${categoryFilter === "all" ? "active" : ""}`}
              onClick={() => setCategoryFilter("all")}
            >
              Tất cả ({GAS_PRODUCTS.length})
            </button>
            <button
              type="button"
              className={`pill-btn ${categoryFilter === "gasoline" ? "active" : ""}`}
              onClick={() => setCategoryFilter("gasoline")}
            >
              Xăng (3)
            </button>
            <button
              type="button"
              className={`pill-btn ${categoryFilter === "diesel" ? "active" : ""}`}
              onClick={() => setCategoryFilter("diesel")}
            >
              Dầu Diesel (2)
            </button>
          </Box>

          {/* Danh sách thẻ giá xăng dầu */}
          <Box className="gas-cards-list">
            {filteredProducts.map((p) => {
              const currentPrice = zone === "zone1" ? p.priceZone1 : p.priceZone2;
              const isDecreased = p.diff < 0;
              const isIncreased = p.diff > 0;
              const isCopied = copiedId === p.id;

              return (
                <Box key={p.id} className="gas-product-card" p={3} mb={3}>
                  <Box flex alignItems="flex-start" justifyContent="space-between" mb={1}>
                    <Box style={{ flex: 1, paddingRight: 8 }}>
                      <Box flex alignItems="center" style={{ flexWrap: "wrap", gap: 4 }}>
                        <Text size="medium" bold className="product-title">
                          {p.name}
                        </Text>
                        <span className={`badge-pill badge-${p.badgeType}`}>{p.badge}</span>
                      </Box>
                      <Text size="xSmall" className="product-desc" mt={1}>
                        {p.desc}
                      </Text>
                    </Box>

                    <button
                      type="button"
                      className="gas-copy-btn"
                      onClick={() => handleCopyPrice(p, currentPrice)}
                      title="Sao chép giá"
                    >
                      <Icon icon={isCopied ? "zi-check" : "zi-copy"} size={14} />
                      <span>{isCopied ? "Đã chép" : "Chép"}</span>
                    </button>
                  </Box>

                  <Box flex alignItems="flex-end" justifyContent="space-between" mt={2} pt={2} className="price-row">
                    <Box>
                      <Text size="xSmall" className="price-unit-label">
                        Đơn giá niêm yết ({p.unit}):
                      </Text>
                      {p.isUnpriced || currentPrice === null || isNaN(currentPrice) ? (
                        <Text size="small" bold className="unpriced-text">
                          {p.priceStatusText || "Chưa có giá niêm yết (Đang thí điểm)"}
                        </Text>
                      ) : (
                        <Text size="xLarge" bold className="price-value-highlight">
                          {formatMoney(currentPrice)}
                        </Text>
                      )}
                    </Box>

                    {!(p.isUnpriced || p.diff === null || isNaN(p.diff)) && (
                      <Box flex flexDirection="column" alignItems="flex-end">
                        <span className={`diff-badge ${isDecreased ? "diff-down" : isIncreased ? "diff-up" : "diff-flat"}`}>
                          {isDecreased && "▼ "}
                          {isIncreased && "▲ "}
                          {Math.abs(p.diff).toLocaleString("vi-VN")} đ ({p.diffPercent > 0 ? `+${p.diffPercent}%` : `${p.diffPercent}%`})
                        </span>
                        <Text size="xxSmall" className="diff-label" mt={1}>
                          so với kỳ trước
                        </Text>
                      </Box>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {/* ═══════════════ SUB-TAB 2: MÁY TÍNH TIỀN XĂNG ═══════════════ */}
      {subTab === "calc" && (
        <Box px={4} pb={6}>
          <Box className="calc-mode-switch" mb={3}>
            <button
              type="button"
              className={`calc-mode-btn ${calcMode === "vehicle" ? "active" : ""}`}
              onClick={() => setCalcMode("vehicle")}
            >
              <Icon icon="zi-star" size={15} style={{ marginRight: 4 }} />
              <span>Đổ theo dòng xe</span>
            </button>
            <button
              type="button"
              className={`calc-mode-btn ${calcMode === "moneyToLiter" ? "active" : ""}`}
              onClick={() => setCalcMode("moneyToLiter")}
            >
              <Icon icon="zi-reorder" size={15} style={{ marginRight: 4 }} />
              <span>Đổi tiền ⇄ Lít</span>
            </button>
            <button
              type="button"
              className={`calc-mode-btn ${calcMode === "trip" ? "active" : ""}`}
              onClick={() => setCalcMode("trip")}
            >
              <Icon icon="zi-location-solid" size={15} style={{ marginRight: 4 }} />
              <span>Chuyến đi (km)</span>
            </button>
          </Box>

          {/* CHẾ ĐỘ 1: TÍNH THEO DÒNG XE */}
          {calcMode === "vehicle" && (
            <Box className="calc-card" p={4}>
              <Text size="medium" bold mb={2}>
                Ước tính chi phí đổ đầy bình theo xe
              </Text>
              <Text size="xSmall" className="calc-sub-desc" mb={3}>
                Tính theo thông số bình xăng tiêu chuẩn từ nhà sản xuất.
              </Text>

              {/* Loại xe */}
              <Box flex className="vehicle-type-switch" mb={3}>
                <button
                  type="button"
                  className={`v-type-btn ${vehicleType === "motorbike" ? "active" : ""}`}
                  onClick={() => {
                    setVehicleType("motorbike");
                    setSelectedVehicleId("vision");
                    setCalcFuelId("ron95_3");
                  }}
                >
                  Xe máy (11 mẫu xe)
                </button>
                <button
                  type="button"
                  className={`v-type-btn ${vehicleType === "car" ? "active" : ""}`}
                  onClick={() => {
                    setVehicleType("car");
                    setSelectedVehicleId("vios");
                    setCalcFuelId("ron95_3");
                  }}
                >
                  Ô tô (10 mẫu xe)
                </button>
              </Box>

              {/* Chọn mẫu xe */}
              <Box mb={3}>
                <label className="field-label">Chọn dòng xe:</label>
                <Select
                  value={selectedVehicleId}
                  onChange={(val) => {
                    setSelectedVehicleId(val);
                    const v = VEHICLE_MODELS.find((m) => m.id === val);
                    if (v && v.recommendedFuel) {
                      setCalcFuelId(v.recommendedFuel);
                    }
                  }}
                  className="gas-custom-select"
                >
                  {VEHICLE_MODELS.filter((v) => v.category === vehicleType).map((v) => (
                    <Option key={v.id} value={v.id} title={`${v.name} (${v.tankCapacity}L)`}>
                      {v.name} — Bình {v.tankCapacity} Lít
                    </Option>
                  ))}
                </Select>
              </Box>

              {/* Chọn loại xăng */}
              <Box mb={3}>
                <label className="field-label">Loại nhiên liệu muốn đổ:</label>
                <Select
                  value={calcFuelId}
                  onChange={(val) => setCalcFuelId(val)}
                  className="gas-custom-select"
                >
                  {GAS_PRODUCTS.filter((p) => p.category === "gasoline" || p.category === "diesel").map((p) => (
                    <Option key={p.id} value={p.id} title={p.name}>
                      {p.name} ({formatMoney(zone === "zone1" ? p.priceZone1 : p.priceZone2)}/L)
                    </Option>
                  ))}
                </Select>
              </Box>

              {/* Mức xăng hiện tại */}
              <Box mb={4}>
                <label className="field-label">Mức xăng hiện có trong bình:</label>
                <Box flex className="level-btn-group">
                  <button
                    type="button"
                    className={`level-btn ${currentLevel === 0 ? "active" : ""}`}
                    onClick={() => setCurrentLevel(0)}
                  >
                    Bình cạn (0%)
                  </button>
                  <button
                    type="button"
                    className={`level-btn ${currentLevel === 0.15 ? "active" : ""}`}
                    onClick={() => setCurrentLevel(0.15)}
                  >
                    Báo đèn (~15%)
                  </button>
                  <button
                    type="button"
                    className={`level-btn ${currentLevel === 0.25 ? "active" : ""}`}
                    onClick={() => setCurrentLevel(0.25)}
                  >
                    Còn 1/4 bình
                  </button>
                  <button
                    type="button"
                    className={`level-btn ${currentLevel === 0.5 ? "active" : ""}`}
                    onClick={() => setCurrentLevel(0.5)}
                  >
                    Còn 1/2 bình
                  </button>
                </Box>
              </Box>

              {/* Card kết quả tính toán */}
              {vehicleCalcResult && (
                <Box className="calc-result-box" p={3}>
                  <Box flex alignItems="center" justifyContent="space-between" mb={2}>
                    <Text size="small" bold>
                      Tổng tiền cần đổ đầy bình:
                    </Text>
                    <Text size="xLarge" bold className="result-money-highlight">
                      {formatMoney(vehicleCalcResult.totalCost)}
                    </Text>
                  </Box>
                  <Box className="result-divider" mb={2} />
                  <Box flex justifyContent="space-between" mb={1}>
                    <Text size="xSmall" className="result-label">
                      Lượng xăng cần bơm:
                    </Text>
                    <Text size="xSmall" bold>
                      {formatLiter(vehicleCalcResult.neededLiters)}
                    </Text>
                  </Box>
                  <Box flex justifyContent="space-between" mb={1}>
                    <Text size="xSmall" className="result-label">
                      Dung tích bình:
                    </Text>
                    <Text size="xSmall">
                      {vehicleCalcResult.capacity} Lít (Hiện còn ~{formatLiter(vehicleCalcResult.remainingLiters)})
                    </Text>
                  </Box>
                  <Box flex justifyContent="space-between">
                    <Text size="xSmall" className="result-label">
                      Ước tính chạy được:
                    </Text>
                    <Text size="xSmall" bold className="text-blue">
                      ~{Math.round(vehicleCalcResult.estimatedDistance)} km
                    </Text>
                  </Box>
                </Box>
              )}
            </Box>
          )}

          {/* CHẾ ĐỘ 2: ĐỔI TIỀN <-> LÍT */}
          {calcMode === "moneyToLiter" && (
            <Box className="calc-card" p={4}>
              <Text size="medium" bold mb={2}>
                Quy đổi nhanh Số tiền ⇄ Số lít xăng
              </Text>
              <Text size="xSmall" className="calc-sub-desc" mb={3}>
                Tính ngay bao nhiêu tiền mua được bao nhiêu lít xăng dầu.
              </Text>

              {/* Loại nhiên liệu */}
              <Box mb={3}>
                <label className="field-label">Chọn loại xăng dầu:</label>
                <Select
                  value={quickFuelId}
                  onChange={(val) => setQuickFuelId(val)}
                  className="gas-custom-select"
                >
                  {(gasData.products || GAS_PRODUCTS).map((p) => (
                    <Option key={p.id} value={p.id} title={p.name}>
                      {p.name} ({formatMoney(zone === "zone1" ? p.priceZone1 : p.priceZone2)}/{p.unit})
                    </Option>
                  ))}
                </Select>
              </Box>

              {/* Nhập số tiền */}
              <Box mb={3}>
                <label className="field-label">Nhập số tiền muốn đổ (VNĐ):</label>
                <Input
                  type="number"
                  value={inputMoney}
                  onChange={(e) => setInputMoney(e.target.value)}
                  placeholder="Ví dụ: 50000, 100000"
                  clearable
                />
                {/* Nút bấm nhanh số tiền */}
                <Box flex className="quick-amount-tags" mt={2}>
                  {["30000", "50000", "70000", "100000", "200000", "500000"].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      className="quick-amt-btn"
                      onClick={() => setInputMoney(amt)}
                    >
                      {Number(amt).toLocaleString("vi-VN")} đ
                    </button>
                  ))}
                </Box>
              </Box>

              {/* Kết quả quy đổi */}
              <Box className="calc-result-box" p={3}>
                <Box flex alignItems="center" justifyContent="space-between">
                  <Box>
                    <Text size="xSmall" className="result-label">
                      Số lít xăng bơm được:
                    </Text>
                    <Text size="xLarge" bold className="result-liter-highlight">
                      {formatLiter(quickCalcResult.liters)}
                    </Text>
                  </Box>
                  <Box flex flexDirection="column" alignItems="flex-end">
                    <Text size="xSmall" className="result-label">
                      Đơn giá ({zone === "zone1" ? "Vùng 1" : "Vùng 2"}):
                    </Text>
                    <Text size="small" bold>
                      {formatMoney(quickCalcResult.price)}/L
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {/* CHẾ ĐỘ 3: TÍNH CHI PHÍ THEO HÀNH TRÌNH (KM) */}
          {calcMode === "trip" && (
            <Box className="calc-card" p={4}>
              <Text size="medium" bold mb={2}>
                Tính tiền xăng cho hành trình di chuyển
              </Text>
              <Text size="xSmall" className="calc-sub-desc" mb={3}>
                Dự tính kinh phí nhiên liệu cho các chuyến công tác, du lịch, đi phượt.
              </Text>

              <Box mb={3}>
                <label className="field-label">Quãng đường dự kiến (km):</label>
                <Input
                  type="number"
                  value={tripDistance}
                  onChange={(e) => setTripDistance(e.target.value)}
                  placeholder="Ví dụ: 120"
                />
              </Box>

              <Box mb={3}>
                <label className="field-label">Mức tiêu thụ nhiên liệu (Lít / 100km):</label>
                <Input
                  type="number"
                  step="0.1"
                  value={tripConsumption}
                  onChange={(e) => setTripConsumption(e.target.value)}
                  placeholder="Xe máy ~1.8 - 2.2L; Ô tô ~6.0 - 8.0L"
                />
                <Text size="xxSmall" className="calc-note" mt={1}>
                  Gợi ý: Xe máy số ~1.6L; Xe tay ga ~2.1L; Ô tô 4 chỗ ~6.0L; Ô tô SUV 7 chỗ ~7.5L
                </Text>
              </Box>

              <Box mb={3}>
                <label className="field-label">Loại nhiên liệu sử dụng:</label>
                <Select
                  value={tripFuelId}
                  onChange={(val) => setTripFuelId(val)}
                  className="gas-custom-select"
                >
                  {(gasData.products || GAS_PRODUCTS).map((p) => (
                    <Option key={p.id} value={p.id} title={p.name}>
                      {p.name} ({formatMoney(zone === "zone1" ? p.priceZone1 : p.priceZone2)})
                    </Option>
                  ))}
                </Select>
              </Box>

              <Box className="calc-result-box" p={3}>
                <Box flex alignItems="center" justifyContent="space-between" mb={2}>
                  <Text size="small" bold>
                    Tổng chi phí xăng dự kiến:
                  </Text>
                  <Text size="xLarge" bold className="result-money-highlight">
                    {formatMoney(tripResult.totalCost)}
                  </Text>
                </Box>
                <Box className="result-divider" mb={2} />
                <Box flex justifyContent="space-between">
                  <Text size="xSmall" className="result-label">
                    Tổng lượng xăng tiêu hao:
                  </Text>
                  <Text size="xSmall" bold>
                    ~{formatLiter(tripResult.totalLiters)}
                  </Text>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* ═══════════════ SUB-TAB 3: LỊCH SỬ ĐIỀU HÀNH ═══════════════ */}
      {subTab === "history" && (
        <Box px={4} pb={6}>
          <Box className="history-header-card" p={3} mb={3}>
            <Text size="medium" bold mb={1}>
              Diễn biến giá xăng dầu qua các kỳ điều hành
            </Text>
            <Text size="xSmall" className="gas-sub-desc">
              Chu kỳ điều hành định kỳ thứ Năm hàng tuần theo Nghị định của Chính phủ.
            </Text>
          </Box>

          <Box className="history-table-card">
            {(gasData.history || GAS_PRICE_HISTORY).map((h, idx) => (
              <Box key={h.date} className="history-item-row" p={3}>
                <Box flex alignItems="center" justifyContent="space-between" mb={1}>
                  <Box flex alignItems="center">
                    <span className={`history-dot dot-${h.trend === "down" ? "down" : h.trend === "flat" ? "flat" : "up"}`} />
                    <Text size="small" bold>
                      Kỳ {h.date}
                    </Text>
                  </Box>
                  <span className={`history-tag tag-${h.trend === "down" ? "down" : h.trend === "flat" ? "flat" : "up"}`}>
                    {h.trend === "down" ? "Hạ nhiệt" : h.trend === "flat" ? "Giữ nguyên" : "Tăng giá"}
                  </span>
                </Box>

                <Box flex justifyContent="space-between" mt={2} className="history-prices">
                  <Box>
                    <Text size="xxSmall" className="history-lbl">RON 95-III</Text>
                    <Text size="xSmall" bold>{formatMoney(h.ron95)}</Text>
                  </Box>
                  <Box>
                    <Text size="xxSmall" className="history-lbl">E5 RON 92</Text>
                    <Text size="xSmall" bold>{formatMoney(h.e5)}</Text>
                  </Box>
                  <Box>
                    <Text size="xxSmall" className="history-lbl">Diesel DO 0.05S</Text>
                    <Text size="xSmall" bold>{formatMoney(h.diesel)}</Text>
                  </Box>
                </Box>

                <Text size="xxSmall" className="history-note" mt={1}>
                  {h.note}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* ═══════════════ SUB-TAB 4: TRA CỨU CÂY XĂNG ═══════════════ */}
      {subTab === "stations" && (
        <Box px={4} pb={6}>
          {/* Card Định vị GPS tìm cây xăng gần nhất */}
          <Box className="gps-locate-card" p={3} mb={3}>
            <Box flex alignItems="center" justifyContent="space-between" mb={1}>
              <Box flex alignItems="center" style={{ gap: 6 }}>
                <Icon icon="zi-location" size={18} className="text-blue" />
                <Text size="small" bold>
                  {userLocation ? userLocation.name : "Tìm cây xăng gần bạn nhất"}
                </Text>
              </Box>
              {userLocation && (
                <span className="distance-badge">
                  ✓ Đã định vị
                </span>
              )}
            </Box>
            <Text size="xxSmall" className="calc-sub-desc" mb={2}>
              {userLocation
                ? "Khoảng cách trắc địa WGS-84/IUGG chính xác đến từng mét và thời gian dắt bộ."
                : "Bật định vị GPS để tự động đo khoảng cách mét và tìm cây xăng dắt bộ gần nhất."}
            </Text>
            <Box flex style={{ gap: 8 }}>
              <button
                type="button"
                className="gps-btn"
                style={{ flex: 1 }}
                onClick={handleLocateMe}
                disabled={isLocating}
              >
                <Icon icon="zi-location" size={15} style={{ marginRight: 6 }} />
                <span>{isLocating ? "Đang dò tìm tọa độ GPS..." : userLocation ? "Cập nhật lại GPS" : "📍 Tìm cây xăng gần tôi (GPS)"}</span>
              </button>
            </Box>

            {locateError && (
              <Text size="xSmall" className="error-text" mt={2}>
                {locateError}
              </Text>
            )}
          </Box>

          {/* 🚨 NÚT KÍCH HOẠT CHẾ ĐỘ CỨU HỘ HẾT XĂNG */}
          <Box mb={3}>
            <button
              type="button"
              className={`emergency-toggle-btn ${isEmergencyMode ? "active" : ""}`}
              onClick={() => {
                if (!userLocation) handleLocateMe();
                setIsEmergencyMode(!isEmergencyMode);
                setEmergencyRadius("auto");
              }}
            >
              <Icon icon="zi-warning" size={16} style={{ marginRight: 6 }} />
              <span>{isEmergencyMode ? "🚨 Đang bật: Cứu hộ hết xăng (Bán kính tăng dần)" : "🚨 Chế độ khẩn cấp: Hết xăng dắt bộ (200m ➜ 500m...)"}</span>
            </button>
          </Box>

          {/* CARD THÔNG BÁO BÁN KÍNH TĂNG DẦN KHI Ở CHẾ ĐỘ CỨU HỘ */}
          {isEmergencyMode && (
            <Box className="emergency-alert-card" p={3} mb={3}>
              <Box flex alignItems="center" style={{ gap: 6 }} mb={1}>
                <Icon icon="zi-warning" size={16} className="text-error" />
                <Text size="small" bold className="text-error">
                  Chế độ khẩn cấp: Cứu hộ hết xăng
                </Text>
              </Box>
              <Text size="xSmall" className="text-error" style={{ lineHeight: 1.4 }} mb={2}>
                {dynamicEmergencyNotice || "Đang quét các trạm xăng trong các vòng bán kính mở rộng dần..."}
              </Text>

              {/* Bộ lọc bán kính tùy chỉnh */}
              <Box flex style={{ flexWrap: "wrap", gap: 5 }}>
                {[
                  { id: "auto", label: "Tự động (Tăng dần)" },
                  { id: "200", label: "≤ 200m (Dắt bộ)" },
                  { id: "500", label: "≤ 500m" },
                  { id: "1000", label: "≤ 1 km" },
                  { id: "2000", label: "≤ 2 km" },
                  { id: "5000", label: "≤ 5 km" },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className={`radius-pill ${emergencyRadius === r.id ? "active" : ""}`}
                    onClick={() => setEmergencyRadius(r.id)}
                  >
                    {r.label}
                  </button>
                ))}
              </Box>
            </Box>
          )}

          {/* Ô tìm kiếm trạm xăng */}
          <Box mb={2}>
            <Input.Search
              value={stationSearch}
              onChange={(e) => setStationSearch(e.target.value)}
              placeholder="Tìm theo đường, quận, Bình Tân..."
              clearable
            />
          </Box>

          {/* Bộ lọc tiện ích đặc thù: Chuyển khoản QR, Mở 24/7 */}
          {!isEmergencyMode && (
            <>
              <Box flex className="station-feature-pills" mb={2}>
                <button
                  type="button"
                  className={`feat-btn ${stationFilterType === "all" ? "active" : ""}`}
                  onClick={() => setStationFilterType("all")}
                >
                  Tất cả trạm
                </button>
                <button
                  type="button"
                  className={`feat-btn ${stationFilterType === "qr" ? "active" : ""}`}
                  onClick={() => setStationFilterType("qr")}
                >
                  💳 Chuyển khoản VietQR / ZaloPay
                </button>
                <button
                  type="button"
                  className={`feat-btn ${stationFilterType === "247" ? "active" : ""}`}
                  onClick={() => setStationFilterType("247")}
                >
                  ⏰ Mở 24/7
                </button>
              </Box>

              {/* Bộ lọc Tỉnh/Thành phố */}
              <Box flex className="station-prov-filter" mb={3}>
                {["all", "TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Hải Phòng"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`prov-btn ${stationProvince === p ? "active" : ""}`}
                    onClick={() => setStationProvince(p)}
                  >
                    {p === "all" ? "Toàn quốc" : p}
                  </button>
                ))}
              </Box>
            </>
          )}

          {/* Danh sách trạm xăng */}
          <Box className="stations-list">
            {filteredStations.length === 0 ? (
              <Box className="emergency-alert-card" p={4} style={{ textAlign: "center" }}>
                <Icon icon="zi-info" size={24} className="text-error" style={{ marginBottom: 8 }} />
                <Text size="small" bold className="text-error">
                  Không tìm thấy trạm xăng trong bán kính này.
                </Text>
                <Text size="xSmall" mt={1} className="text-error">
                  Hãy bấm mở rộng bán kính lên 1km hoặc 2km để tìm trạm gần nhất!
                </Text>
              </Box>
            ) : (
              filteredStations.map((st) => (
                <Box key={st.id} className="station-card" p={3} mb={3}>
                  <Box flex alignItems="flex-start" justifyContent="space-between" mb={1}>
                    <Box style={{ flex: 1, paddingRight: 8 }}>
                      <Box flex alignItems="center" style={{ gap: 6, flexWrap: "wrap" }}>
                        <span className={`station-brand-badge brand-${st.brand.toLowerCase()}`}>
                          {st.brand}
                        </span>
                        {st.precise ? (
                          <span
                            className={
                              st.precise.meters <= 300
                                ? "dist-badge-near"
                                : st.precise.meters <= 700
                                ? "dist-badge-mid"
                                : "dist-badge-far"
                            }
                          >
                            📍 Cách bạn {st.precise.text} · 🚶 Dắt bộ ~{st.precise.walkingMinutes}p
                          </span>
                        ) : st.distance !== null ? (
                          <span className="distance-badge">
                            📍 Cách bạn {st.distance} km
                          </span>
                        ) : null}
                      </Box>
                      <Text size="small" bold mt={1}>
                        {st.name}
                      </Text>
                      <Text size="xSmall" className="station-addr" mt={1}>
                        <Icon icon="zi-location" size={13} style={{ marginRight: 2 }} />
                        {st.address}
                      </Text>
                    </Box>

                    {st.open247 && (
                      <span className="station-247-tag">24/7</span>
                    )}
                  </Box>

                  {/* Badges tiện ích thanh toán */}
                  <Box flex alignItems="center" style={{ flexWrap: "wrap", gap: 4 }} mt={1} mb={2}>
                    {st.hasBankTransfer && (
                      <span className="payment-badge">✔ Chuyển khoản VietQR</span>
                    )}
                    {st.hasQrPayment && (
                      <span className="payment-badge">✔ Quét mã ZaloPay</span>
                    )}
                    {st.hasCardPos && (
                      <span className="payment-badge">✔ Cà thẻ POS</span>
                    )}
                  </Box>

                  {/* Danh sách loại xăng dầu phân phối */}
                  <Box flex alignItems="center" style={{ flexWrap: "wrap", gap: 4 }} mb={2}>
                    {st.fuels.map((f) => (
                      <span key={f} className="fuel-tag">
                        {f}
                      </span>
                    ))}
                  </Box>

                  {/* Footer card: Chép địa chỉ + Chỉ đường Google Maps */}
                  <Box flex alignItems="center" justifyContent="space-between" pt={2} className="station-footer">
                    <button
                      type="button"
                      className="station-copy-addr"
                      onClick={() => copyText(st.address)}
                      title="Chép địa chỉ"
                    >
                      <Icon icon="zi-copy" size={13} style={{ marginRight: 2 }} />
                      <span>Chép địa chỉ</span>
                    </button>

                    <button
                      type="button"
                      className="maps-btn"
                      onClick={() => openDirections(st)}
                    >
                      <Icon icon="zi-location" size={12} style={{ marginRight: 3 }} />
                      <span>Chỉ đường</span>
                    </button>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>
      )}

      {/* ── Sheet Tra cứu Danh sách Tỉnh Vùng 1 & 2 ── */}
      <Sheet
        visible={zoneSheetOpen}
        onClose={() => setZoneSheetOpen(false)}
        mask
        handler
        swipeToClose
        title="Danh sách Tỉnh/Thành phố Vùng 1 & Vùng 2"
      >
        <Box p={4} className="zone-sheet-content" style={{ maxHeight: "65vh", overflowY: "auto" }}>
          <Box mb={4}>
            <Text size="medium" bold className="text-blue" mb={1}>
              {ZONE_DEFINITIONS.zone1.name}
            </Text>
            <Text size="xSmall" className="zone-desc" mb={2}>
              {ZONE_DEFINITIONS.zone1.desc}
            </Text>
            <Box flex style={{ flexWrap: "wrap", gap: 4 }}>
              {ZONE_DEFINITIONS.zone1.provinces.map((prov) => (
                <span key={prov} className="zone-prov-tag">{prov}</span>
              ))}
            </Box>
          </Box>

          <Box className="result-divider" mb={3} />

          <Box mb={2}>
            <Text size="medium" bold className="text-warning" mb={1}>
              {ZONE_DEFINITIONS.zone2.name}
            </Text>
            <Text size="xSmall" className="zone-desc" mb={2}>
              {ZONE_DEFINITIONS.zone2.desc}
            </Text>
            <Box flex style={{ flexWrap: "wrap", gap: 4 }}>
              {ZONE_DEFINITIONS.zone2.provinces.map((prov) => (
                <span key={prov} className="zone-prov-tag zone2">{prov}</span>
              ))}
            </Box>
          </Box>
        </Box>
      </Sheet>
    </Box>
  );
}
