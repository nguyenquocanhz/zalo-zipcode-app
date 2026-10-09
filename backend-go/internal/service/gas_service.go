package service

import (
	"encoding/json"
	"fmt"
	"math"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"sync"
	"time"

	"zaloapp-backend/internal/config"
	"zaloapp-backend/internal/models"
)

const (
	// IUGG Mean Earth Radius (chuẩn trắc địa WGS-84 theo viet-thanh.vn)
	EarthRadiusMeters = 6371008.8
	// Tốc độ dắt bộ xe máy trung bình: 4.0 km/h ~ 66.67 m/phút
	WalkingSpeedMetersPerMinute = 66.67
)

// GasService quản lý nghiệp vụ và dữ liệu giá xăng & cây xăng
type GasService struct {
	cfg        *config.Config
	mu         sync.RWMutex
	priceData  *models.GasPriceData
	stations   []models.GasStation
	history    []models.GasPriceHistory
	pricesPath string
	stPath     string
}

// NewGasService khởi tạo GasService và load dữ liệu ban đầu
func NewGasService(cfg *config.Config) (*GasService, error) {
	s := &GasService{
		cfg:        cfg,
		pricesPath: filepath.Join(cfg.DataDir, "gas_prices.json"),
		stPath:     filepath.Join(cfg.DataDir, "stations.json"),
	}

	if err := s.loadInitialData(); err != nil {
		return nil, fmt.Errorf("không thể khởi tạo GasService: %w", err)
	}

	return s, nil
}

// loadInitialData nạp dữ liệu từ file hoặc khởi tạo bộ dữ liệu chuẩn
func (s *GasService) loadInitialData() error {
	s.mu.Lock()
	defer s.mu.Unlock()

	// 1. Load Prices
	if data, err := os.ReadFile(s.pricesPath); err == nil {
		var pData models.GasPriceData
		if err := json.Unmarshal(data, &pData); err == nil {
			s.priceData = &pData
		}
	}

	// Nếu chưa có file giá, khởi tạo bộ giá thương mại chính thức 2026 (Petrolimex kỳ 01/10/2026)
	if s.priceData == nil {
		s.priceData = s.getDefaultPriceData()
		_ = s.savePricesToDiskLocked()
	}

	// 2. Load Stations
	if data, err := os.ReadFile(s.stPath); err == nil {
		var stList []models.GasStation
		if err := json.Unmarshal(data, &stList); err == nil {
			s.stations = stList
		}
	}

	// Nếu chưa có file cây xăng, khởi tạo mạng lưới cây xăng chuẩn (Bình Tân, Q1, Q6, HN...)
	if len(s.stations) == 0 {
		s.stations = s.getDefaultStations()
		_ = s.saveStationsToDiskLocked()
	}

	// 3. Khởi tạo lịch sử điều hành
	s.history = s.getDefaultHistory()

	return nil
}

// GetPrices trả về dữ liệu giá xăng hiện hành
func (s *GasService) GetPrices() models.GasPriceData {
	s.mu.RLock()
	defer s.mu.RUnlock()

	res := *s.priceData
	res.ServerInfo = models.ServerInfo{
		NodeID:    s.cfg.NodeID,
		Domain:    s.cfg.Domain,
		Version:   "1.0.0-go",
		Status:    "online",
		Timestamp: time.Now().Format(time.RFC3339),
	}
	if len(res.History) == 0 {
		res.History = s.history
	}
	return res
}

// UpdatePrices cập nhật dữ liệu giá mới (từ crawler hoặc webhook)
func (s *GasService) UpdatePrices(newData models.GasPriceData) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	newData.UpdatedAt = time.Now()
	s.priceData = &newData
	return s.savePricesToDiskLocked()
}

// GetHistory trả về lịch sử giá xăng: lấy từ feed đã đồng bộ, chưa có thì dùng bộ mặc định
func (s *GasService) GetHistory() []models.GasPriceHistory {
	s.mu.RLock()
	defer s.mu.RUnlock()
	if s.priceData != nil && len(s.priceData.History) > 0 {
		return s.priceData.History
	}
	return s.history
}

// SearchStations tìm kiếm cây xăng theo tọa độ, bán kính, chế độ khẩn cấp
func (s *GasService) SearchStations(userLat, userLng, radiusMeters float64, brand string, ron97Only bool, emergency bool) models.StationSearchResponse {
	s.mu.RLock()
	defer s.mu.RUnlock()

	// Nếu bật chế độ khẩn cấp (hết xăng dắt bộ), tự động tăng bán kính nếu phạm vi hẹp không có trạm
	effectiveRadius := radiusMeters
	emergencyLevel := ""
	if emergency && userLat != 0 && userLng != 0 {
		radiiToTry := []float64{200, 500, 1000, 2000, 5000}
		for _, r := range radiiToTry {
			count := s.countStationsWithin(userLat, userLng, r, brand, ron97Only)
			if count > 0 {
				effectiveRadius = r
				if r <= 200 {
					emergencyLevel = "Rất gần: Trong vòng 200m có trạm, an tâm dắt bộ"
				} else if r <= 500 {
					emergencyLevel = "Bán kính 200m không có trạm. Tự động mở rộng 500m"
				} else {
					emergencyLevel = fmt.Sprintf("Tự động mở rộng bán kính lên %.0fm để tìm trạm gần nhất", r)
				}
				break
			}
		}
	}

	var results []models.StationWithDistance

	for _, st := range s.stations {
		// Filter theo thương hiệu nếu có
		if brand != "" && !strings.EqualFold(st.Brand, brand) {
			continue
		}
		// Filter RON 97 nếu yêu cầu
		if ron97Only && !st.HasRon97 {
			continue
		}

		item := models.StationWithDistance{
			GasStation: st,
		}

		if userLat != 0 && userLng != 0 {
			distMeters := CalculatePreciseDistance(userLat, userLng, st.Lat, st.Lng)
			if effectiveRadius > 0 && distMeters > effectiveRadius {
				continue
			}

			item.Meters = math.Round(distMeters*10) / 10
			item.Kilometers = math.Round((distMeters/1000)*100) / 100
			item.WalkingMinutes = int(math.Ceil(distMeters / WalkingSpeedMetersPerMinute))

			if item.Meters < 1000 {
				item.DistanceText = fmt.Sprintf("%.0f m", item.Meters)
			} else {
				item.DistanceText = fmt.Sprintf("%.1f km", item.Kilometers)
			}

			if item.Meters <= 300 {
				item.BadgeType = "near"
			} else if item.Meters <= 700 {
				item.BadgeType = "mid"
			} else {
				item.BadgeType = "far"
			}
		}

		results = append(results, item)
	}

	// Sắp xếp khoảng cách tăng dần (nếu có GPS)
	if userLat != 0 && userLng != 0 {
		sort.Slice(results, func(i, j int) bool {
			return results[i].Meters < results[j].Meters
		})
	}

	return models.StationSearchResponse{
		Total:          len(results),
		RadiusMeters:   effectiveRadius,
		UserLat:        userLat,
		UserLng:        userLng,
		IsEmergency:    emergency,
		EmergencyLevel: emergencyLevel,
		Stations:       results,
	}
}

// countStationsWithin đếm số trạm trong bán kính
func (s *GasService) countStationsWithin(lat, lng, radius float64, brand string, ron97Only bool) int {
	c := 0
	for _, st := range s.stations {
		if brand != "" && !strings.EqualFold(st.Brand, brand) {
			continue
		}
		if ron97Only && !st.HasRon97 {
			continue
		}
		if CalculatePreciseDistance(lat, lng, st.Lat, st.Lng) <= radius {
			c++
		}
	}
	return c
}

// CalculatePreciseDistance tính khoảng cách trắc địa WGS-84/IUGG theo viet-thanh.vn
func CalculatePreciseDistance(lat1, lon1, lat2, lon2 float64) float64 {
	rad := math.Pi / 180.0
	phi1 := lat1 * rad
	phi2 := lat2 * rad
	deltaPhi := (lat2 - lat1) * rad
	deltaLambda := (lon2 - lon1) * rad

	a := math.Sin(deltaPhi/2.0)*math.Sin(deltaPhi/2.0) +
		math.Cos(phi1)*math.Cos(phi2)*math.Sin(deltaLambda/2.0)*math.Sin(deltaLambda/2.0)

	c := 2.0 * math.Atan2(math.Sqrt(a), math.Sqrt(1.0-a))
	return EarthRadiusMeters * c
}

func (s *GasService) savePricesToDiskLocked() error {
	_ = os.MkdirAll(s.cfg.DataDir, 0755)
	data, err := json.MarshalIndent(s.priceData, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(s.pricesPath, data, 0644)
}

func (s *GasService) saveStationsToDiskLocked() error {
	_ = os.MkdirAll(s.cfg.DataDir, 0755)
	data, err := json.MarshalIndent(s.stations, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(s.stPath, data, 0644)
}

// Bộ dữ liệu giá mặc định (kỳ điều hành 24/09/2026 chính thức Petrolimex)
func (s *GasService) getDefaultPriceData() *models.GasPriceData {
	return &models.GasPriceData{
		Version:   "1.0",
		UpdatedAt: time.Now(),
		UpdateInfo: models.UpdateInfo{
			EffectiveDate:    "01/10/2026",
			EffectiveTime:    "15:00:00",
			AnnouncedBy:      "Liên Bộ Công Thương - Tài chính / Petrolimex",
			NextExpectedDate: "08/10/2026",
			Status:           "Áp dụng kỳ mới nhất (TT 50/2025/TT-BCT)",
			SourceURL:        "https://www.petrolimex.com.vn",
		},
		Products: []models.GasProduct{
			{
				ID:          "ron95_5",
				Name:        "Xăng E10 RON 95-V",
				ShortName:   "E10 RON 95-V",
				Category:    "gasoline",
				Unit:        "đồng/lít",
				PriceZone1:  28180,
				PriceZone2:  28740,
				Diff:        100,
				DiffPercent: 0.36,
				Badge:       "Euro 5 Cao cấp",
				BadgeType:   "primary",
				Desc:        "Xăng sinh học E10 tiêu chuẩn khí thải Euro 5 cao cấp của Petrolimex, bảo vệ động cơ xe ga & ô tô đời mới",
				Popular:     false,
			},
			{
				ID:          "ron95_3",
				Name:        "Xăng E10 RON 95-III",
				ShortName:   "E10 RON 95-III",
				Category:    "gasoline",
				Unit:        "đồng/lít",
				PriceZone1:  27180,
				PriceZone2:  27720,
				Diff:        100,
				DiffPercent: 0.37,
				Badge:       "Phổ biến nhất",
				BadgeType:   "success",
				Desc:        "Xăng sinh học E10 thay thế chính thức RON 95 truyền thống toàn quốc từ 01/06/2026 (Thông tư 50/2025/TT-BCT)",
				Popular:     true,
			},
			{
				ID:          "e5_ron92",
				Name:        "Xăng E5 RON 92-II",
				ShortName:   "E5 RON 92",
				Category:    "gasoline",
				Unit:        "đồng/lít",
				PriceZone1:  26560,
				PriceZone2:  27090,
				Diff:        170,
				DiffPercent: 0.64,
				Badge:       "Sinh học tiết kiệm",
				BadgeType:   "info",
				Desc:        "Xăng sinh học pha 5% ethanol, tối ưu chi phí cho xe máy số (Wave Alpha, Sirius, Blade)",
				Popular:     true,
			},
			{
				ID:          "diesel_5",
				Name:        "Dầu Diesel 0.001S-V (DO 5)",
				ShortName:   "DO 0.001S-V",
				Category:    "diesel",
				Unit:        "đồng/lít",
				PriceZone1:  31110,
				PriceZone2:  31730,
				Diff:        -980,
				DiffPercent: -3.05,
				Badge:       "Diesel Euro 5",
				BadgeType:   "warning",
				Desc:        "Dầu Diesel cao cấp hàm lượng lưu huỳnh cực thấp, bảo vệ kim phun và bộ lọc hạt DPF ô tô máy dầu thế hệ mới",
				Popular:     false,
			},
			{
				ID:          "diesel_2",
				Name:        "Dầu Diesel 0.05S-II (DO)",
				ShortName:   "DO 0.05S",
				Category:    "diesel",
				Unit:        "đồng/lít",
				PriceZone1:  29710,
				PriceZone2:  30300,
				Diff:        -780,
				DiffPercent: -2.56,
				Badge:       "Dầu phổ thông",
				BadgeType:   "warning",
				Desc:        "Dầu Diesel thông dụng cho xe tải, xe bán tải (Ranger, Hilux, Fortuner), xe khách và máy móc",
				Popular:     true,
			},
			{
				ID:          "kerosene",
				Name:        "Dầu hỏa 2-K (Kerosene)",
				ShortName:   "Dầu hỏa",
				Category:    "other",
				Unit:        "đồng/lít",
				PriceZone1:  29770,
				PriceZone2:  30360,
				Diff:        -250,
				DiffPercent: -0.83,
				Badge:       "Dân dụng",
				BadgeType:   "default",
				Desc:        "Dầu hỏa dân dụng dùng cho mục đích thắp sáng, sưởi ấm, đun nấu và sản xuất công nghiệp",
				Popular:     false,
			},
			{
				ID:          "mazut",
				Name:        "Dầu Mazut N°2B (3,5S)",
				ShortName:   "Mazut N°2B",
				Category:    "other",
				Unit:        "đồng/kg",
				PriceZone1:  20390,
				PriceZone2:  20790,
				Diff:        920,
				DiffPercent: 4.73,
				Badge:       "Công nghiệp",
				BadgeType:   "default",
				Desc:        "Nhiên liệu đốt lò hơi nhà máy nhiệt điện, lò sấy công nghiệp, tàu biển",
				Popular:     false,
			},
		},
	}
}

// Bộ dữ liệu cây xăng mặc định
func (s *GasService) getDefaultStations() []models.GasStation {
	return []models.GasStation{
		{
			ID:              "petro_binhtan_03",
			Brand:           "Petrolimex",
			Name:            "Cửa hàng Xăng dầu Tên Lửa - Khu Tên Lửa (Bình Tân)",
			Province:        "TP. Hồ Chí Minh",
			District:        "Bình Tân",
			Address:         "Số 121 Đường Số 7, P. Bình Trị Đông B, Quận Bình Tân, TP. Hồ Chí Minh",
			Phone:           "028.3751.5678",
			Lat:             10.7588,
			Lng:             106.6135,
			Fuels:           []string{"E10 RON 95-III", "E5 RON 92", "DO 0.05S"},
			Services:        []string{"Chuyển khoản VietQR", "Quét mã ZaloPay / MoMo", "Cà thẻ POS"},
			Open247:         true,
			HasBankTransfer: true,
			HasQrPayment:    true,
			HasCardPos:      true,
			HasRon97:        false,
		},
		{
			ID:              "petro_binhtan_01",
			Brand:           "Petrolimex",
			Name:            "Cửa hàng Xăng dầu Số 14 - Kinh Dương Vương (Bình Tân)",
			Province:        "TP. Hồ Chí Minh",
			District:        "Bình Tân",
			Address:         "Số 440 Kinh Dương Vương, P. An Lạc, Quận Bình Tân, TP. Hồ Chí Minh",
			Phone:           "028.3875.1234",
			Lat:             10.7428,
			Lng:             106.6172,
			Fuels:           []string{"E10 RON 95-V", "E10 RON 95-III", "E5 RON 92", "DO 0.05S"},
			Services:        []string{"Chuyển khoản VietQR", "Quét mã ZaloPay", "Cà thẻ POS", "Cửa hàng tiện lợi"},
			Open247:         true,
			HasBankTransfer: true,
			HasQrPayment:    true,
			HasCardPos:      true,
			HasRon97:        false,
		},
		{
			ID:              "pvoil_binhtan_01",
			Brand:           "PVOIL",
			Name:            "Cửa hàng Xăng dầu PVOIL Lê Văn Quới (Bình Tân)",
			Province:        "TP. Hồ Chí Minh",
			District:        "Bình Tân",
			Address:         "Số 279 Lê Văn Quới, P. Bình Trị Đông, Quận Bình Tân, TP. Hồ Chí Minh",
			Phone:           "028.3978.8999",
			Lat:             10.7715,
			Lng:             106.6162,
			Fuels:           []string{"E10 RON 95-III", "E5 RON 92", "DO 0.05S"},
			Services:        []string{"PVOIL Easy", "Chuyển khoản VietQR", "Quét mã ZaloPay", "Cà thẻ POS"},
			Open247:         true,
			HasBankTransfer: true,
			HasQrPayment:    true,
			HasCardPos:      true,
			HasRon97:        false,
		},
		{
			ID:              "petro_binhtan_04",
			Brand:           "Petrolimex",
			Name:            "Cửa hàng Xăng dầu Petrolimex Hương Lộ 2 (Bình Tân)",
			Province:        "TP. Hồ Chí Minh",
			District:        "Bình Tân",
			Address:         "Số 512 Hương Lộ 2, P. Bình Trị Đông A, Quận Bình Tân, TP. Hồ Chí Minh",
			Phone:           "028.3877.2345",
			Lat:             10.7645,
			Lng:             106.6021,
			Fuels:           []string{"E10 RON 95-III", "E5 RON 92", "DO 0.05S"},
			Services:        []string{"Chuyển khoản VietQR", "Quét mã ZaloPay", "Cửa hàng Pmart"},
			Open247:         true,
			HasBankTransfer: true,
			HasQrPayment:    true,
			HasCardPos:      true,
			HasRon97:        false,
		},
		{
			ID:              "petro_binhtan_02",
			Brand:           "Petrolimex",
			Name:            "Cửa hàng Xăng dầu Số 39 - Quốc Lộ 1A (Bình Tân)",
			Province:        "TP. Hồ Chí Minh",
			District:        "Bình Tân",
			Address:         "Số 528 Quốc Lộ 1A, P. Bình Hưng Hòa B, Quận Bình Tân, TP. Hồ Chí Minh",
			Phone:           "028.3750.6789",
			Lat:             10.7925,
			Lng:             106.5925,
			Fuels:           []string{"E10 RON 95-V", "E10 RON 95-III", "E5 RON 92", "DO 0.001S-V", "DO 0.05S"},
			Services:        []string{"Chuyển khoản VietQR", "Cà thẻ POS", "Trạm dừng nghỉ xe tải xe khách"},
			Open247:         true,
			HasBankTransfer: true,
			HasQrPayment:    true,
			HasCardPos:      true,
			HasRon97:        false,
		},
		{
			ID:              "petro_binhtan_05",
			Brand:           "Petrolimex",
			Name:            "Cửa hàng Xăng dầu Tân Kỳ Tân Quý (Bình Tân)",
			Province:        "TP. Hồ Chí Minh",
			District:        "Bình Tân",
			Address:         "Số 620 Tân Kỳ Tân Quý, P. Bình Hưng Hòa, Quận Bình Tân, TP. Hồ Chí Minh",
			Phone:           "028.3765.4321",
			Lat:             10.8035,
			Lng:             106.6042,
			Fuels:           []string{"E10 RON 95-III", "E5 RON 92", "DO 0.05S"},
			Services:        []string{"Chuyển khoản VietQR", "Quét mã ZaloPay", "Cà thẻ POS"},
			Open247:         true,
			HasBankTransfer: true,
			HasQrPayment:    true,
			HasCardPos:      true,
			HasRon97:        false,
		},
		{
			ID:              "comeco_hcm_01",
			Brand:           "Comeco",
			Name:            "Cửa hàng Xăng dầu Comeco Số 03 - Hàng Xanh",
			Province:        "TP. Hồ Chí Minh",
			District:        "Bình Thạnh",
			Address:         "178/9 Điện Biên Phủ, Phường 21, Q. Bình Thạnh, TP. Hồ Chí Minh",
			Phone:           "028.3899.2345",
			Lat:             10.7985,
			Lng:             106.7112,
			Fuels:           []string{"E10 RON 95-III", "E5 RON 92", "DO 0.05S"},
			Services:        []string{"Chuyển khoản VietQR", "Quét mã ZaloPay", "Cà thẻ POS"},
			Open247:         true,
			HasBankTransfer: true,
			HasQrPayment:    true,
			HasCardPos:      true,
			HasRon97:        false,
		},
		{
			ID:              "comeco_hcm_02",
			Brand:           "Comeco",
			Name:            "Cửa hàng Xăng dầu Comeco Số 17 - Lê Trọng Tấn",
			Province:        "TP. Hồ Chí Minh",
			District:        "Tân Phú",
			Address:         "539 Lê Trọng Tấn, P. Sơn Kỳ, Q. Tân Phú, TP. Hồ Chí Minh",
			Phone:           "028.3816.5432",
			Lat:             10.8142,
			Lng:             106.6189,
			Fuels:           []string{"E10 RON 95-III", "E5 RON 92", "DO 0.05S"},
			Services:        []string{"Chuyển khoản VietQR", "Quét mã ZaloPay", "Cà thẻ POS"},
			Open247:         true,
			HasBankTransfer: true,
			HasQrPayment:    true,
			HasCardPos:      true,
			HasRon97:        false,
		},
		{
			ID:              "comeco_hcm_03",
			Brand:           "Comeco",
			Name:            "Cửa hàng Xăng dầu Comeco Số 7 - Lê Quang Sung",
			Province:        "TP. Hồ Chí Minh",
			District:        "Quận 6",
			Address:         "49C Lê Quang Sung, Phường 2, Quận 6, TP. Hồ Chí Minh",
			Phone:           "028.3855.6789",
			Lat:             10.7512,
			Lng:             106.6548,
			Fuels:           []string{"E10 RON 95-III", "E5 RON 92", "DO 0.05S"},
			Services:        []string{"Chuyển khoản VietQR", "Quét mã ZaloPay", "Cà thẻ POS"},
			Open247:         true,
			HasBankTransfer: true,
			HasQrPayment:    true,
			HasCardPos:      true,
			HasRon97:        false,
		},
		{
			ID:              "petro_hcm_01",
			Brand:           "Petrolimex",
			Name:            "Cửa hàng Xăng dầu Số 01 - Hai Bà Trưng",
			Province:        "TP. Hồ Chí Minh",
			District:        "Quận 1",
			Address:         "Số 136 Hai Bà Trưng, P. Đa Kao, Quận 1, TP. Hồ Chí Minh",
			Phone:           "028.3822.4567",
			Lat:             10.7871,
			Lng:             106.6978,
			Fuels:           []string{"E10 RON 95-V", "E10 RON 95-III", "E5 RON 92", "DO 0.001S-V", "DO 0.05S"},
			Services:        []string{"Chuyển khoản VietQR / ZaloPay", "Cà thẻ Visa / Master / Napas", "Trạm sạc xe điện"},
			Open247:         true,
			HasBankTransfer: true,
			HasQrPayment:    true,
			HasCardPos:      true,
			HasRon97:        false,
		},
		{
			ID:              "petro_hn_01",
			Brand:           "Petrolimex",
			Name:            "Cửa hàng Xăng dầu Số 1 - Trần Quang Khải",
			Province:        "Hà Nội",
			District:        "Hoàn Kiếm",
			Address:         "Số 1 Trần Quang Khải, P. Tràng Tiền, Q. Hoàn Kiếm, Hà Nội",
			Phone:           "024.3825.2678",
			Lat:             21.0265,
			Lng:             105.8570,
			Fuels:           []string{"E10 RON 95-V", "E10 RON 95-III", "E5 RON 92", "DO 0.001S-V", "DO 0.05S"},
			Services:        []string{"Chuyển khoản VietQR / ZaloPay", "Cà thẻ POS / Napas", "Cửa hàng tiện lợi"},
			Open247:         true,
			HasBankTransfer: true,
			HasQrPayment:    true,
			HasCardPos:      true,
			HasRon97:        false,
		},
	}
}

// Bộ dữ liệu lịch sử giá
func (s *GasService) getDefaultHistory() []models.GasPriceHistory {
	return []models.GasPriceHistory{
		{
			Date:   "01/10/2026",
			Ron95:  27180,
			E5:     26560,
			Diesel: 29710,
			Trend:  "up",
			Note:   "Xăng E10 tăng 100đ, Dầu DO giảm 780đ",
		},
		{
			Date:   "24/09/2026",
			Ron95:  27080,
			E5:     26390,
			Diesel: 30490,
			Trend:  "up",
			Note:   "Xăng E10 tăng 1.450đ, Dầu DO tăng 550đ",
		},
		{
			Date:   "17/09/2026",
			Ron95:  25630,
			E5:     25130,
			Diesel: 29940,
			Trend:  "up",
			Note:   "Xăng E10 tăng 1.400đ, Dầu DO tăng 1.460đ",
		},
		{
			Date:   "10/09/2026",
			Ron95:  24230,
			E5:     23740,
			Diesel: 28480,
			Trend:  "up",
			Note:   "Xăng E10 tăng 960đ, Dầu DO tăng 740đ",
		},
		{
			Date:   "03/09/2026",
			Ron95:  23270,
			E5:     22480,
			Diesel: 27740,
			Trend:  "up",
			Note:   "Xăng E10 tăng 670đ, Dầu DO giảm 340đ",
		},
	}
}
