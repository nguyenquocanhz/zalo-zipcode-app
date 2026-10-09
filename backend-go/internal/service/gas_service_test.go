package service

import (
	"testing"

	"zaloapp-backend/internal/config"
)

func TestCalculatePreciseDistance(t *testing.T) {
	// Tọa độ trạm Tên Lửa và trạm Kinh Dương Vương
	lat1, lon1 := 10.7588, 106.6135
	lat2, lon2 := 10.7428, 106.6172

	dist := CalculatePreciseDistance(lat1, lon1, lat2, lon2)
	// Khoảng cách thực tế ~1820m
	if dist < 1700 || dist > 1950 {
		t.Errorf("Khoảng cách tính toán bất thường: %.2fm (kỳ vọng ~1820m)", dist)
	}
}

func TestGasService_SearchStationsEmergency(t *testing.T) {
	cfg := &config.Config{
		DataDir: t.TempDir(),
		Domain:  "zaloapp.vietcode.io.vn",
		NodeID:  "test-node",
	}

	svc, err := NewGasService(cfg)
	if err != nil {
		t.Fatalf("Không thể tạo GasService: %v", err)
	}

	// Tọa độ người dùng ở Đường Số 7 (Bình Tân)
	userLat, userLng := 10.7607, 106.6135

	// Tìm kiếm khẩn cấp hết xăng (bán kính ban đầu 200m -> tự động nở lên 500m)
	res := svc.SearchStations(userLat, userLng, 200, "", false, true)

	if res.Total == 0 {
		t.Fatal("Kỳ vọng tìm thấy ít nhất 1 cây xăng khi bật chế độ khẩn cấp, nhưng trả về 0")
	}

	nearest := res.Stations[0]
	if nearest.Meters <= 0 || nearest.Meters > 500 {
		t.Errorf("Trạm gần nhất phải nằm trong bán kính 500m, thực tế: %.1fm", nearest.Meters)
	}

	if nearest.WalkingMinutes <= 0 {
		t.Errorf("Thời gian dắt bộ phải > 0 phút, thực tế: %d", nearest.WalkingMinutes)
	}

	t.Logf("✓ Tìm thấy trạm: %s | Cự ly: %s | Dắt bộ: %d phút", nearest.Name, nearest.DistanceText, nearest.WalkingMinutes)
}
