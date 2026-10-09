package service

import (
	"strings"

	"zaloapp-backend/internal/models"
)

// ZipCodeService phục vụ tra cứu mã bưu chính
type ZipCodeService struct {
	provinces []models.ProvinceZipRange
}

// NewZipCodeService khởi tạo ZipCodeService
func NewZipCodeService() *ZipCodeService {
	return &ZipCodeService{
		provinces: getDefaultProvinces(),
	}
}

// GetProvinces trả về danh sách 63 tỉnh thành kèm đầu mã bưu chính và vùng giá
func (s *ZipCodeService) GetProvinces() []models.ProvinceZipRange {
	return s.provinces
}

// Search tìm kiếm mã bưu chính theo từ khóa
func (s *ZipCodeService) Search(query string) []models.ProvinceZipRange {
	q := strings.ToLower(strings.TrimSpace(query))
	if q == "" {
		return s.provinces
	}

	var results []models.ProvinceZipRange
	for _, p := range s.provinces {
		if strings.Contains(strings.ToLower(p.Province), q) ||
			strings.Contains(strings.ToLower(p.CodePrefix), q) ||
			strings.Contains(strings.ToLower(p.Region), q) {
			results = append(results, p)
		}
	}
	return results
}

func getDefaultProvinces() []models.ProvinceZipRange {
	return []models.ProvinceZipRange{
		{Province: "Hà Nội", CodePrefix: "10000 - 14000", Region: "Miền Bắc", Zone: 1},
		{Province: "TP. Hồ Chí Minh", CodePrefix: "70000 - 74000", Region: "Miền Nam", Zone: 1},
		{Province: "Hải Phòng", CodePrefix: "18000", Region: "Miền Bắc", Zone: 1},
		{Province: "Đà Nẵng", CodePrefix: "55000", Region: "Miền Trung", Zone: 1},
		{Province: "Cần Thơ", CodePrefix: "90000", Region: "Miền Nam", Zone: 1},
		{Province: "Bình Dương", CodePrefix: "75000", Region: "Miền Nam", Zone: 1},
		{Province: "Đồng Nai", CodePrefix: "76000", Region: "Miền Nam", Zone: 1},
		{Province: "Bà Rịa - Vũng Tàu", CodePrefix: "78000", Region: "Miền Nam", Zone: 1},
		{Province: "Quảng Ninh", CodePrefix: "20000", Region: "Miền Bắc", Zone: 1},
		{Province: "Khánh Hòa", CodePrefix: "65000", Region: "Miền Trung", Zone: 1},
		{Province: "Lâm Đồng", CodePrefix: "67000", Region: "Tây Nguyên", Zone: 2},
		{Province: "Đắk Lắk", CodePrefix: "63000", Region: "Tây Nguyên", Zone: 2},
		{Province: "Gia Lai", CodePrefix: "60000", Region: "Tây Nguyên", Zone: 2},
		{Province: "Kon Tum", CodePrefix: "58000", Region: "Tây Nguyên", Zone: 2},
		{Province: "Đắk Nông", CodePrefix: "64000", Region: "Tây Nguyên", Zone: 2},
		{Province: "Lào Cai", CodePrefix: "33000", Region: "Miền Bắc", Zone: 2},
		{Province: "Hà Giang", CodePrefix: "31000", Region: "Miền Bắc", Zone: 2},
		{Province: "Sơn La", CodePrefix: "36000", Region: "Miền Bắc", Zone: 2},
		{Province: "Điện Biên", CodePrefix: "38000", Region: "Miền Bắc", Zone: 2},
		{Province: "Lai Châu", CodePrefix: "39000", Region: "Miền Bắc", Zone: 2},
		{Province: "Cao Bằng", CodePrefix: "27000", Region: "Miền Bắc", Zone: 2},
		{Province: "Lạng Sơn", CodePrefix: "24000", Region: "Miền Bắc", Zone: 2},
	}
}
