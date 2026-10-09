package models

import "time"

// GasProduct đại diện cho 1 sản phẩm xăng dầu niêm yết
type GasProduct struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	ShortName   string  `json:"shortName"`
	Category    string  `json:"category"`
	Unit        string  `json:"unit"`
	PriceZone1  int     `json:"priceZone1"`
	PriceZone2  int     `json:"priceZone2"`
	Diff        int     `json:"diff"`
	DiffPercent float64 `json:"diffPercent"`
	Badge       string  `json:"badge"`
	BadgeType   string  `json:"badgeType"`
	Desc        string  `json:"desc"`
	Popular     bool    `json:"popular"`
}

// UpdateInfo chứa metadata về kỳ điều hành giá
type UpdateInfo struct {
	EffectiveDate    string `json:"effectiveDate"`
	EffectiveTime    string `json:"effectiveTime"`
	AnnouncedBy      string `json:"announcedBy"`
	NextExpectedDate string `json:"nextExpectedDate"`
	Status           string `json:"status"`
	SourceURL        string `json:"sourceUrl"`
}

// GasPriceData là payload chính trả về cho Mini App
type GasPriceData struct {
	Version    string            `json:"version"`
	UpdatedAt  time.Time         `json:"updatedAt"`
	UpdateInfo UpdateInfo        `json:"updateInfo"`
	Products   []GasProduct      `json:"products"`
	History    []GasPriceHistory `json:"history,omitempty"`
	ServerInfo ServerInfo        `json:"serverInfo"`
}

// ServerInfo chứa thông tin backend homelab
type ServerInfo struct {
	NodeID    string `json:"nodeId"`
	Domain    string `json:"domain"`
	Version   string `json:"version"`
	Status    string `json:"status"`
	Timestamp string `json:"timestamp"`
}

// GasPriceHistory ghi nhận lịch sử biến động giá qua các kỳ
type GasPriceHistory struct {
	Date   string `json:"date"`
	Ron95  int    `json:"ron95"`
	E5     int    `json:"e5"`
	Diesel int    `json:"diesel"`
	Trend  string `json:"trend"` // "up", "down", "flat"
	Note   string `json:"note"`
}

// GasStation đại diện cho 1 cây xăng trong hệ thống
type GasStation struct {
	ID              string   `json:"id"`
	Brand           string   `json:"brand"`
	Name            string   `json:"name"`
	Province        string   `json:"province"`
	District        string   `json:"district"`
	Address         string   `json:"address"`
	Phone           string   `json:"phone"`
	Lat             float64  `json:"lat"`
	Lng             float64  `json:"lng"`
	Fuels           []string `json:"fuels"`
	Services        []string `json:"services"`
	Open247         bool     `json:"open247"`
	HasBankTransfer bool     `json:"hasBankTransfer"`
	HasQrPayment    bool     `json:"hasQrPayment"`
	HasCardPos      bool     `json:"hasCardPos"`
	HasRon97        bool     `json:"hasRon97"`
}

// StationWithDistance kết hợp thông tin cây xăng với khoảng cách trắc địa
type StationWithDistance struct {
	GasStation
	Meters         float64 `json:"meters"`
	Kilometers     float64 `json:"km"`
	DistanceText   string  `json:"distanceText"`
	WalkingMinutes int     `json:"walkingMinutes"`
	BadgeType      string  `json:"badgeType"` // "near", "mid", "far"
}

// StationSearchResponse trả về danh sách cây xăng đã lọc
type StationSearchResponse struct {
	Total          int                   `json:"total"`
	RadiusMeters   float64               `json:"radiusMeters"`
	UserLat        float64               `json:"userLat"`
	UserLng        float64               `json:"userLng"`
	IsEmergency    bool                  `json:"isEmergency"`
	EmergencyLevel string                `json:"emergencyLevel,omitempty"`
	Stations       []StationWithDistance `json:"stations"`
}
