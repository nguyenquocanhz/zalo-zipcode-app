/**
 * WrenApp - Dữ liệu Tra cứu Giá Xăng Dầu & Trạm Xăng Việt Nam
 * 
 * Nguồn tham chiếu:
 * - Liên Bộ Công Thương - Tài chính điều hành giá bán lẻ xăng dầu
 * - Tập đoàn Xăng dầu Việt Nam (Petrolimex)
 * - Tổng công ty Dầu Việt Nam (PVOIL)
 * 
 * Phân vùng:
 * - Vùng 1: Các tỉnh/thành phố gần cảng biển, kho đầu mối
 * - Vùng 2: Các tỉnh/thành phố xa kho đầu mối (vùng sâu, hải đảo, miền núi - tối đa +2%)
 */
import gasFeed from "../../gas-price-latest.json";

// Giá, thông tin kỳ và lịch sử lấy từ feed gas-price-latest.json (scripts/gas-updater tự cập nhật),
// được đóng gói vào app làm dữ liệu dự phòng khi không tải được bản mới qua mạng.
export const GAS_UPDATE_INFO = gasFeed.updateInfo;

export const GAS_PRODUCTS = gasFeed.products;

export const ZONE_DEFINITIONS = {
  zone1: {
    name: "Vùng 1 (Giá chuẩn cơ sở)",
    desc: "Khu vực gần cảng biển, kho đầu mối xăng dầu. Giá niêm yết chuẩn.",
    provinces: [
      "Hà Nội", "TP. Hồ Chí Minh", "Hải Phòng", "Quảng Ninh", "Đà Nẵng",
      "Cần Thơ", "Bà Rịa - Vũng Tàu", "Bình Dương", "Đồng Nai", "Khánh Hòa",
      "Thái Bình", "Nam Định", "Hải Dương", "Hưng Yên", "Ninh Bình",
      "Thanh Hóa", "Nghệ An", "Hà Tĩnh", "Quảng Bình", "Quảng Trị", "Thừa Thiên Huế",
      "Quảng Nam", "Quảng Ngãi", "Bình Định", "Phú Yên", "Bình Thuận", "Tây Ninh",
      "Bình Phước", "Long An", "Tiền Giang", "Bến Tre", "Trà Vinh", "Vĩnh Long",
      "Đồng Tháp", "An Giang", "Kiên Giang", "Hậu Giang", "Sóc Trăng", "Bạc Liêu", "Cà Mau"
    ]
  },
  zone2: {
    name: "Vùng 2 (Vùng xa / Hải đảo)",
    desc: "Khu vực miền núi, vùng sâu, hải đảo xa kho đầu mối. Giá cộng thêm tối đa 2%.",
    provinces: [
      "Hà Giang", "Cao Bằng", "Bắc Kạn", "Lạng Sơn", "Tuyên Quang", "Lào Cai",
      "Yên Bái", "Thái Nguyên", "Bắc Giang", "Phú Thọ", "Vĩnh Phúc", "Bắc Ninh",
      "Điện Biên", "Lai Châu", "Sơn La", "Hòa Bình", "Kon Tum", "Gia Lai",
      "Đắk Lắk", "Đắk Nông", "Lâm Đồng", "Ninh Thuận",
      "Huyện đảo Phú Quốc (Kiên Giang)", "Huyện đảo Côn Đảo (Bà Rịa - Vũng Tàu)",
      "Huyện đảo Lý Sơn (Quảng Ngãi)", "Huyện đảo Phú Quý (Bình Thuận)",
      "Huyện đảo Cát Hải, Bạch Long Vĩ (Hải Phòng)", "Huyện đảo Vân Đồn, Cô Tô (Quảng Ninh)"
    ]
  }
};

export const GAS_PRICE_HISTORY = gasFeed.history || [];

export const VEHICLE_MODELS = [
  /* Xe máy */
  { id: "wave_alpha", name: "Honda Wave Alpha / RSX / Blade", category: "motorbike", tankCapacity: 3.7, recommendedFuel: "e5_ron92", fuelConsumption: 1.6 },
  { id: "vision", name: "Honda Vision", category: "motorbike", tankCapacity: 5.2, recommendedFuel: "ron95_3", fuelConsumption: 1.8 },
  { id: "lead", name: "Honda Lead 125", category: "motorbike", tankCapacity: 6.0, recommendedFuel: "ron95_3", fuelConsumption: 2.1 },
  { id: "airblade", name: "Honda Air Blade 125/160", category: "motorbike", tankCapacity: 4.4, recommendedFuel: "ron95_3", fuelConsumption: 2.2 },
  { id: "sh125_160", name: "Honda SH 125i / 160i", category: "motorbike", tankCapacity: 7.8, recommendedFuel: "ron95_3", fuelConsumption: 2.4 },
  { id: "sh_mode", name: "Honda SH Mode", category: "motorbike", tankCapacity: 5.5, recommendedFuel: "ron95_3", fuelConsumption: 2.0 },
  { id: "winner_x", name: "Honda Winner X", category: "motorbike", tankCapacity: 4.5, recommendedFuel: "ron95_3", fuelConsumption: 2.0 },
  { id: "exciter", name: "Yamaha Exciter 155 VVA", category: "motorbike", tankCapacity: 5.4, recommendedFuel: "ron95_3", fuelConsumption: 2.1 },
  { id: "grande", name: "Yamaha Grande Hybrid", category: "motorbike", tankCapacity: 4.0, recommendedFuel: "ron95_3", fuelConsumption: 1.5 },
  { id: "sirius", name: "Yamaha Sirius", category: "motorbike", tankCapacity: 3.8, recommendedFuel: "e5_ron92", fuelConsumption: 1.6 },
  { id: "vespa", name: "Vespa Sprint / Primavera", category: "motorbike", tankCapacity: 7.5, recommendedFuel: "ron95_5", fuelConsumption: 2.7 },

  /* Ô tô */
  { id: "vios", name: "Toyota Vios", category: "car", tankCapacity: 42.0, recommendedFuel: "ron95_3", fuelConsumption: 5.8 },
  { id: "accent", name: "Hyundai Accent", category: "car", tankCapacity: 45.0, recommendedFuel: "ron95_3", fuelConsumption: 6.0 },
  { id: "xpander", name: "Mitsubishi Xpander", category: "car", tankCapacity: 45.0, recommendedFuel: "ron95_3", fuelConsumption: 6.9 },
  { id: "mazda3", name: "Mazda 3", category: "car", tankCapacity: 51.0, recommendedFuel: "ron95_3", fuelConsumption: 6.3 },
  { id: "cx5", name: "Mazda CX-5", category: "car", tankCapacity: 56.0, recommendedFuel: "ron95_3", fuelConsumption: 7.2 },
  { id: "crv", name: "Honda CR-V", category: "car", tankCapacity: 53.0, recommendedFuel: "ron95_3", fuelConsumption: 7.5 },
  { id: "seltos", name: "Kia Seltos", category: "car", tankCapacity: 50.0, recommendedFuel: "ron95_3", fuelConsumption: 6.8 },
  { id: "santafe_d", name: "Hyundai Santa Fe (Dầu)", category: "car", tankCapacity: 71.0, recommendedFuel: "diesel_2", fuelConsumption: 7.0 },
  { id: "fortuner_d", name: "Toyota Fortuner (Dầu)", category: "car", tankCapacity: 80.0, recommendedFuel: "diesel_2", fuelConsumption: 8.2 },
  { id: "ranger_d", name: "Ford Ranger (Dầu)", category: "car", tankCapacity: 80.0, recommendedFuel: "diesel_2", fuelConsumption: 8.5 },
  { id: "carnival_d", name: "Kia Carnival (Dầu)", category: "car", tankCapacity: 72.0, recommendedFuel: "diesel_2", fuelConsumption: 7.8 },
];

export const GAS_STATIONS = [
  /* TP. HỒ CHÍ MINH */
  {
    id: "comeco_hcm_01",
    brand: "Comeco",
    name: "Cửa hàng Xăng dầu Comeco Số 3 - Hàng Xanh",
    province: "TP. Hồ Chí Minh",
    district: "Bình Thạnh",
    address: "178/9M Điện Biên Phủ, Phường 21, Q. Bình Thạnh, TP. Hồ Chí Minh",
    phone: "028.3899.2345",
    lat: 10.7995,
    lng: 106.7118,
    fuels: ["RON 95-V", "RON 95-III", "E5 RON 92", "DO 0.05S"],
    services: ["Chuyển khoản VietQR", "Quét mã ZaloPay / MoMo", "Cà thẻ POS / Thẻ tín dụng"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },
  {
    id: "comeco_hcm_02",
    brand: "Comeco",
    name: "Cửa hàng Xăng dầu Comeco Số 17 - Lê Trọng Tấn",
    province: "TP. Hồ Chí Minh",
    district: "Tân Phú",
    address: "539 Lê Trọng Tấn, P. Sơn Kỳ, Q. Tân Phú, TP. Hồ Chí Minh",
    phone: "028.3816.5432",
    lat: 10.8142,
    lng: 106.6189,
    fuels: ["RON 95-III", "E5 RON 92", "DO 0.05S"],
    services: ["Chuyển khoản VietQR", "Quét mã ZaloPay", "Cà thẻ POS"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },
  {
    id: "comeco_hcm_03",
    brand: "Comeco",
    name: "Cửa hàng Xăng dầu Comeco Số 7 - Lê Quang Sung",
    province: "TP. Hồ Chí Minh",
    district: "Quận 6",
    address: "49C Lê Quang Sung, Phường 2, Quận 6, TP. Hồ Chí Minh",
    phone: "028.3855.6789",
    lat: 10.7512,
    lng: 106.6548,
    fuels: ["RON 95-III", "E5 RON 92", "DO 0.05S"],
    services: ["Chuyển khoản VietQR", "Quét mã ZaloPay", "Cà thẻ POS"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },
  {
    id: "petro_hcm_01",
    brand: "Petrolimex",
    name: "Cửa hàng Xăng dầu Số 01 - Hai Bà Trưng",
    province: "TP. Hồ Chí Minh",
    district: "Quận 1",
    address: "Số 136 Hai Bà Trưng, P. Đa Kao, Quận 1, TP. Hồ Chí Minh",
    phone: "028.3822.4567",
    lat: 10.7871,
    lng: 106.6978,
    fuels: ["RON 95-V", "RON 95-III", "E5 RON 92", "DO 0.001S-V", "DO 0.05S"],
    services: ["Chuyển khoản VietQR / ZaloPay", "Cà thẻ Visa / Master / Napas", "Trạm sạc xe điện"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },
  {
    id: "petro_hcm_02",
    brand: "Petrolimex",
    name: "Cửa hàng Xăng dầu Số 03 - Lê Quang Sung",
    province: "TP. Hồ Chí Minh",
    district: "Quận 6",
    address: "Số 280 Lê Quang Sung, Phường 6, Quận 6, TP. Hồ Chí Minh",
    phone: "028.3960.3344",
    lat: 10.7523,
    lng: 106.6512,
    fuels: ["RON 95-III", "E5 RON 92", "DO 0.05S"],
    services: ["Chuyển khoản VietQR", "Quét mã ZaloPay", "Cửa hàng tiện ích"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },
  {
    id: "pvoil_hcm_01",
    brand: "PVOIL",
    name: "Cửa hàng Xăng dầu PVOIL Phú Nhuận",
    province: "TP. Hồ Chí Minh",
    district: "Phú Nhuận",
    address: "Số 140 Phan Đăng Lưu, Phường 3, Q. Phú Nhuận, TP. Hồ Chí Minh",
    phone: "028.3995.1234",
    lat: 10.8012,
    lng: 106.6854,
    fuels: ["RON 95-III", "E5 RON 92", "DO 0.05S"],
    services: ["PVOIL Easy", "Chuyển khoản VietQR", "Quét mã QR ZaloPay", "Cà thẻ POS"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },

  /* TP. HỒ CHÍ MINH - KHU VỰC QUẬN BÌNH TÂN (CỨU HỘ HẾT XĂNG KHẨN CẤP) */
  {
    id: "petro_binhtan_01",
    brand: "Petrolimex",
    name: "Cửa hàng Xăng dầu Số 14 - Kinh Dương Vương (Bình Tân)",
    province: "TP. Hồ Chí Minh",
    district: "Bình Tân",
    address: "Số 440 Kinh Dương Vương, P. An Lạc, Quận Bình Tân, TP. Hồ Chí Minh",
    phone: "028.3875.1234",
    lat: 10.7428,
    lng: 106.6172,
    fuels: ["RON 95-V", "RON 95-III", "E5 RON 92", "DO 0.05S"],
    services: ["Chuyển khoản VietQR", "Quét mã ZaloPay", "Cà thẻ POS", "Cửa hàng tiện lợi"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },
  {
    id: "petro_binhtan_03",
    brand: "Petrolimex",
    name: "Cửa hàng Xăng dầu Tên Lửa - Khu Tên Lửa (Bình Tân)",
    province: "TP. Hồ Chí Minh",
    district: "Bình Tân",
    address: "Số 121 Đường Số 7, P. Bình Trị Đông B, Quận Bình Tân, TP. Hồ Chí Minh",
    phone: "028.3751.5678",
    lat: 10.7588,
    lng: 106.6135,
    fuels: ["RON 95-III", "E5 RON 92", "DO 0.05S"],
    services: ["Chuyển khoản VietQR", "Quét mã ZaloPay / MoMo", "Cà thẻ POS"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },
  {
    id: "pvoil_binhtan_01",
    brand: "PVOIL",
    name: "Cửa hàng Xăng dầu PVOIL Lê Văn Quới (Bình Tân)",
    province: "TP. Hồ Chí Minh",
    district: "Bình Tân",
    address: "Số 279 Lê Văn Quới, P. Bình Trị Đông, Quận Bình Tân, TP. Hồ Chí Minh",
    phone: "028.3978.8999",
    lat: 10.7715,
    lng: 106.6162,
    fuels: ["RON 95-III", "E5 RON 92", "DO 0.05S"],
    services: ["PVOIL Easy", "Chuyển khoản VietQR", "Quét mã ZaloPay", "Cà thẻ POS"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },
  {
    id: "petro_binhtan_04",
    brand: "Petrolimex",
    name: "Cửa hàng Xăng dầu Petrolimex Hương Lộ 2 (Bình Tân)",
    province: "TP. Hồ Chí Minh",
    district: "Bình Tân",
    address: "Số 512 Hương Lộ 2, P. Bình Trị Đông A, Quận Bình Tân, TP. Hồ Chí Minh",
    phone: "028.3877.2345",
    lat: 10.7645,
    lng: 106.6021,
    fuels: ["RON 95-III", "E5 RON 92", "DO 0.05S"],
    services: ["Chuyển khoản VietQR", "Quét mã ZaloPay", "Cửa hàng Pmart"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },
  {
    id: "petro_binhtan_02",
    brand: "Petrolimex",
    name: "Cửa hàng Xăng dầu Số 39 - Quốc Lộ 1A (Bình Tân)",
    province: "TP. Hồ Chí Minh",
    district: "Bình Tân",
    address: "Số 528 Quốc Lộ 1A, P. Bình Hưng Hòa B, Quận Bình Tân, TP. Hồ Chí Minh",
    phone: "028.3750.6789",
    lat: 10.7925,
    lng: 106.5925,
    fuels: ["RON 95-V", "RON 95-III", "E5 RON 92", "DO 0.001S-V", "DO 0.05S"],
    services: ["Chuyển khoản VietQR", "Cà thẻ POS", "Trạm dừng nghỉ xe tải xe khách"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },
  {
    id: "petro_binhtan_05",
    brand: "Petrolimex",
    name: "Cửa hàng Xăng dầu Tân Kỳ Tân Quý (Bình Tân)",
    province: "TP. Hồ Chí Minh",
    district: "Bình Tân",
    address: "Số 620 Tân Kỳ Tân Quý, P. Bình Hưng Hòa, Quận Bình Tân, TP. Hồ Chí Minh",
    phone: "028.3765.4321",
    lat: 10.8035,
    lng: 106.6042,
    fuels: ["RON 95-III", "E5 RON 92", "DO 0.05S"],
    services: ["Chuyển khoản VietQR", "Quét mã ZaloPay", "Cà thẻ POS"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },

  /* HÀ NỘI */
  {
    id: "petro_hn_01",
    brand: "Petrolimex",
    name: "Cửa hàng Xăng dầu Số 1 - Trần Quang Khải",
    province: "Hà Nội",
    district: "Hoàn Kiếm",
    address: "Số 1 Trần Quang Khải, P. Tràng Tiền, Q. Hoàn Kiếm, Hà Nội",
    phone: "024.3825.2678",
    lat: 21.0265,
    lng: 105.8570,
    fuels: ["RON 95-V", "RON 95-III", "E5 RON 92", "DO 0.001S-V", "DO 0.05S"],
    services: ["Chuyển khoản VietQR / ZaloPay", "Cà thẻ POS / Napas", "Cửa hàng tiện lợi", "Rửa xe"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },
  {
    id: "petro_hn_02",
    brand: "Petrolimex",
    name: "Cửa hàng Xăng dầu Số 19 - Nguyễn Trãi",
    province: "Hà Nội",
    district: "Thanh Xuân",
    address: "Số 326 Nguyễn Trãi, P. Thanh Xuân Trung, Q. Thanh Xuân, Hà Nội",
    phone: "024.3858.4231",
    lat: 20.9982,
    lng: 105.8078,
    fuels: ["RON 95-V", "RON 95-III", "E5 RON 92", "DO 0.05S"],
    services: ["Chuyển khoản VietQR", "Quét mã ZaloPay", "Cà thẻ POS", "Cửa hàng Pmart"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },
  {
    id: "petro_hn_03",
    brand: "Petrolimex",
    name: "Cửa hàng Xăng dầu Số 34 - Cầu Giấy",
    province: "Hà Nội",
    district: "Cầu Giấy",
    address: "Số 171 Xuân Thủy, P. Dịch Vọng Hậu, Q. Cầu Giấy, Hà Nội",
    phone: "024.3768.1254",
    lat: 21.0368,
    lng: 105.7831,
    fuels: ["RON 95-III", "E5 RON 92", "DO 0.05S"],
    services: ["Chuyển khoản VietQR", "Quét mã QR ZaloPay", "Cửa hàng tiện lợi"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },
  {
    id: "pvoil_hn_01",
    brand: "PVOIL",
    name: "Cửa hàng Xăng dầu PVOIL Thái Thịnh",
    province: "Hà Nội",
    district: "Đống Đa",
    address: "Số 92 Thái Thịnh, P. Thịnh Quang, Q. Đống Đa, Hà Nội",
    phone: "024.3562.7788",
    lat: 21.0118,
    lng: 105.8192,
    fuels: ["RON 95-III", "E5 RON 92", "DO 0.05S"],
    services: ["PVOIL Easy", "Chuyển khoản VietQR", "Quét mã QR ZaloPay", "Cà thẻ POS"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },

  /* ĐÀ NẴNG, CẦN THƠ, HẢI PHÒNG */
  {
    id: "petro_dn_01",
    brand: "Petrolimex",
    name: "Cửa hàng Xăng dầu Số 02 - Nguyễn Tri Phương",
    province: "Đà Nẵng",
    district: "Hải Châu",
    address: "Số 120 Nguyễn Tri Phương, P. Chính Gián, Q. Thanh Khê, Đà Nẵng",
    phone: "0236.382.4455",
    lat: 16.0592,
    lng: 108.2045,
    fuels: ["RON 95-III", "E5 RON 92", "DO 0.05S"],
    services: ["Chuyển khoản VietQR", "Quét mã ZaloPay", "Cà thẻ POS"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },
  {
    id: "petro_ct_01",
    brand: "Petrolimex",
    name: "Cửa hàng Xăng dầu Số 01 - 30 Tháng 4",
    province: "Cần Thơ",
    district: "Ninh Kiều",
    address: "Số 12 đại lộ 30 Tháng 4, P. An Phú, Q. Ninh Kiều, Cần Thơ",
    phone: "0292.382.1122",
    lat: 10.0315,
    lng: 105.7782,
    fuels: ["RON 95-III", "E5 RON 92", "DO 0.05S"],
    services: ["Chuyển khoản VietQR", "Quét mã ZaloPay", "Cà thẻ POS"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },
  {
    id: "petro_hp_01",
    brand: "Petrolimex",
    name: "Cửa hàng Xăng dầu Số 05 - Lê Thánh Tông",
    province: "Hải Phòng",
    district: "Ngô Quyền",
    address: "Số 88 Lê Thánh Tông, P. Máy Chai, Q. Ngô Quyền, Hải Phòng",
    phone: "0225.385.6789",
    lat: 20.8651,
    lng: 106.6942,
    fuels: ["RON 95-V", "RON 95-III", "E5 RON 92", "DO 0.05S"],
    services: ["Chuyển khoản VietQR", "Quét mã ZaloPay", "Cà thẻ POS"],
    open247: true,
    hasBankTransfer: true,
    hasQrPayment: true,
    hasCardPos: true,
  },
];

/**
 * Tính khoảng cách trắc địa chính xác giữa 2 tọa độ GPS (Chuẩn WGS-84 / Haversine IUGG)
 * Tham chiếu trắc địa từ viet-thanh.vn:
 * - Bán kính Trái Đất chuẩn IUGG: R = 6.371.008,8 mét
 * - Trả về:
 *   + meters: Số mét nguyên chính xác (vd: 180, 350, 1250)
 *   + km: Số km thập phân (vd: 0.18, 0.35, 1.25)
 *   + text: Hiển thị thân thiện theo cự ly thực tế ("180 m" nếu < 1km, "1.2 km" nếu >= 1km)
 *   + walkingMinutes: Ước lượng thời gian dắt bộ xe máy (tốc độ dắt bộ trung bình 4 km/h ~ 67 m/phút)
 */
export function calculatePreciseDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371008.8; // Bán kính trung bình Trái Đất theo chuẩn trắc địa IUGG (mét)
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) *
      Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const meters = Math.round(R * c);
  const km = Number((meters / 1000).toFixed(2));
  const text = meters < 1000 ? `${meters} m` : `${(meters / 1000).toFixed(1)} km`;
  const walkingMinutes = Math.max(1, Math.round(meters / 67)); // 4 km/h

  return { meters, km, text, walkingMinutes };
}

/**
 * Tính khoảng cách (đơn vị km) phục vụ sắp xếp và tương thích ngược
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const res = calculatePreciseDistance(lat1, lon1, lat2, lon2);
  return res ? res.km : null;
}

/**
 * Định dạng số tiền sang định dạng VNĐ (ví dụ: 20370 -> "20.370 ₫")
 */
export function formatMoney(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return "0 ₫";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(Math.round(amount));
}

/**
 * Định dạng số lít (ví dụ: 4.542 -> "4.54 L")
 */
export function formatLiter(liters) {
  if (liters === undefined || liters === null || isNaN(liters)) return "0.00 L";
  return `${Number(liters).toFixed(2)} Lít`;
}
