import {
  GAS_UPDATE_INFO,
  GAS_PRODUCTS,
  GAS_PRICE_HISTORY,
} from "./gas-data";

const CACHE_KEY = "wren_gas_cache_v1";
const LAST_FETCH_KEY = "wren_gas_last_fetch_ts";

// RON 97 đã bỏ khỏi app; lọc thêm ở đây vì feed từ xa hoặc cache cũ có thể còn mặt hàng này
const dropRemoved = (products) => products.filter((p) => p.id !== "ron97");

// Danh sách endpoint ưu tiên: Cloudflare Worker (cloudflare/zaloapp-worker) -> Go Backend local dev -> feed GitHub (jsDelivr, raw) -> JSON đi kèm bản build.
// Feed GitHub do GitHub Action scripts/gas-updater cập nhật từ thông cáo Petrolimex.
const FEED_ENDPOINTS = [
  { url: "https://zaloapp.vietcode.io.vn/api/gas/prices", label: "Cloudflare (zaloapp.vietcode.io.vn)" },
  // Chỉ thử backend local khi chạy dev, không gọi localhost trên máy người dùng
  ...(typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname)
    ? [{ url: "http://localhost:8088/api/gas/prices", label: "Go Backend (Homelab :8088)" }]
    : []),
  { url: "https://cdn.jsdelivr.net/gh/nguyenquocanhz/zalo-zipcode-app@main/gas-price-latest.json", label: "CDN jsDelivr" },
  { url: "https://raw.githubusercontent.com/nguyenquocanhz/zalo-zipcode-app/main/gas-price-latest.json", label: "GitHub" },
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
        headers: {
          Accept: "application/json",
          "X-Zalo-MiniApp-Id": "2522725584854781271",
        },
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
