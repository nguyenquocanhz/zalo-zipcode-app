import {
  GAS_UPDATE_INFO,
  GAS_PRODUCTS,
  GAS_PRICE_HISTORY,
} from "./gas-data";

const CACHE_KEY = "wren_gas_cache_v1";
const LAST_FETCH_KEY = "wren_gas_last_fetch_ts";

// RON 97 đã bỏ khỏi app; lọc thêm ở đây vì feed từ xa hoặc cache cũ có thể còn mặt hàng này
const dropRemoved = (products) => products.filter((p) => p.id !== "ron97");

// Danh sách endpoint ưu tiên: feed GitHub (raw, rồi jsDelivr) -> JSON đi kèm bản build.
// Chỉ dùng CDN công khai, không gọi domain API riêng. Feed do GitHub Action scripts/gas-updater cập nhật từ thông cáo Petrolimex.
const FEED_ENDPOINTS = [
  { url: "https://raw.githubusercontent.com/nguyenquocanhz/zalo-zipcode-app/main/gas-price-latest.json", label: "GitHub" },
  { url: "https://cdn.jsdelivr.net/gh/nguyenquocanhz/zalo-zipcode-app@main/gas-price-latest.json", label: "CDN jsDelivr" },
  { url: "./gas-price-latest.json", label: "Dữ liệu đóng gói" },
  { url: "/gas-price-latest.json", label: "Dữ liệu đóng gói" },
];

/**
 * Đọc dữ liệu từ bộ nhớ đệm Offline-First
 */
export function getInitialGasData() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.products && parsed.products.length > 0) {
        return {
          products: dropRemoved(parsed.products),
          updateInfo: parsed.updateInfo || GAS_UPDATE_INFO,
          history: parsed.history || GAS_PRICE_HISTORY,
          serverInfo: parsed.serverInfo || null,
          backendSource: localStorage.getItem("wren_gas_source") || "Dữ liệu đệm",
          isLive: true,
          fromCache: true,
          lastUpdated: localStorage.getItem(LAST_FETCH_KEY) || "Đã lưu offline",
        };
      }
    }
  } catch (e) {
    console.warn("[GasService] Cache read error:", e);
  }

  return {
    products: GAS_PRODUCTS,
    updateInfo: GAS_UPDATE_INFO,
    history: GAS_PRICE_HISTORY,
    serverInfo: null,
    backendSource: "Dữ liệu gốc",
    isLive: false,
    fromCache: false,
    lastUpdated: "Dữ liệu gốc",
  };
}

/**
 * Fetch dữ liệu mới nhất từ remote endpoints với timeout 4s
 */
export async function fetchLatestGasData() {
  let latestData = null;
  let sourceLabel = "Dữ liệu đệm";
  const nowStr = new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  for (const { url, label } of FEED_ENDPOINTS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      // Thêm cache buster timestamp để luôn lấy bản mới nhất
      const fetchUrl = url.includes("?")
        ? `${url}&_t=${Date.now()}`
        : `${url}?_t=${Date.now()}`;

      const res = await fetch(fetchUrl, {
        signal: controller.signal,
        // Chỉ gửi header đơn giản: header tuỳ biến sẽ kích hoạt CORS preflight mà CDN từ chối
        headers: { Accept: "application/json" },
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json && json.products && json.products.length > 0) {
          latestData = json;
          sourceLabel = label;
          break;
        }
      }
    } catch (err) {
      // Endpoint fallback tiếp theo
      continue;
    }
  }

  if (latestData) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(latestData));
      localStorage.setItem(LAST_FETCH_KEY, nowStr);
      localStorage.setItem("wren_gas_source", sourceLabel);
    } catch (e) {}

    return {
      success: true,
      products: dropRemoved(latestData.products),
      updateInfo: latestData.updateInfo || GAS_UPDATE_INFO,
      history: latestData.history || GAS_PRICE_HISTORY,
      serverInfo: latestData.serverInfo || null,
      backendSource: sourceLabel,
      lastUpdated: nowStr,
      isLive: true,
    };
  }

  // Nếu mạng yếu hoặc offline, trả về cache hoặc dữ liệu gốc an toàn
  const fallback = getInitialGasData();
  return {
    success: false,
    ...fallback,
    lastUpdated: fallback.lastUpdated || nowStr,
  };
}
