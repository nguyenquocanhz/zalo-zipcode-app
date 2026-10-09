package models

// ZipCodeItem đại diện cho một bản ghi mã bưu chính
type ZipCodeItem struct {
	PostalCode string `json:"postalCode"`
	OldCode    string `json:"oldCode,omitempty"`
	Province   string `json:"province"`
	District   string `json:"district"`
	Ward       string `json:"ward,omitempty"`
	Address    string `json:"address,omitempty"`
	PostOffice string `json:"postOffice,omitempty"`
}

// ProvinceZipRange đại diện dải mã bưu chính của 1 tỉnh thành
type ProvinceZipRange struct {
	Province   string `json:"province"`
	CodePrefix string `json:"codePrefix"`
	Region     string `json:"region"`
	Zone       int    `json:"zone"` // 1 hoặc 2 (tương ứng vùng xăng dầu)
}
