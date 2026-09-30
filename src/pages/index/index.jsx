import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  Page, Box, Text, Input, Button, Select, List, Spinner, Icon, Sheet, useTheme,
} from "zmp-ui";
import {
  VN_PROVINCES,
  searchVnByName,
  searchVnByCode,
  convertPostalCode,
  stripDiacritics,
} from "../../utils/vn-zipcodes";
import { COUNTRIES } from "../../utils/countries";

const { Option } = Select;

/* ─── Utility: sao chép vào bộ nhớ tạm ─── */
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

/* ─── Chip badge với Zalo Icon ─── */
function CopyChip({ label, value, color }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e) => {
    e.stopPropagation();
    copyText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      className={`copy-chip ${color || ""}`}
      onClick={handleCopy}
      title={`Sao chép: ${value}`}
      type="button"
    >
      <Icon icon={copied ? "zi-check" : "zi-copy"} size={13} style={{ marginRight: 3 }} />
      <span>{copied ? "Đã chép" : (label ? `${label}: ${value}` : value)}</span>
    </button>
  );
}

/* ─── VN Tab ─── */
function VnTab() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(VN_PROVINCES);
  const [selected, setSelected] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetFilter, setSheetFilter] = useState("");
  const [expandedDistricts, setExpandedDistricts] = useState({});

  /* Converter state */
  const [convertInput, setConvertInput] = useState("");
  const [convertResult, setConvertResult] = useState(null);

  const handleSearch = (value) => {
    setQuery(value);
    if (!value.trim()) {
      setResults(VN_PROVINCES);
      return;
    }
    const isNumeric = /^[0-9]+$/.test(value.trim());
    setResults(isNumeric ? searchVnByCode(value) : searchVnByName(value));
  };

  const handleConvert = useCallback(() => {
    if (!convertInput.trim()) return;
    const res = convertPostalCode(convertInput.trim());
    setConvertResult(res);
  }, [convertInput]);

  const openDistricts = (province) => {
    setSelected(province);
    if (query.trim()) {
      setSheetFilter(query.trim());
    } else {
      setSheetFilter("");
    }
    setExpandedDistricts({});
    setSheetOpen(true);
  };

  const toggleExpandDistrict = (dName) => {
    setExpandedDistricts((prev) => ({
      ...prev,
      [dName]: !prev[dName],
    }));
  };

  /* Lọc quận huyện / phường xã trong Sheet */
  const filteredDistricts = useMemo(() => {
    if (!selected || !selected.districts) return [];
    if (!sheetFilter.trim()) return selected.districts;
    const q = stripDiacritics(sheetFilter.trim());
    return selected.districts.filter((d) => {
      const matchDName = stripDiacritics(d.name).includes(q);
      const matchDCode5 = d.code5 && d.code5.includes(sheetFilter.trim());
      const matchDCode6 = d.code6 && d.code6.includes(sheetFilter.trim());
      const matchWards = (d.wards || []).some(
        (w) =>
          stripDiacritics(w.name).includes(q) ||
          (w.code5 && w.code5.includes(sheetFilter.trim())) ||
          (w.code6 && w.code6.includes(sheetFilter.trim()))
      );
      return matchDName || matchDCode5 || matchDCode6 || matchWards;
    });
  }, [selected, sheetFilter]);

  return (
    <Box p={4}>
      <Input.Search
        placeholder="Tên tỉnh, quận, huyện, phường hoặc mã ZIP..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <Box mt={3}>
        {results.length === 0 && (
          <Text className="empty-text">Không tìm thấy tỉnh/thành hoặc phường/quận phù hợp.</Text>
        )}
        <List>
          {results.map((p) => {
            const hasWardMatch =
              query.trim() &&
              (p.districts || []).some((d) =>
                (d.wards || []).some((w) =>
                  stripDiacritics(w.name).includes(stripDiacritics(query))
                )
              );

            return (
              <List.Item
                key={p.id}
                className="province-item"
                onClick={() => openDistricts(p)}
                title={p.name}
                subTitle={
                  hasWardMatch
                    ? `Khớp phường/xã trong ${p.name}`
                    : `${p.note || ""} · ${(p.districts || []).length} quận/huyện`
                }
                prefix={<Icon icon="zi-location" />}
                suffix={
                  <Box className="badge-col">
                    <Text.Title size="small" className="code-badge">{p.code5}</Text.Title>
                    <Text size="xSmall" className="code-badge6">{p.code6}</Text>
                  </Box>
                }
              />
            );
          })}
        </List>
      </Box>

      {/* Converter widget */}
      <Box className="converter-box" mt={4}>
        <Box flex alignItems="center" className="converter-header">
          <Icon icon="zi-retry" size={16} style={{ color: "#0068ff", marginRight: 6 }} />
          <Text.Title size="small" className="field-label" style={{ margin: 0 }}>
            Quy đổi mã 5 số - 6 số
          </Text.Title>
        </Box>
        <Box className="converter-row">
          <Input
            className="converter-input"
            placeholder="Nhập mã 5 hoặc 6 số (tỉnh, huyện, xã)"
            value={convertInput}
            onChange={(e) => setConvertInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleConvert()}
          />
          <Button size="small" className="converter-btn" onClick={handleConvert}>
            <Box flex alignItems="center">
              <Icon icon="zi-retry" size={13} style={{ marginRight: 3 }} />
              <span>Đổi</span>
            </Box>
          </Button>
        </Box>
        {convertResult && (
          <Box className="converter-result">
            <Text size="xSmall" className="converter-label">{convertResult.message}</Text>
            <Box className="chip-row">
              <CopyChip label="Mã 5 số" value={convertResult.targetCode5} color="chip-blue" />
              <CopyChip label="Mã 6 số" value={convertResult.targetCode6} color="chip-gray" />
            </Box>
          </Box>
        )}
        {convertInput && convertResult === null && (
          <Box flex alignItems="center" mt={2}>
            <Icon icon="zi-warning-circle" size={14} style={{ color: "#e0433f", marginRight: 4 }} />
            <Text className="error-text" size="xSmall">Mã không hợp lệ hoặc chưa tra được.</Text>
          </Box>
        )}
      </Box>

      <Text className="hint-text" size="xSmall">
        Mã 5 số theo Quyết định 2474/QĐ-BTTTT. Mã 6 số dùng cho PayPal, Apple ID, Amazon, Google.
        Nhấn vào tỉnh để xem chi tiết quận/huyện &amp; phường/xã.
      </Text>

      {/* Districts & Wards Sheet */}
      <Sheet
        className="district-sheet"
        visible={sheetOpen}
        onClose={() => {
          setSheetOpen(false);
          setSheetFilter("");
        }}
        title={selected ? `${selected.name} - Chi tiết đơn vị` : ""}
        height="85vh"
        swipeToClose={false}
      >
        {selected && (
          <div className="sheet-main-wrapper">
            {/* Sticky Header */}
            <div className="sheet-sticky-top">
              <Box className="chip-row" mb={2}>
                <CopyChip label="5 số tỉnh" value={selected.code5} color="chip-blue" />
                <CopyChip label="6 số tỉnh" value={selected.code6} color="chip-gray" />
                <span className="sheet-count-tag">
                  {filteredDistricts.length} quận/huyện
                </span>
              </Box>

              {selected.centerPostOffice && (
                <Box flex alignItems="flex-start" mb={2}>
                  <Icon
                    icon="zi-location-solid"
                    size={14}
                    style={{ color: "#0068ff", marginRight: 4, marginTop: 2, flexShrink: 0 }}
                  />
                  <Text size="xSmall" className="po-text">{selected.centerPostOffice}</Text>
                </Box>
              )}

              {/* In-Sheet Search */}
              <div className="sheet-search-wrapper">
                <Input.Search
                  placeholder="Lọc quận, huyện, phường xã, mã..."
                  value={sheetFilter}
                  onChange={(e) => setSheetFilter(e.target.value)}
                  size="small"
                  clearable
                />
              </div>
            </div>

            {/* Scrollable List Container */}
            <div className="sheet-scrollable-list">
              {filteredDistricts.length === 0 ? (
                <Box p={4} textAlign="center">
                  <Text className="empty-text">
                    Không tìm thấy đơn vị nào khớp với "{sheetFilter}".
                  </Text>
                </Box>
              ) : (
                <List>
                  {filteredDistricts.map((d) => {
                    const q = stripDiacritics(sheetFilter.trim());
                    const dMatch = q
                      ? stripDiacritics(d.name).includes(q) ||
                        (d.code5 && d.code5.includes(sheetFilter.trim())) ||
                        (d.code6 && d.code6.includes(sheetFilter.trim()))
                      : false;

                    const isExpanded =
                      expandedDistricts[d.name] !== undefined
                        ? expandedDistricts[d.name]
                        : Boolean(sheetFilter.trim());

                    const matchingWards = (d.wards || []).filter((w) => {
                      if (!sheetFilter.trim() || dMatch) return true;
                      return (
                        stripDiacritics(w.name).includes(q) ||
                        (w.code5 && w.code5.includes(sheetFilter.trim())) ||
                        (w.code6 && w.code6.includes(sheetFilter.trim()))
                      );
                    });

                    return (
                      <React.Fragment key={d.name}>
                        <List.Item
                          title={d.name}
                          prefix={<Icon icon="zi-pin" />}
                          onClick={() => d.wards && toggleExpandDistrict(d.name)}
                          suffix={
                            <Box className="chip-row">
                              <CopyChip label="5s" value={d.code5} color="chip-blue" />
                              <CopyChip label="6s" value={d.code6} color="chip-gray" />
                              {d.wards && d.wards.length > 0 && (
                                <button
                                  type="button"
                                  className="expand-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExpandDistrict(d.name);
                                  }}
                                  title="Xem danh sách phường xã"
                                >
                                  <Icon
                                    icon={isExpanded ? "zi-chevron-up" : "zi-chevron-down"}
                                    size={12}
                                  />
                                  <span>{d.wards.length} phường</span>
                                </button>
                              )}
                            </Box>
                          }
                        />

                        {/* Danh sách phường / xã mở rộng */}
                        {isExpanded && matchingWards.length > 0 && (
                          <Box className="ward-list-box" pl={4} pr={2} py={1}>
                            {matchingWards.map((w) => (
                              <Box
                                key={w.name}
                                flex
                                alignItems="center"
                                justifyContent="space-between"
                                className="ward-item"
                                py={1}
                              >
                                <Box flex alignItems="center">
                                  <Icon
                                    icon="zi-bullet-solid"
                                    size={8}
                                    style={{ color: "#0068ff", marginRight: 6 }}
                                  />
                                  <Text size="small">{w.name}</Text>
                                </Box>
                                <Box className="chip-row">
                                  <CopyChip label="5s" value={w.code5} color="chip-blue" />
                                  <CopyChip label="6s" value={w.code6} color="chip-gray" />
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        )}
                      </React.Fragment>
                    );
                  })}
                </List>
              )}
            </div>
          </div>
        )}
      </Sheet>
    </Box>
  );
}

/* ─── International Tab ─── */
const POPULAR_ZIPS = {
  US: [{ zip: "10001", label: "New York" }, { zip: "90210", label: "Beverly Hills" }, { zip: "60601", label: "Chicago" }],
  GB: [{ zip: "SW1A 1AA", label: "Buckingham" }, { zip: "EC1A 1BB", label: "London EC" }],
  JP: [{ zip: "100-0001", label: "Chiyoda" }, { zip: "530-0001", label: "Osaka" }],
  SG: [{ zip: "018956", label: "Marina Bay" }, { zip: "238859", label: "Orchard" }],
  AU: [{ zip: "2000", label: "Sydney CBD" }, { zip: "3000", label: "Melbourne" }],
  DE: [{ zip: "10115", label: "Berlin Mitte" }, { zip: "80331", label: "München" }],
  FR: [{ zip: "75001", label: "Paris 1er" }, { zip: "69001", label: "Lyon" }],
};

function IntlTab() {
  const [country, setCountry] = useState("US");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const selectedCountry = COUNTRIES.find((c) => c.code === country);
  const popularZips = POPULAR_ZIPS[country] || [];

  const handleSearch = async (zipOverride) => {
    const zipCode = (zipOverride || code).trim();
    if (!zipCode) return;
    if (zipOverride) setCode(zipOverride);
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(
        `https://api.zippopotam.us/${country}/${encodeURIComponent(zipCode)}`
      );
      if (!res.ok) throw new Error("not-found");
      const data = await res.json();
      setResult(data);
    } catch {
      setError("Không tìm thấy mã bưu chính này. Kiểm tra lại quốc gia và mã.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Box mb={3}>
        <Text.Title size="small" className="field-label">Quốc gia</Text.Title>
        <Select
          value={country}
          onChange={(value) => {
            setCountry(value);
            setResult(null);
            setError("");
            setCode("");
          }}
          closeOnSelect
        >
          {COUNTRIES.map((c) => (
            <Option
              key={c.code}
              value={c.code}
              title={`${c.name} (${c.code})`}
            />
          ))}
        </Select>
      </Box>

      {popularZips.length > 0 && (
        <Box mb={3}>
          <Box flex alignItems="center" mb={1}>
            <Icon icon="zi-search" size={14} style={{ color: "#555", marginRight: 4 }} />
            <Text size="xSmall" className="field-label" style={{ margin: 0 }}>Gợi ý tra nhanh:</Text>
          </Box>
          <Box className="chip-row mt2">
            {popularZips.map((z) => (
              <button
                key={z.zip}
                className="copy-chip chip-blue"
                onClick={() => handleSearch(z.zip)}
                type="button"
              >
                <Icon icon="zi-location" size={12} style={{ marginRight: 3 }} />
                <span>{z.label} ({z.zip})</span>
              </button>
            ))}
          </Box>
        </Box>
      )}

      <Box mb={3}>
        <Text.Title size="small" className="field-label">
          Mã bưu chính / ZIP
          {selectedCountry?.placeholder && (
            <Text size="xSmall" className="hint-inline"> — VD: {selectedCountry.placeholder}</Text>
          )}
        </Text.Title>
        <Input
          placeholder={selectedCountry?.placeholder || "Nhập mã bưu chính"}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          type="text"
        />
      </Box>

      <Button fullWidth onClick={() => handleSearch()} disabled={loading}>
        {loading ? (
          <Spinner visible />
        ) : (
          <Box flex alignItems="center" justifyContent="center">
            <Icon icon="zi-search" size={16} style={{ marginRight: 6 }} />
            <span>Tra cứu</span>
          </Box>
        )}
      </Button>

      {error && (
        <Box flex alignItems="center" mt={3}>
          <Icon icon="zi-warning-circle" size={16} style={{ color: "#e0433f", marginRight: 6 }} />
          <Text className="error-text">{error}</Text>
        </Box>
      )}

      {result && (
        <Box mt={4} className="result-card">
          <Box flex alignItems="center" mb={2}>
            <Icon icon="zi-check-circle-solid" size={18} style={{ color: "#0068ff", marginRight: 6 }} />
            <Text.Title size="normal">
              {result["post code"]} — {result["country"]}
            </Text.Title>
          </Box>
          <List mt={2}>
            {result.places.map((pl, idx) => (
              <List.Item
                key={idx}
                prefix={<Icon icon="zi-location" />}
                title={pl["place name"]}
                subTitle={`${pl["state"] || ""}${pl["state abbreviation"] ? " (" + pl["state abbreviation"] + ")" : ""}`}
                suffix={
                  <button
                    className="copy-chip chip-gray"
                    onClick={() => copyText(`${pl["place name"]}, ${pl["state"] || ""}`)}
                    title="Sao chép địa chỉ"
                    type="button"
                  >
                    <Icon icon="zi-copy" size={13} style={{ marginRight: 3 }} />
                    <span>Chép</span>
                  </button>
                }
              />
            ))}
          </List>
        </Box>
      )}

      <Text className="hint-text" size="xSmall" mt={4}>
        Dữ liệu tra qua Zippopotam.us (Geonames), hỗ trợ hơn 60 quốc gia.
        Nhấn vào chip để tra nhanh ZIP phổ biến.
      </Text>
    </Box>
  );
}

/* ─── Home Page ─── */
function HomePage() {
  const [tab, setTab] = useState("vn");
  const [theme, setTheme] = useTheme();
  const getStoredTheme = () => {
    try {
      const saved = localStorage.getItem("zma_zipcode_theme");
      if (saved === "dark" || saved === "light") return saved;
    } catch (e) {}
    return document.body.getAttribute("zaui-theme") || "light";
  };

  const [currentTheme, setCurrentTheme] = useState(getStoredTheme);
  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    setCurrentTheme(next);
    try {
      localStorage.setItem("zma_zipcode_theme", next);
    } catch (e) {}
    if (setTheme) {
      setTheme({ mode: next });
    }
    document.body.setAttribute("zaui-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  useEffect(() => {
    document.body.setAttribute("zaui-theme", currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
    try {
      localStorage.setItem("zma_zipcode_theme", currentTheme);
    } catch (e) {}
  }, [currentTheme]);

  return (
    <Page className="zipcode-page">
      <Box className="app-header" p={4}>
        <Box flex alignItems="center" justifyContent="space-between" mb={1}>
          <Box flex alignItems="center">
            <Icon icon="zi-location-solid" size={24} style={{ color: "#fff", marginRight: 8 }} />
            <Text.Title size="large" className="header-title">
              WrenApp - Tra cứu mã bưu chính
            </Text.Title>
          </Box>
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            type="button"
            title={isDark ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
          >
            <Icon icon="zi-wallpaper" size={15} style={{ marginRight: 4 }} />
            <span>{isDark ? "Sáng" : "Tối"}</span>
          </button>
        </Box>
        <Text className="header-sub">Việt Nam &amp; hơn 60 quốc gia · Quy đổi mã 5 - 6 số</Text>
      </Box>

      <Box className="tab-switch" px={4}>
        <Button
          className={tab === "vn" ? "tab-btn tab-btn-active" : "tab-btn"}
          onClick={() => setTab("vn")}
          size="small"
        >
          <Box flex alignItems="center" justifyContent="center">
            <Icon icon="zi-home" size={15} style={{ marginRight: 6 }} />
            <span>Việt Nam</span>
          </Box>
        </Button>
        <Button
          className={tab === "intl" ? "tab-btn tab-btn-active" : "tab-btn"}
          onClick={() => setTab("intl")}
          size="small"
        >
          <Box flex alignItems="center" justifyContent="center">
            <Icon icon="zi-share-external-1" size={15} style={{ marginRight: 6 }} />
            <span>Quốc tế</span>
          </Box>
        </Button>
      </Box>

      {tab === "vn" ? <VnTab /> : <IntlTab />}
    </Page>
  );
}

export default HomePage;
