/**
 * WrenApp - Dịch vụ API Backend GoLang (Homelab: zaloapp.vietcode.io.vn)
 * 
 * Kiến trúc Resilience:
 * 1. Gọi trực tiếp tới Go Backend tại https://zaloapp.vietcode.io.vn/api
 * 2. Nếu đang chạy dev nội bộ: Thử qua http://localhost:8088/api
 * 3. Nếu mạng lỗi/mất kết nối: Tự động Fallback về local cache (gas-data.js) 
 *    để ứng dụng không bao giờ bị sập hay treo trắng màn hình, tuân thủ 100% kiểm duyệt Zalo.
 */

import {
  GAS_PRODUCTS,
  GAS_UPDATE_INFO,
  GAS_STATIONS,
  GAS_PRICE_HISTORY,
  calculatePreciseDistance,
} from "../utils/gas-data";

// Điểm cuối chính thức trên Homelab
export const PRODUCTION_API_BASE = "https://zaloapp.vietcode.io.vn/api";
export const DEV_API_BASE = "http://localhost:8088/api";

// Xác định API endpoint phù hợp
function getApiCandidates() {
  const isDev = typeof window !== "undefined" && 
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  if (isDev) {
    // Trong môi trường dev: Ưu tiên local 8088 trước, rồi tới production homelab
    return [DEV_API_BASE, PRODUCTION_API_BASE];
  }
  // Môi trường Mini App thực tế: Gọi production homelab
  return [PRODUCTION_API_BASE];
}

// Helper fetch có timeout an toàn
async function safeFetch(endpoint, options = {}, timeoutMs = 4000) {
  const candidates = getApiCandidates();
  let lastError = null;

  for (const base of candidates) {
    const url = `${base}${endpoint}`;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Accept": "application/json",
          "X-Zalo-MiniApp-Id": "2522725584854781271",
          ...(options.headers || {}),
        },
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        return {
          success: true,
          data: json,
          source: base.includes("localhost") ? "homelab_local" : "homelab_remote",
          apiBase: base,
        };
      }
    } catch (err) {
      lastError = err;
      // Tiếp tục thử candidate tiếp theo
    }
  }

  return {
    success: false,
    error: lastError ? lastError.message : "Network error",
    source: "offline_fallback",
  };
}

/**
 * Lấy bảng giá xăng dầu cập nhật mới nhất
 */
export async function fetchGasPrices() {
  const res = await safeFetch("/gas/prices");
  if (res.success && res.data && res.data.products) {
    return {
      products: res.data.products,
      updateInfo: res.data.updateInfo,
      updatedAt: res.data.updatedAt,
      serverInfo: res.data.serverInfo,
      source: res.source,
      isLiveBackend: true,
    };
  }

  // Fallback an toàn về dữ liệu local
  return {
    products: GAS_PRODUCTS,
    updateInfo: GAS_UPDATE_INFO,
    updatedAt: new Date().toISOString(),
    serverInfo: {
      nodeId: "local-fallback",
      domain: "offline",
      version: "1.0.0",
      status: "fallback",
    },
    source: "offline_fallback",
    isLiveBackend: false,
  };
}

/**
 * Kích hoạt cào mới giá xăng trên backend
 */
export async function triggerGasRefresh() {
  const res = await safeFetch("/gas/refresh", { method: "POST" });
  if (res.success && res.data && res.data.data) {
    return {
      products: res.data.data.products,
      updateInfo: res.data.data.updateInfo,
      updatedAt: res.data.data.updatedAt,
      serverInfo: res.data.data.serverInfo,
      source: res.source,
      isLiveBackend: true,
    };
  }

  // Nếu server homelab tạm bận, fallback
  return fetchGasPrices();
}

/**
 * Tìm kiếm cây xăng theo tọa độ GPS và bán kính
 */
export async function fetchGasStations({
  lat = 0,
  lng = 0,
  radius = 5000,
  brand = "",
  emergency = false,
} = {}) {
  const params = new URLSearchParams();
  if (lat) params.append("lat", lat.toString());
  if (lng) params.append("lng", lng.toString());
  if (radius) params.append("radius", radius.toString());
  if (brand) params.append("brand", brand);
  if (emergency) params.append("emergency", "true");

  const res = await safeFetch(`/gas/stations?${params.toString()}`);
  if (res.success && res.data && Array.isArray(res.data.stations)) {
    return {
      ...res.data,
      source: res.source,
      isLiveBackend: true,
    };
  }

  // Fallback tính toán nội bộ (WGS-84/IUGG theo viet-thanh.vn)
  let stations = GAS_STATIONS.map((st) => {
    const item = { ...st };
    if (lat && lng) {
      const dist = calculatePreciseDistance(lat, lng, st.lat, st.lng);
      item.meters = dist.meters;
      item.km = dist.km;
      item.distanceText = dist.text;
      item.walkingMinutes = dist.walkingMinutes;
      item.badgeType = dist.badgeType;
    }
    return item;
  });

  if (brand) {
    stations = stations.filter((s) => s.brand.toLowerCase() === brand.toLowerCase());
  }
  if (lat && lng) {
    stations.sort((a, b) => (a.meters || 0) - (b.meters || 0));
  }

  return {
    total: stations.length,
    radiusMeters: radius,
    userLat: lat,
    userLng: lng,
    isEmergency: emergency,
    emergencyLevel: emergency ? "Chế độ khẩn cấp ngoại tuyến" : "",
    stations,
    source: "offline_fallback",
    isLiveBackend: false,
  };
}

/**
 * Lấy lịch sử biến động giá
 */
export async function fetchGasHistory() {
  const res = await safeFetch("/gas/history");
  if (res.success && res.data && Array.isArray(res.data.history)) {
    return {
      history: res.data.history,
      source: res.source,
      isLiveBackend: true,
    };
  }

  return {
    history: GAS_PRICE_HISTORY,
    source: "offline_fallback",
    isLiveBackend: false,
  };
}

/**
 * Kiểm tra kết nối tới Go Backend
 */
export async function checkBackendStatus() {
  const res = await safeFetch("/health");
  return {
    online: res.success,
    data: res.data || null,
    source: res.source,
  };
}
