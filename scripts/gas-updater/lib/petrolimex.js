/**
 * Đọc danh sách thông cáo báo chí điều chỉnh giá của Petrolimex
 * và lấy ảnh bảng giá trong từng thông cáo.
 */
const { fetchText } = require("./http");

const BASE_URL = "https://www.petrolimex.com.vn";
const LIST_URL = `${BASE_URL}/ndi/thong-cao-bao-chi.html`;

// vd: /ndi/thong-cao-bao-chi/petrolimex-dieu-chinh-gia-xang-dau-tu-15-gio-00-phut-ngay-01-10-2026.html
const RELEASE_RE =
  /href="(\/ndi\/thong-cao-bao-chi\/petrolimex-dieu-chinh-gia-xang-dau-tu-(\d{1,2})-gio-(\d{1,2})-phut-ngay-(\d{1,2})-(\d{1,2})-(\d{4})\.html)"/g;
const PRICE_IMAGE_RE = /src="((?:https?:)?\/\/files\.petrolimex\.com\.vn\/jpgs\/[^"]+\.(?:jpe?g|png))"/i;

const pad = (n) => String(n).padStart(2, "0");

/** Danh sách kỳ điều chỉnh, mới nhất trước: [{ url, date: "01/10/2026", time: "15:00", ts }] */
async function listReleases() {
  const html = await fetchText(LIST_URL);
  const seen = new Map();
  for (const m of html.matchAll(RELEASE_RE)) {
    const [, path, hh, mm, d, mo, y] = m;
    if (seen.has(path)) continue;
    seen.set(path, {
      url: BASE_URL + path,
      date: `${pad(d)}/${pad(mo)}/${y}`,
      time: `${pad(hh)}:${pad(mm)}`,
      ts: Date.UTC(+y, +mo - 1, +d, +hh - 7, +mm),
    });
  }
  return [...seen.values()].sort((a, b) => b.ts - a.ts);
}

/** URL ảnh bảng giá: ảnh đầu tiên trong thân thông cáo, ngay sau câu "mức giá mới như sau" */
async function getPriceImageUrl(release) {
  const html = await fetchText(release.url);
  const anchor = html.indexOf("như sau");
  const m = PRICE_IMAGE_RE.exec(anchor >= 0 ? html.slice(anchor) : html);
  if (!m) throw new Error(`Không thấy ảnh bảng giá trong thông cáo ${release.url}`);
  return m[1].startsWith("//") ? `https:${m[1]}` : m[1];
}

module.exports = { listReleases, getPriceImageUrl, LIST_URL };
