/**
 * WrenApp API trên Cloudflare Workers (domain cấu hình trong wrangler.local.toml)
 *
 * Trả giá xăng dầu cho Mini App từ feed gas-price-latest.json trên GitHub (do GitHub Action
 * scripts/gas-updater cập nhật từ thông cáo Petrolimex). Feed được cache ở edge 5 phút.
 * Không tải được feed thì trả bản feed đóng gói lúc deploy, để app vẫn có dữ liệu.
 *
 *   GET  /api/gas/prices    giá hiện hành (cùng định dạng backend Go)
 *   GET  /api/gas/history   lịch sử các kỳ điều hành
 *   POST /api/gas/refresh   bỏ cache, tải lại feed ngay; cần header Authorization: Bearer <REFRESH_SECRET>
 *   GET  /health
 */
import bundledFeed from "../../gas-price-latest.json";

const DEFAULT_FEED_URLS = [
  "https://raw.githubusercontent.com/nguyenquocanhz/zalo-zipcode-app/main/gas-price-latest.json",
  "https://cdn.jsdelivr.net/gh/nguyenquocanhz/zalo-zipcode-app@main/gas-price-latest.json",
];
const CACHE_TTL_SECONDS = 300;
const CACHE_PATH = "/__cache/gas-feed";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, X-Zalo-MiniApp-Id",
  "Access-Control-Max-Age": "86400",
};

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=60", ...CORS_HEADERS, ...extra },
  });
}

/** Chặn feed hỏng: thiếu mặt hàng, giá ngoài khoảng, ngày sai định dạng */
function isValidFeed(feed) {
  if (!feed || !Array.isArray(feed.products) || feed.products.length < 5) return false;
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(feed.updateInfo?.effectiveDate || "")) return false;
  return feed.products.every(
    (p) => p.id && p.priceZone1 >= 10000 && p.priceZone1 <= 60000 && p.priceZone2 >= p.priceZone1 && p.priceZone2 <= 60000
  );
}

async function fetchRemoteFeed(urls) {
  for (const url of urls) {
    try {
      const res = await fetch(`${url}?_t=${Date.now()}`, {
        headers: { Accept: "application/json" },
        cf: { cacheTtl: 0 },
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) continue;
      const feed = await res.json();
      if (isValidFeed(feed)) return { feed, origin: url };
    } catch {
      // thử nguồn tiếp theo
    }
  }
  return null;
}

/** Feed từ cache edge; hết hạn thì tải lại; không tải được thì dùng bản đóng gói */
async function getFeed(request, env, ctx, { refresh = false } = {}) {
  const cache = caches.default;
  const CACHE_KEY = new URL(CACHE_PATH, request.url).toString();
  if (!refresh) {
    const hit = await cache.match(CACHE_KEY);
    if (hit) return { ...(await hit.json()), cache: "HIT" };
  }

  const urls = env.FEED_URLS ? env.FEED_URLS.split(",").map((s) => s.trim()).filter(Boolean) : DEFAULT_FEED_URLS;
  const remote = await fetchRemoteFeed(urls);
  if (remote) {
    const entry = { feed: remote.feed, origin: remote.origin, fetchedAt: new Date().toISOString() };
    const stored = new Response(JSON.stringify(entry), {
      headers: { "Content-Type": "application/json", "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}` },
    });
    ctx.waitUntil(cache.put(CACHE_KEY, stored));
    return { ...entry, cache: "MISS" };
  }
  return { feed: bundledFeed, origin: "bundled", fetchedAt: null, cache: "FALLBACK" };
}

/** So chuỗi không lộ thời gian, để không dò được khoá từng ký tự */
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Chỉ nhận refresh kèm khoá REFRESH_SECRET (Worker secret); chưa đặt khoá thì từ chối hết */
function isAuthorizedRefresh(request, env) {
  if (!env.REFRESH_SECRET) return false;
  const given = (request.headers.get("Authorization") || "").replace(/^Bearer /i, "");
  return safeEqual(given, env.REFRESH_SECRET);
}

function withServerInfo(feed, meta, request) {
  return {
    ...feed,
    serverInfo: {
      nodeId: "cloudflare-worker",
      domain: new URL(request.url).hostname,
      version: "1.0.0-worker",
      status: meta.origin === "bundled" ? "fallback" : "online",
      timestamp: new Date().toISOString(),
      feedOrigin: meta.origin,
      cache: meta.cache,
    },
  };
}

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_HEADERS });

    if (pathname === "/health" || pathname === "/api/health") {
      return json({ status: "ok", service: "wrenapp-worker", timestamp: new Date().toISOString() }, 200, { "Cache-Control": "no-store" });
    }

    if (pathname === "/api/gas/prices" && request.method === "GET") {
      const meta = await getFeed(request, env, ctx);
      return json(withServerInfo(meta.feed, meta, request), 200, { "X-Feed-Cache": meta.cache });
    }

    if (pathname === "/api/gas/history" && request.method === "GET") {
      const meta = await getFeed(request, env, ctx);
      const history = meta.feed.history || [];
      return json({ total: history.length, history });
    }

    if (pathname === "/api/gas/refresh" && request.method === "POST") {
      if (!isAuthorizedRefresh(request, env)) return json({ error: "Unauthorized" }, 401, { "Cache-Control": "no-store" });
      const meta = await getFeed(request, env, ctx, { refresh: true });
      return json(
        {
          success: meta.origin !== "bundled",
          message: meta.origin !== "bundled" ? "Đã tải lại feed giá xăng dầu" : "Không tải được feed, đang dùng bản đóng gói",
          data: withServerInfo(meta.feed, meta, request),
        },
        meta.origin !== "bundled" ? 200 : 502,
        { "Cache-Control": "no-store" }
      );
    }

    return json({ error: "Not found", path: pathname }, 404, { "Cache-Control": "no-store" });
  },
};
