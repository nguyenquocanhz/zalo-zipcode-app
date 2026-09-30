// Dữ liệu toàn diện 63 Tỉnh/Thành phố Việt Nam
// Kết hợp:
// 1. Mã 5 số mới theo Quyết định 2474/QĐ-BTTTT của Bộ Thông tin & Truyền thông
// 2. Mã 6 số cũ / quốc tế cho các nền tảng PayPal, Amazon, Apple ID, Stripe
// 3. Tiền tố 2 số đầu & ghi chú sáp nhập (theo phương án ĐVHC / QĐ 2334/2025)
// 4. Danh sách đầy đủ Quận / Huyện / Thị xã / Thị trấn trọng điểm của từng tỉnh thành
// 5. Dữ liệu chi tiết Phường / Xã trọng điểm của các đô thị lớn

export const VN_PROVINCES = [
  {
    "id": "hanoi",
    "name": "TP. Hà Nội",
    "codes": [
      "10",
      "11",
      "12",
      "13",
      "14"
    ],
    "code5": "10000",
    "code6": "100000",
    "note": "Thủ đô - Giữ nguyên",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu cục TT Hà Nội - 75 Đinh Tiên Hoàng, Q. Hoàn Kiếm",
    "searchKey": "ha noi hn hanoi thu do",
    "districts": [
      {
        "name": "Quận Ba Đình",
        "code5": "11100",
        "code6": "118000",
        "wards": [
          {
            "name": "P. Cống Vị",
            "code5": "11108",
            "code6": "118100"
          },
          {
            "name": "P. Điện Biên",
            "code5": "11117",
            "code6": "118200"
          },
          {
            "name": "P. Đội Cấn",
            "code5": "11111",
            "code6": "118300"
          },
          {
            "name": "P. Giảng Võ",
            "code5": "11115",
            "code6": "118400"
          },
          {
            "name": "P. Kim Mã",
            "code5": "11113",
            "code6": "118500"
          },
          {
            "name": "P. Liễu Giai",
            "code5": "11109",
            "code6": "118600"
          },
          {
            "name": "P. Ngọc Hà",
            "code5": "11110",
            "code6": "118700"
          },
          {
            "name": "P. Ngọc Khánh",
            "code5": "11114",
            "code6": "118800"
          },
          {
            "name": "P. Nguyễn Trung Trực",
            "code5": "11106",
            "code6": "118900"
          },
          {
            "name": "P. Phúc Xá",
            "code5": "11105",
            "code6": "118010"
          },
          {
            "name": "P. Quán Thánh",
            "code5": "11107",
            "code6": "118020"
          },
          {
            "name": "P. Thành Công",
            "code5": "11116",
            "code6": "118030"
          },
          {
            "name": "P. Trúc Bạch",
            "code5": "11118",
            "code6": "118040"
          },
          {
            "name": "P. Vĩnh Phúc",
            "code5": "11119",
            "code6": "118050"
          }
        ]
      },
      {
        "name": "Quận Hoàn Kiếm",
        "code5": "11000",
        "code6": "110000",
        "wards": [
          {
            "name": "P. Chương Dương",
            "code5": "11018",
            "code6": "110100"
          },
          {
            "name": "P. Cửa Đông",
            "code5": "11006",
            "code6": "110200"
          },
          {
            "name": "P. Cửa Nam",
            "code5": "11015",
            "code6": "110300"
          },
          {
            "name": "P. Đồng Xuân",
            "code5": "11007",
            "code6": "110400"
          },
          {
            "name": "P. Hàng Bạc",
            "code5": "11009",
            "code6": "110500"
          },
          {
            "name": "P. Hàng Bài",
            "code5": "11013",
            "code6": "110600"
          },
          {
            "name": "P. Hàng Bồ",
            "code5": "11008",
            "code6": "110700"
          },
          {
            "name": "P. Hàng Bông",
            "code5": "11016",
            "code6": "110800"
          },
          {
            "name": "P. Hàng Buồm",
            "code5": "11010",
            "code6": "110900"
          },
          {
            "name": "P. Hàng Đào",
            "code5": "11011",
            "code6": "110010"
          },
          {
            "name": "P. Hàng Gai",
            "code5": "11012",
            "code6": "110020"
          },
          {
            "name": "P. Hàng Mã",
            "code5": "11017",
            "code6": "110030"
          },
          {
            "name": "P. Hàng Trống",
            "code5": "11014",
            "code6": "110040"
          },
          {
            "name": "P. Lý Thái Tổ",
            "code5": "11019",
            "code6": "110050"
          },
          {
            "name": "P. Phan Chu Trinh",
            "code5": "11020",
            "code6": "110060"
          },
          {
            "name": "P. Phúc Tân",
            "code5": "11021",
            "code6": "110070"
          },
          {
            "name": "P. Tràng Tiền",
            "code5": "11022",
            "code6": "110080"
          },
          {
            "name": "P. Trần Hưng Đạo",
            "code5": "11023",
            "code6": "110090"
          }
        ]
      },
      {
        "name": "Quận Tây Hồ",
        "code5": "12400",
        "code6": "124000",
        "wards": [
          {
            "name": "P. Bưởi",
            "code5": "12406",
            "code6": "124100"
          },
          {
            "name": "P. Nhật Tân",
            "code5": "12407",
            "code6": "124200"
          },
          {
            "name": "P. Phú Thượng",
            "code5": "12408",
            "code6": "124300"
          },
          {
            "name": "P. Quảng An",
            "code5": "12409",
            "code6": "124400"
          },
          {
            "name": "P. Thụy Khuê",
            "code5": "12410",
            "code6": "124500"
          },
          {
            "name": "P. Tứ Liên",
            "code5": "12411",
            "code6": "124600"
          },
          {
            "name": "P. Xuân La",
            "code5": "12412",
            "code6": "124700"
          },
          {
            "name": "P. Yên Phụ",
            "code5": "12413",
            "code6": "124800"
          }
        ]
      },
      {
        "name": "Quận Long Biên",
        "code5": "14000",
        "code6": "140000",
        "wards": [
          {
            "name": "P. Bồ Đề",
            "code5": "14006",
            "code6": "140100"
          },
          {
            "name": "P. Gia Thụy",
            "code5": "14009",
            "code6": "140200"
          },
          {
            "name": "P. Long Biên",
            "code5": "14011",
            "code6": "140300"
          },
          {
            "name": "P. Ngọc Lâm",
            "code5": "14012",
            "code6": "140400"
          },
          {
            "name": "P. Ngọc Thụy",
            "code5": "14013",
            "code6": "140500"
          },
          {
            "name": "P. Sài Đồng",
            "code5": "14016",
            "code6": "140600"
          },
          {
            "name": "P. Thạch Bàn",
            "code5": "14017",
            "code6": "140700"
          },
          {
            "name": "P. Thượng Thanh",
            "code5": "14018",
            "code6": "140800"
          },
          {
            "name": "P. Việt Hưng",
            "code5": "14019",
            "code6": "140900"
          }
        ]
      },
      {
        "name": "Quận Cầu Giấy",
        "code5": "12200",
        "code6": "122000",
        "wards": [
          {
            "name": "P. Dịch Vọng",
            "code5": "12206",
            "code6": "122100"
          },
          {
            "name": "P. Dịch Vọng Hậu",
            "code5": "12207",
            "code6": "122200"
          },
          {
            "name": "P. Mai Dịch",
            "code5": "12208",
            "code6": "122300"
          },
          {
            "name": "P. Nghĩa Đô",
            "code5": "12209",
            "code6": "122400"
          },
          {
            "name": "P. Nghĩa Tân",
            "code5": "12210",
            "code6": "122500"
          },
          {
            "name": "P. Quan Hoa",
            "code5": "12211",
            "code6": "122600"
          },
          {
            "name": "P. Trung Hòa",
            "code5": "12212",
            "code6": "122700"
          },
          {
            "name": "P. Yên Hòa",
            "code5": "12213",
            "code6": "122800"
          }
        ]
      },
      {
        "name": "Quận Đống Đa",
        "code5": "11500",
        "code6": "115000",
        "wards": [
          {
            "name": "P. Cát Linh",
            "code5": "11506",
            "code6": "115100"
          },
          {
            "name": "P. Hàng Bột",
            "code5": "11507",
            "code6": "115200"
          },
          {
            "name": "P. Khâm Thiên",
            "code5": "11508",
            "code6": "115300"
          },
          {
            "name": "P. Khương Thượng",
            "code5": "11509",
            "code6": "115400"
          },
          {
            "name": "P. Kim Liên",
            "code5": "11510",
            "code6": "115500"
          },
          {
            "name": "P. Láng Hạ",
            "code5": "11511",
            "code6": "115600"
          },
          {
            "name": "P. Láng Thượng",
            "code5": "11512",
            "code6": "115700"
          },
          {
            "name": "P. Nam Đồng",
            "code5": "11513",
            "code6": "115800"
          },
          {
            "name": "P. Ô Chợ Dừa",
            "code5": "11514",
            "code6": "115900"
          },
          {
            "name": "P. Phương Liên",
            "code5": "11515",
            "code6": "115010"
          },
          {
            "name": "P. Phương Mai",
            "code5": "11516",
            "code6": "115020"
          },
          {
            "name": "P. Quang Trung",
            "code5": "11517",
            "code6": "115030"
          },
          {
            "name": "P. Quốc Tử Giám",
            "code5": "11518",
            "code6": "115040"
          },
          {
            "name": "P. Thịnh Quang",
            "code5": "11519",
            "code6": "115050"
          },
          {
            "name": "P. Trung Liệt",
            "code5": "11521",
            "code6": "115060"
          },
          {
            "name": "P. Văn Miếu",
            "code5": "11525",
            "code6": "115070"
          }
        ]
      },
      {
        "name": "Quận Hai Bà Trưng",
        "code5": "11200",
        "code6": "116000",
        "wards": [
          {
            "name": "P. Bách Khoa",
            "code5": "11206",
            "code6": "116100"
          },
          {
            "name": "P. Bạch Đằng",
            "code5": "11207",
            "code6": "116200"
          },
          {
            "name": "P. Bạch Mai",
            "code5": "11208",
            "code6": "116300"
          },
          {
            "name": "P. Cầu Dền",
            "code5": "11209",
            "code6": "116400"
          },
          {
            "name": "P. Đồng Tâm",
            "code5": "11212",
            "code6": "116500"
          },
          {
            "name": "P. Lê Đại Hành",
            "code5": "11213",
            "code6": "116600"
          },
          {
            "name": "P. Minh Khai",
            "code5": "11214",
            "code6": "116700"
          },
          {
            "name": "P. Phố Huế",
            "code5": "11217",
            "code6": "116800"
          },
          {
            "name": "P. Thanh Nhàn",
            "code5": "11221",
            "code6": "116900"
          },
          {
            "name": "P. Trương Định",
            "code5": "11222",
            "code6": "116010"
          },
          {
            "name": "P. Vĩnh Tuy",
            "code5": "11223",
            "code6": "116020"
          }
        ]
      },
      {
        "name": "Quận Hoàng Mai",
        "code5": "12700",
        "code6": "127000",
        "wards": [
          {
            "name": "P. Đại Kim",
            "code5": "12706",
            "code6": "127100"
          },
          {
            "name": "P. Định Công",
            "code5": "12707",
            "code6": "127200"
          },
          {
            "name": "P. Giáp Bát",
            "code5": "12708",
            "code6": "127300"
          },
          {
            "name": "P. Hoàng Liệt",
            "code5": "12709",
            "code6": "127400"
          },
          {
            "name": "P. Lĩnh Nam",
            "code5": "12711",
            "code6": "127500"
          },
          {
            "name": "P. Mai Động",
            "code5": "12712",
            "code6": "127600"
          },
          {
            "name": "P. Tân Mai",
            "code5": "12713",
            "code6": "127700"
          },
          {
            "name": "P. Thịnh Liệt",
            "code5": "12715",
            "code6": "127800"
          },
          {
            "name": "P. Tương Mai",
            "code5": "12717",
            "code6": "127900"
          },
          {
            "name": "P. Yên Sở",
            "code5": "12719",
            "code6": "127010"
          }
        ]
      },
      {
        "name": "Quận Thanh Xuân",
        "code5": "11400",
        "code6": "120000",
        "wards": [
          {
            "name": "P. Hạ Đình",
            "code5": "11406",
            "code6": "120100"
          },
          {
            "name": "P. Khương Đình",
            "code5": "11407",
            "code6": "120200"
          },
          {
            "name": "P. Khương Mai",
            "code5": "11408",
            "code6": "120300"
          },
          {
            "name": "P. Khương Trung",
            "code5": "11409",
            "code6": "120400"
          },
          {
            "name": "P. Kim Giang",
            "code5": "11410",
            "code6": "120500"
          },
          {
            "name": "P. Nhân Chính",
            "code5": "11411",
            "code6": "120600"
          },
          {
            "name": "P. Phương Liệt",
            "code5": "11412",
            "code6": "120700"
          },
          {
            "name": "P. Thanh Xuân Bắc",
            "code5": "11413",
            "code6": "120800"
          },
          {
            "name": "P. Thanh Xuân Nam",
            "code5": "11414",
            "code6": "120900"
          },
          {
            "name": "P. Thanh Xuân Trung",
            "code5": "11415",
            "code6": "120010"
          },
          {
            "name": "P. Thượng Đình",
            "code5": "11416",
            "code6": "120020"
          }
        ]
      },
      {
        "name": "Quận Nam Từ Liêm",
        "code5": "12000",
        "code6": "129000",
        "wards": [
          {
            "name": "P. Cầu Diễn",
            "code5": "12006",
            "code6": "129100"
          },
          {
            "name": "P. Đại Mỗ",
            "code5": "12007",
            "code6": "129200"
          },
          {
            "name": "P. Mễ Trì",
            "code5": "12008",
            "code6": "129300"
          },
          {
            "name": "P. Mỹ Đình 1",
            "code5": "12009",
            "code6": "129400"
          },
          {
            "name": "P. Mỹ Đình 2",
            "code5": "12010",
            "code6": "129500"
          },
          {
            "name": "P. Phú Đô",
            "code5": "12011",
            "code6": "129600"
          },
          {
            "name": "P. Tây Mỗ",
            "code5": "12012",
            "code6": "129700"
          },
          {
            "name": "P. Phương Canh",
            "code5": "12013",
            "code6": "129800"
          },
          {
            "name": "P. Trung Văn",
            "code5": "12014",
            "code6": "129900"
          },
          {
            "name": "P. Xuân Phương",
            "code5": "12015",
            "code6": "129010"
          }
        ]
      },
      {
        "name": "Quận Bắc Từ Liêm",
        "code5": "11900",
        "code6": "129500",
        "wards": [
          {
            "name": "P. Cổ Nhuế 1",
            "code5": "11906",
            "code6": "129510"
          },
          {
            "name": "P. Cổ Nhuế 2",
            "code5": "11907",
            "code6": "129520"
          },
          {
            "name": "P. Đông Ngạc",
            "code5": "11908",
            "code6": "129530"
          },
          {
            "name": "P. Đức Thắng",
            "code5": "11909",
            "code6": "129540"
          },
          {
            "name": "P. Minh Khai",
            "code5": "11911",
            "code6": "129550"
          },
          {
            "name": "P. Phú Diễn",
            "code5": "11912",
            "code6": "129560"
          },
          {
            "name": "P. Phúc Diễn",
            "code5": "11913",
            "code6": "129570"
          },
          {
            "name": "P. Tây Tựu",
            "code5": "11914",
            "code6": "129580"
          },
          {
            "name": "P. Xuân Đỉnh",
            "code5": "11917",
            "code6": "129590"
          },
          {
            "name": "P. Xuân Tảo",
            "code5": "11918",
            "code6": "129600"
          }
        ]
      },
      {
        "name": "Quận Hà Đông",
        "code5": "12100",
        "code6": "150000",
        "wards": [
          {
            "name": "P. Dương Nội",
            "code5": "12108",
            "code6": "150100"
          },
          {
            "name": "P. Hà Cầu",
            "code5": "12109",
            "code6": "150200"
          },
          {
            "name": "P. Kiến Hưng",
            "code5": "12110",
            "code6": "150300"
          },
          {
            "name": "P. La Khê",
            "code5": "12111",
            "code6": "150400"
          },
          {
            "name": "P. Mộ Lao",
            "code5": "12112",
            "code6": "150500"
          },
          {
            "name": "P. Nguyễn Trãi",
            "code5": "12113",
            "code6": "150600"
          },
          {
            "name": "P. Phúc La",
            "code5": "12117",
            "code6": "150700"
          },
          {
            "name": "P. Quang Trung",
            "code5": "12118",
            "code6": "150800"
          },
          {
            "name": "P. Vạn Phúc",
            "code5": "12119",
            "code6": "150900"
          },
          {
            "name": "P. Văn Quán",
            "code5": "12120",
            "code6": "150010"
          },
          {
            "name": "P. Yên Nghĩa",
            "code5": "12121",
            "code6": "150020"
          }
        ]
      },
      {
        "name": "TX. Sơn Tây",
        "code5": "14400",
        "code6": "148000",
        "wards": [
          {
            "name": "P. Lê Lợi",
            "code5": "12701",
            "code6": "127010"
          },
          {
            "name": "P. Quang Trung",
            "code5": "12702",
            "code6": "127020"
          },
          {
            "name": "P. Phú Thịnh",
            "code5": "12703",
            "code6": "127030"
          },
          {
            "name": "P. Ngô Quyền",
            "code5": "12704",
            "code6": "127040"
          },
          {
            "name": "P. Sơn Lộc",
            "code5": "12705",
            "code6": "127050"
          },
          {
            "name": "P. Xuân Khanh",
            "code5": "12706",
            "code6": "127060"
          },
          {
            "name": "P. Trung Hưng",
            "code5": "12707",
            "code6": "127070"
          },
          {
            "name": "P. Viên Sơn",
            "code5": "12708",
            "code6": "127080"
          },
          {
            "name": "P. Trung Sơn Trầm",
            "code5": "12709",
            "code6": "127090"
          },
          {
            "name": "Xã Đường Lâm",
            "code5": "12710",
            "code6": "127100"
          },
          {
            "name": "Xã Thanh Mỹ",
            "code5": "12711",
            "code6": "127110"
          },
          {
            "name": "Xã Cổ Đông",
            "code5": "12712",
            "code6": "127120"
          }
        ]
      },
      {
        "name": "Huyện Ba Vì",
        "code5": "14500",
        "code6": "145000"
      },
      {
        "name": "Huyện Chương Mỹ",
        "code5": "12600",
        "code6": "152000"
      },
      {
        "name": "Huyện Đan Phượng",
        "code5": "13000",
        "code6": "153000"
      },
      {
        "name": "Huyện Đông Anh",
        "code5": "13600",
        "code6": "136000",
        "wards": [
          {
            "name": "TT. Đông Anh",
            "code5": "13601",
            "code6": "136010"
          },
          {
            "name": "Xã Bắc Hồng",
            "code5": "13602",
            "code6": "136020"
          },
          {
            "name": "Xã Cổ Loa",
            "code5": "13603",
            "code6": "136030"
          },
          {
            "name": "Xã Hải Bối",
            "code5": "13604",
            "code6": "136040"
          },
          {
            "name": "Xã Kim Chung",
            "code5": "13605",
            "code6": "136050"
          },
          {
            "name": "Xã Kim Nỗ",
            "code5": "13606",
            "code6": "136060"
          },
          {
            "name": "Xã Mai Lâm",
            "code5": "13607",
            "code6": "136070"
          },
          {
            "name": "Xã Nam Hồng",
            "code5": "13608",
            "code6": "136080"
          },
          {
            "name": "Xã Tiên Dương",
            "code5": "13609",
            "code6": "136090"
          },
          {
            "name": "Xã Uy Nỗ",
            "code5": "13610",
            "code6": "136100"
          },
          {
            "name": "Xã Vĩnh Ngọc",
            "code5": "13611",
            "code6": "136110"
          }
        ]
      },
      {
        "name": "Huyện Gia Lâm",
        "code5": "13100",
        "code6": "131000",
        "wards": [
          {
            "name": "TT. Trâu Quỳ",
            "code5": "13101",
            "code6": "131010"
          },
          {
            "name": "TT. Yên Viên",
            "code5": "13102",
            "code6": "131020"
          },
          {
            "name": "Xã Bát Tràng",
            "code5": "13103",
            "code6": "131030"
          },
          {
            "name": "Xã Cổ Bi",
            "code5": "13104",
            "code6": "131040"
          },
          {
            "name": "Xã Đa Tốn",
            "code5": "13105",
            "code6": "131050"
          },
          {
            "name": "Xã Đặng Xá",
            "code5": "13106",
            "code6": "131060"
          },
          {
            "name": "Xã Ninh Hiệp",
            "code5": "13107",
            "code6": "131070"
          },
          {
            "name": "Xã Phù Đổng",
            "code5": "13108",
            "code6": "131080"
          },
          {
            "name": "Xã Phú Thị",
            "code5": "13109",
            "code6": "131090"
          },
          {
            "name": "Xã Dương Xá",
            "code5": "13110",
            "code6": "131100"
          }
        ]
      },
      {
        "name": "Huyện Hoài Đức",
        "code5": "13300",
        "code6": "157000",
        "wards": [
          {
            "name": "TT. Trạm Trôi",
            "code5": "13201",
            "code6": "132010"
          },
          {
            "name": "Xã An Khánh",
            "code5": "13202",
            "code6": "132020"
          },
          {
            "name": "Xã An Thượng",
            "code5": "13203",
            "code6": "132030"
          },
          {
            "name": "Xã Cát Quế",
            "code5": "13204",
            "code6": "132040"
          },
          {
            "name": "Xã Di Trạch",
            "code5": "13205",
            "code6": "132050"
          },
          {
            "name": "Xã Kim Chung",
            "code5": "13206",
            "code6": "132060"
          },
          {
            "name": "Xã La Phù",
            "code5": "13207",
            "code6": "132070"
          },
          {
            "name": "Xã Song Phương",
            "code5": "13208",
            "code6": "132080"
          },
          {
            "name": "Xã Vân Canh",
            "code5": "13209",
            "code6": "132090"
          }
        ]
      },
      {
        "name": "Huyện Mê Linh",
        "code5": "13200",
        "code6": "155000"
      },
      {
        "name": "Huyện Mỹ Đức",
        "code5": "12800",
        "code6": "156000"
      },
      {
        "name": "Huyện Phú Xuyên",
        "code5": "12900",
        "code6": "165000"
      },
      {
        "name": "Huyện Phúc Thọ",
        "code5": "14300",
        "code6": "143000"
      },
      {
        "name": "Huyện Quốc Oai",
        "code5": "14100",
        "code6": "154000"
      },
      {
        "name": "Huyện Sóc Sơn",
        "code5": "13400",
        "code6": "134000"
      },
      {
        "name": "Huyện Thạch Thất",
        "code5": "14200",
        "code6": "142000"
      },
      {
        "name": "Huyện Thanh Oai",
        "code5": "12300",
        "code6": "152000"
      },
      {
        "name": "Huyện Thanh Trì",
        "code5": "12500",
        "code6": "125000",
        "wards": [
          {
            "name": "TT. Văn Điển",
            "code5": "12501",
            "code6": "125010"
          },
          {
            "name": "Xã Đại Áng",
            "code5": "12502",
            "code6": "125020"
          },
          {
            "name": "Xã Ngọc Hồi",
            "code5": "12503",
            "code6": "125030"
          },
          {
            "name": "Xã Ngũ Hiệp",
            "code5": "12504",
            "code6": "125040"
          },
          {
            "name": "Xã Tả Thanh Oai",
            "code5": "12505",
            "code6": "125050"
          },
          {
            "name": "Xã Tân Triều",
            "code5": "12506",
            "code6": "125060"
          },
          {
            "name": "Xã Thanh Liệt",
            "code5": "12507",
            "code6": "125070"
          },
          {
            "name": "Xã Tứ Hiệp",
            "code5": "12508",
            "code6": "125080"
          },
          {
            "name": "Xã Vĩnh Quỳnh",
            "code5": "12509",
            "code6": "125090"
          }
        ]
      },
      {
        "name": "Huyện Thường Tín",
        "code5": "13700",
        "code6": "137000"
      },
      {
        "name": "Huyện Ứng Hòa",
        "code5": "13800",
        "code6": "167000"
      }
    ]
  },
  {
    "id": "hcm",
    "name": "TP. Hồ Chí Minh",
    "codes": [
      "70",
      "71",
      "72",
      "73",
      "74",
      "75",
      "78"
    ],
    "code5": "70000",
    "code6": "700000",
    "note": "TP.HCM - Sáp nhập Bình Dương + Bà Rịa Vũng Tàu",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện TT Sài Gòn - 02 Công xã Paris, P. Bến Nghé, Q.1",
    "searchKey": "tp ho chi minh tphcm hcm sai gon saigon hcmc",
    "districts": [
      {
        "name": "Quận 1",
        "code5": "71000",
        "code6": "710000",
        "wards": [
          {
            "name": "P. Bến Nghé",
            "code5": "71006",
            "code6": "710100"
          },
          {
            "name": "P. Bến Thành",
            "code5": "71009",
            "code6": "710200"
          },
          {
            "name": "P. Cầu Kho",
            "code5": "71014",
            "code6": "710300"
          },
          {
            "name": "P. Cầu Ông Lãnh",
            "code5": "71012",
            "code6": "710400"
          },
          {
            "name": "P. Cô Giang",
            "code5": "71013",
            "code6": "710500"
          },
          {
            "name": "P. Đa Kao",
            "code5": "71008",
            "code6": "710600"
          },
          {
            "name": "P. Nguyễn Cư Trinh",
            "code5": "71015",
            "code6": "710700"
          },
          {
            "name": "P. Nguyễn Thái Bình",
            "code5": "71010",
            "code6": "710800"
          },
          {
            "name": "P. Phạm Ngũ Lão",
            "code5": "71011",
            "code6": "710900"
          },
          {
            "name": "P. Tân Định",
            "code5": "71007",
            "code6": "710010"
          }
        ]
      },
      {
        "name": "Quận 3",
        "code5": "72200",
        "code6": "722000",
        "wards": [
          {
            "name": "P. Võ Thị Sáu",
            "code5": "72206",
            "code6": "722100"
          },
          {
            "name": "Phường 1",
            "code5": "72207",
            "code6": "722200"
          },
          {
            "name": "Phường 2",
            "code5": "72208",
            "code6": "722300"
          },
          {
            "name": "Phường 3",
            "code5": "72209",
            "code6": "722400"
          },
          {
            "name": "Phường 4",
            "code5": "72210",
            "code6": "722500"
          },
          {
            "name": "Phường 5",
            "code5": "72211",
            "code6": "722600"
          },
          {
            "name": "Phường 9",
            "code5": "72212",
            "code6": "722700"
          },
          {
            "name": "Phường 10",
            "code5": "72213",
            "code6": "722800"
          },
          {
            "name": "Phường 11",
            "code5": "72214",
            "code6": "722900"
          },
          {
            "name": "Phường 12",
            "code5": "72215",
            "code6": "722010"
          },
          {
            "name": "Phường 14",
            "code5": "72217",
            "code6": "722020"
          }
        ]
      },
      {
        "name": "Quận 4",
        "code5": "73000",
        "code6": "728000",
        "wards": [
          {
            "name": "Phường 1",
            "code5": "72801",
            "code6": "728010"
          },
          {
            "name": "Phường 2",
            "code5": "72802",
            "code6": "728020"
          },
          {
            "name": "Phường 3",
            "code5": "72803",
            "code6": "728030"
          },
          {
            "name": "Phường 4",
            "code5": "72804",
            "code6": "728040"
          },
          {
            "name": "Phường 6",
            "code5": "72806",
            "code6": "728060"
          },
          {
            "name": "Phường 8",
            "code5": "72808",
            "code6": "728080"
          },
          {
            "name": "Phường 9",
            "code5": "72809",
            "code6": "728090"
          },
          {
            "name": "Phường 10",
            "code5": "72810",
            "code6": "728100"
          },
          {
            "name": "Phường 13",
            "code5": "72813",
            "code6": "728130"
          },
          {
            "name": "Phường 14",
            "code5": "72814",
            "code6": "728140"
          },
          {
            "name": "Phường 15",
            "code5": "72815",
            "code6": "728150"
          },
          {
            "name": "Phường 16",
            "code5": "72816",
            "code6": "728160"
          },
          {
            "name": "Phường 18",
            "code5": "72818",
            "code6": "728180"
          }
        ]
      },
      {
        "name": "Quận 5",
        "code5": "72700",
        "code6": "727000",
        "wards": [
          {
            "name": "Phường 1",
            "code5": "72701",
            "code6": "727010"
          },
          {
            "name": "Phường 2",
            "code5": "72702",
            "code6": "727020"
          },
          {
            "name": "Phường 3",
            "code5": "72703",
            "code6": "727030"
          },
          {
            "name": "Phường 4",
            "code5": "72704",
            "code6": "727040"
          },
          {
            "name": "Phường 5",
            "code5": "72705",
            "code6": "727050"
          },
          {
            "name": "Phường 6",
            "code5": "72706",
            "code6": "727060"
          },
          {
            "name": "Phường 7",
            "code5": "72707",
            "code6": "727070"
          },
          {
            "name": "Phường 8",
            "code5": "72708",
            "code6": "727080"
          },
          {
            "name": "Phường 9",
            "code5": "72709",
            "code6": "727090"
          },
          {
            "name": "Phường 10",
            "code5": "72710",
            "code6": "727100"
          },
          {
            "name": "Phường 11",
            "code5": "72711",
            "code6": "727110"
          },
          {
            "name": "Phường 12",
            "code5": "72712",
            "code6": "727120"
          },
          {
            "name": "Phường 13",
            "code5": "72713",
            "code6": "727130"
          },
          {
            "name": "Phường 14",
            "code5": "72714",
            "code6": "727140"
          }
        ]
      },
      {
        "name": "Quận 6",
        "code5": "73100",
        "code6": "731000",
        "wards": [
          {
            "name": "Phường 1",
            "code5": "73101",
            "code6": "731010"
          },
          {
            "name": "Phường 2",
            "code5": "73102",
            "code6": "731020"
          },
          {
            "name": "Phường 3",
            "code5": "73103",
            "code6": "731030"
          },
          {
            "name": "Phường 4",
            "code5": "73104",
            "code6": "731040"
          },
          {
            "name": "Phường 5",
            "code5": "73105",
            "code6": "731050"
          },
          {
            "name": "Phường 6",
            "code5": "73106",
            "code6": "731060"
          },
          {
            "name": "Phường 7",
            "code5": "73107",
            "code6": "731070"
          },
          {
            "name": "Phường 8",
            "code5": "73108",
            "code6": "731080"
          },
          {
            "name": "Phường 9",
            "code5": "73109",
            "code6": "731090"
          },
          {
            "name": "Phường 10",
            "code5": "73110",
            "code6": "731100"
          },
          {
            "name": "Phường 11",
            "code5": "73111",
            "code6": "731110"
          },
          {
            "name": "Phường 12",
            "code5": "73112",
            "code6": "731120"
          },
          {
            "name": "Phường 13",
            "code5": "73113",
            "code6": "731130"
          },
          {
            "name": "Phường 14",
            "code5": "73114",
            "code6": "731140"
          }
        ]
      },
      {
        "name": "Quận 7",
        "code5": "72900",
        "code6": "729000",
        "wards": [
          {
            "name": "P. Tân Phong (Phú Mỹ Hưng)",
            "code5": "72911",
            "code6": "729100"
          },
          {
            "name": "P. Tân Phú",
            "code5": "72912",
            "code6": "729200"
          },
          {
            "name": "P. Tân Quy",
            "code5": "72913",
            "code6": "729300"
          },
          {
            "name": "P. Tân Kiểng",
            "code5": "72910",
            "code6": "729400"
          },
          {
            "name": "P. Tân Hưng",
            "code5": "72909",
            "code6": "729500"
          },
          {
            "name": "P. Bình Thuận",
            "code5": "72906",
            "code6": "729600"
          },
          {
            "name": "P. Phú Mỹ",
            "code5": "72907",
            "code6": "729700"
          },
          {
            "name": "P. Phú Thuận",
            "code5": "72908",
            "code6": "729800"
          },
          {
            "name": "P. Tân Thuận Đông",
            "code5": "72914",
            "code6": "729900"
          },
          {
            "name": "P. Tân Thuận Tây",
            "code5": "72915",
            "code6": "729010"
          }
        ]
      },
      {
        "name": "Quận 8",
        "code5": "73000",
        "code6": "730000",
        "wards": [
          {
            "name": "Phường 1",
            "code5": "73001",
            "code6": "730010"
          },
          {
            "name": "Phường 2",
            "code5": "73002",
            "code6": "730020"
          },
          {
            "name": "Phường 3",
            "code5": "73003",
            "code6": "730030"
          },
          {
            "name": "Phường 4",
            "code5": "73004",
            "code6": "730040"
          },
          {
            "name": "Phường 5",
            "code5": "73005",
            "code6": "730050"
          },
          {
            "name": "Phường 6",
            "code5": "73006",
            "code6": "730060"
          },
          {
            "name": "Phường 7",
            "code5": "73007",
            "code6": "730070"
          },
          {
            "name": "Phường 8",
            "code5": "73008",
            "code6": "730080"
          },
          {
            "name": "Phường 9",
            "code5": "73009",
            "code6": "730090"
          },
          {
            "name": "Phường 10",
            "code5": "73010",
            "code6": "730100"
          },
          {
            "name": "Phường 11",
            "code5": "73011",
            "code6": "730110"
          },
          {
            "name": "Phường 12",
            "code5": "73012",
            "code6": "730120"
          },
          {
            "name": "Phường 13",
            "code5": "73013",
            "code6": "730130"
          },
          {
            "name": "Phường 14",
            "code5": "73014",
            "code6": "730140"
          },
          {
            "name": "Phường 15",
            "code5": "73015",
            "code6": "730150"
          },
          {
            "name": "Phường 16",
            "code5": "73016",
            "code6": "730160"
          }
        ]
      },
      {
        "name": "Quận 10",
        "code5": "72500",
        "code6": "724000",
        "wards": [
          {
            "name": "Phường 1",
            "code5": "72501",
            "code6": "725010"
          },
          {
            "name": "Phường 2",
            "code5": "72502",
            "code6": "725020"
          },
          {
            "name": "Phường 4",
            "code5": "72504",
            "code6": "725040"
          },
          {
            "name": "Phường 5",
            "code5": "72505",
            "code6": "725050"
          },
          {
            "name": "Phường 6",
            "code5": "72506",
            "code6": "725060"
          },
          {
            "name": "Phường 7",
            "code5": "72507",
            "code6": "725070"
          },
          {
            "name": "Phường 8",
            "code5": "72508",
            "code6": "725080"
          },
          {
            "name": "Phường 9",
            "code5": "72509",
            "code6": "725090"
          },
          {
            "name": "Phường 10",
            "code5": "72510",
            "code6": "725100"
          },
          {
            "name": "Phường 11",
            "code5": "72511",
            "code6": "725110"
          },
          {
            "name": "Phường 12",
            "code5": "72512",
            "code6": "725120"
          },
          {
            "name": "Phường 13",
            "code5": "72513",
            "code6": "725130"
          },
          {
            "name": "Phường 14",
            "code5": "72514",
            "code6": "725140"
          },
          {
            "name": "Phường 15",
            "code5": "72515",
            "code6": "725150"
          }
        ]
      },
      {
        "name": "Quận 11",
        "code5": "72600",
        "code6": "726000",
        "wards": [
          {
            "name": "Phường 1",
            "code5": "72601",
            "code6": "726010"
          },
          {
            "name": "Phường 2",
            "code5": "72602",
            "code6": "726020"
          },
          {
            "name": "Phường 3",
            "code5": "72603",
            "code6": "726030"
          },
          {
            "name": "Phường 4",
            "code5": "72604",
            "code6": "726040"
          },
          {
            "name": "Phường 5",
            "code5": "72605",
            "code6": "726050"
          },
          {
            "name": "Phường 6",
            "code5": "72606",
            "code6": "726060"
          },
          {
            "name": "Phường 7",
            "code5": "72607",
            "code6": "726070"
          },
          {
            "name": "Phường 8",
            "code5": "72608",
            "code6": "726080"
          },
          {
            "name": "Phường 9",
            "code5": "72609",
            "code6": "726090"
          },
          {
            "name": "Phường 10",
            "code5": "72610",
            "code6": "726100"
          },
          {
            "name": "Phường 11",
            "code5": "72611",
            "code6": "726110"
          },
          {
            "name": "Phường 12",
            "code5": "72612",
            "code6": "726120"
          },
          {
            "name": "Phường 13",
            "code5": "72613",
            "code6": "726130"
          },
          {
            "name": "Phường 14",
            "code5": "72614",
            "code6": "726140"
          },
          {
            "name": "Phường 15",
            "code5": "72615",
            "code6": "726150"
          },
          {
            "name": "Phường 16",
            "code5": "72616",
            "code6": "726160"
          }
        ]
      },
      {
        "name": "Quận 12",
        "code5": "71500",
        "code6": "715000",
        "wards": [
          {
            "name": "P. Thạnh Xuân",
            "code5": "71501",
            "code6": "715010"
          },
          {
            "name": "P. Thạnh Lộc",
            "code5": "71502",
            "code6": "715020"
          },
          {
            "name": "P. Hiệp Thành",
            "code5": "71503",
            "code6": "715030"
          },
          {
            "name": "P. Thới An",
            "code5": "71504",
            "code6": "715040"
          },
          {
            "name": "P. Tân Chánh Hiệp",
            "code5": "71505",
            "code6": "715050"
          },
          {
            "name": "P. An Phú Đông",
            "code5": "71506",
            "code6": "715060"
          },
          {
            "name": "P. Tân Thới Hiệp",
            "code5": "71507",
            "code6": "715070"
          },
          {
            "name": "P. Trung Mỹ Tây",
            "code5": "71508",
            "code6": "715080"
          },
          {
            "name": "P. Tân Hưng Thuận",
            "code5": "71509",
            "code6": "715090"
          },
          {
            "name": "P. Đông Hưng Thuận",
            "code5": "71510",
            "code6": "715100"
          },
          {
            "name": "P. Tân Thới Nhất",
            "code5": "71511",
            "code6": "715110"
          }
        ]
      },
      {
        "name": "TP. Thủ Đức",
        "code5": "71100",
        "code6": "713000",
        "wards": [
          {
            "name": "P. Thảo Điền",
            "code5": "71110",
            "code6": "713100"
          },
          {
            "name": "P. An Phú",
            "code5": "71108",
            "code6": "713200"
          },
          {
            "name": "P. An Khánh",
            "code5": "71106",
            "code6": "713300"
          },
          {
            "name": "P. Thủ Thiêm",
            "code5": "71111",
            "code6": "713400"
          },
          {
            "name": "P. Thạnh Mỹ Lợi",
            "code5": "71109",
            "code6": "713500"
          },
          {
            "name": "P. Hiệp Bình Chánh",
            "code5": "71308",
            "code6": "720100"
          },
          {
            "name": "P. Hiệp Bình Phước",
            "code5": "71309",
            "code6": "720200"
          },
          {
            "name": "P. Linh Chiểu",
            "code5": "71310",
            "code6": "720300"
          },
          {
            "name": "P. Linh Đông",
            "code5": "71311",
            "code6": "720400"
          },
          {
            "name": "P. Linh Trung",
            "code5": "71312",
            "code6": "720500"
          },
          {
            "name": "P. Linh Xuân",
            "code5": "71313",
            "code6": "720600"
          },
          {
            "name": "P. Tam Bình",
            "code5": "71314",
            "code6": "720700"
          },
          {
            "name": "P. Tam Phú",
            "code5": "71315",
            "code6": "720800"
          },
          {
            "name": "P. Trường Thọ",
            "code5": "71316",
            "code6": "720900"
          },
          {
            "name": "P. Bình Thọ",
            "code5": "71307",
            "code6": "720010"
          },
          {
            "name": "P. Hiệp Phú",
            "code5": "71206",
            "code6": "712100"
          },
          {
            "name": "P. Long Bình",
            "code5": "71207",
            "code6": "712200"
          },
          {
            "name": "P. Long Thạnh Mỹ",
            "code5": "71209",
            "code6": "712300"
          },
          {
            "name": "P. Phước Long B",
            "code5": "71214",
            "code6": "712400"
          },
          {
            "name": "P. Tăng Nhơn Phú A",
            "code5": "71215",
            "code6": "712500"
          },
          {
            "name": "P. Tăng Nhơn Phú B",
            "code5": "71216",
            "code6": "712600"
          }
        ]
      },
      {
        "name": "Quận Bình Thạnh",
        "code5": "72300",
        "code6": "723000",
        "wards": [
          {
            "name": "Phường 1",
            "code5": "72306",
            "code6": "723100"
          },
          {
            "name": "Phường 2",
            "code5": "72307",
            "code6": "723200"
          },
          {
            "name": "Phường 3",
            "code5": "72308",
            "code6": "723300"
          },
          {
            "name": "Phường 14",
            "code5": "72315",
            "code6": "723400"
          },
          {
            "name": "Phường 15",
            "code5": "72316",
            "code6": "723500"
          },
          {
            "name": "Phường 17",
            "code5": "72317",
            "code6": "723600"
          },
          {
            "name": "Phường 19",
            "code5": "72318",
            "code6": "723700"
          },
          {
            "name": "Phường 21",
            "code5": "72319",
            "code6": "723800"
          },
          {
            "name": "Phường 22",
            "code5": "72320",
            "code6": "723900"
          },
          {
            "name": "Phường 25",
            "code5": "72322",
            "code6": "723010"
          },
          {
            "name": "Phường 26",
            "code5": "72323",
            "code6": "723020"
          }
        ]
      },
      {
        "name": "Quận Gò Vấp",
        "code5": "71400",
        "code6": "714000",
        "wards": [
          {
            "name": "Phường 1",
            "code5": "71406",
            "code6": "714100"
          },
          {
            "name": "Phường 3",
            "code5": "71407",
            "code6": "714200"
          },
          {
            "name": "Phường 5",
            "code5": "71409",
            "code6": "714300"
          },
          {
            "name": "Phường 7",
            "code5": "71411",
            "code6": "714400"
          },
          {
            "name": "Phường 8",
            "code5": "71412",
            "code6": "714500"
          },
          {
            "name": "Phường 10",
            "code5": "71414",
            "code6": "714600"
          },
          {
            "name": "Phường 11",
            "code5": "71415",
            "code6": "714700"
          },
          {
            "name": "Phường 14",
            "code5": "71418",
            "code6": "714800"
          },
          {
            "name": "Phường 16",
            "code5": "71420",
            "code6": "714900"
          },
          {
            "name": "Phường 17",
            "code5": "71421",
            "code6": "714010"
          }
        ]
      },
      {
        "name": "Quận Phú Nhuận",
        "code5": "72200",
        "code6": "722000",
        "wards": [
          {
            "name": "Phường 1",
            "code5": "72226",
            "code6": "722300"
          },
          {
            "name": "Phường 2",
            "code5": "72227",
            "code6": "722400"
          },
          {
            "name": "Phường 3",
            "code5": "72228",
            "code6": "722500"
          },
          {
            "name": "Phường 7",
            "code5": "72231",
            "code6": "722600"
          },
          {
            "name": "Phường 9",
            "code5": "72233",
            "code6": "722700"
          },
          {
            "name": "Phường 10",
            "code5": "72234",
            "code6": "722800"
          },
          {
            "name": "Phường 15",
            "code5": "72237",
            "code6": "722900"
          }
        ]
      },
      {
        "name": "Quận Tân Bình",
        "code5": "72100",
        "code6": "725000",
        "wards": [
          {
            "name": "Phường 1",
            "code5": "72106",
            "code6": "725100"
          },
          {
            "name": "Phường 2 (Sân bay TSN)",
            "code5": "72107",
            "code6": "725200"
          },
          {
            "name": "Phường 4",
            "code5": "72109",
            "code6": "725300"
          },
          {
            "name": "Phường 6",
            "code5": "72111",
            "code6": "725400"
          },
          {
            "name": "Phường 8",
            "code5": "72113",
            "code6": "725500"
          },
          {
            "name": "Phường 10",
            "code5": "72115",
            "code6": "725600"
          },
          {
            "name": "Phường 12",
            "code5": "72117",
            "code6": "725700"
          },
          {
            "name": "Phường 13",
            "code5": "72118",
            "code6": "725800"
          },
          {
            "name": "Phường 14",
            "code5": "72119",
            "code6": "725900"
          },
          {
            "name": "Phường 15",
            "code5": "72120",
            "code6": "725010"
          }
        ]
      },
      {
        "name": "Quận Tân Phú",
        "code5": "72000",
        "code6": "720000",
        "wards": [
          {
            "name": "P. Tân Sơn Nhì",
            "code5": "72001",
            "code6": "720010"
          },
          {
            "name": "P. Tây Thạnh",
            "code5": "72002",
            "code6": "720020"
          },
          {
            "name": "P. Sơn Kỳ",
            "code5": "72003",
            "code6": "720030"
          },
          {
            "name": "P. Tân Quý",
            "code5": "72004",
            "code6": "720040"
          },
          {
            "name": "P. Tân Thành",
            "code5": "72005",
            "code6": "720050"
          },
          {
            "name": "P. Phú Thọ Hòa",
            "code5": "72006",
            "code6": "720060"
          },
          {
            "name": "P. Phú Thạnh",
            "code5": "72007",
            "code6": "720070"
          },
          {
            "name": "P. Phú Trung",
            "code5": "72008",
            "code6": "720080"
          },
          {
            "name": "P. Hòa Thạnh",
            "code5": "72009",
            "code6": "720090"
          },
          {
            "name": "P. Hiệp Tân",
            "code5": "72010",
            "code6": "720100"
          },
          {
            "name": "P. Tân Thới Hòa",
            "code5": "72011",
            "code6": "720110"
          }
        ]
      },
      {
        "name": "Quận Bình Tân",
        "code5": "71900",
        "code6": "719000",
        "wards": [
          {
            "name": "P. Tân Tạo",
            "code5": "71906",
            "code6": "719060"
          },
          {
            "name": "P. Tân Tạo A",
            "code5": "71907",
            "code6": "719070"
          },
          {
            "name": "P. An Lạc",
            "code5": "71901",
            "code6": "719010"
          },
          {
            "name": "P. An Lạc A",
            "code5": "71902",
            "code6": "719020"
          },
          {
            "name": "P. Bình Trị Đông",
            "code5": "71903",
            "code6": "719030"
          },
          {
            "name": "P. Bình Trị Đông A",
            "code5": "71904",
            "code6": "719040"
          },
          {
            "name": "P. Bình Trị Đông B",
            "code5": "71905",
            "code6": "719050"
          },
          {
            "name": "P. Bình Hưng Hòa",
            "code5": "71908",
            "code6": "719080"
          },
          {
            "name": "P. Bình Hưng Hòa A",
            "code5": "71909",
            "code6": "719090"
          },
          {
            "name": "P. Bình Hưng Hòa B",
            "code5": "71910",
            "code6": "719100"
          }
        ]
      },
      {
        "name": "Huyện Bình Chánh",
        "code5": "71800",
        "code6": "718000",
        "wards": [
          {
            "name": "TT. Tân Túc",
            "code5": "71801",
            "code6": "718010"
          },
          {
            "name": "Xã An Phú Tây",
            "code5": "71802",
            "code6": "718020"
          },
          {
            "name": "Xã Bình Chánh",
            "code5": "71803",
            "code6": "718030"
          },
          {
            "name": "Xã Bình Hưng",
            "code5": "71804",
            "code6": "718040"
          },
          {
            "name": "Xã Bình Lợi",
            "code5": "71805",
            "code6": "718050"
          },
          {
            "name": "Xã Đa Phước",
            "code5": "71806",
            "code6": "718060"
          },
          {
            "name": "Xã Hưng Long",
            "code5": "71807",
            "code6": "718070"
          },
          {
            "name": "Xã Lê Minh Xuân",
            "code5": "71808",
            "code6": "718080"
          },
          {
            "name": "Xã Phạm Văn Hai",
            "code5": "71809",
            "code6": "718090"
          },
          {
            "name": "Xã Phong Phú",
            "code5": "71810",
            "code6": "718100"
          },
          {
            "name": "Xã Quy Đức",
            "code5": "71811",
            "code6": "718110"
          },
          {
            "name": "Xã Tân Kiên",
            "code5": "71812",
            "code6": "718120"
          },
          {
            "name": "Xã Tân Nhựt",
            "code5": "71813",
            "code6": "718130"
          },
          {
            "name": "Xã Tân Quý Tây",
            "code5": "71814",
            "code6": "718140"
          },
          {
            "name": "Xã Vĩnh Lộc A",
            "code5": "71815",
            "code6": "718150"
          },
          {
            "name": "Xã Vĩnh Lộc B",
            "code5": "71816",
            "code6": "718160"
          }
        ]
      },
      {
        "name": "Huyện Cần Giờ",
        "code5": "73300",
        "code6": "733000",
        "wards": [
          {
            "name": "TT. Cần Thạnh",
            "code5": "73301",
            "code6": "733010"
          },
          {
            "name": "Xã An Thới Đông",
            "code5": "73302",
            "code6": "733020"
          },
          {
            "name": "Xã Bình Khánh",
            "code5": "73303",
            "code6": "733030"
          },
          {
            "name": "Xã Long Hòa",
            "code5": "73304",
            "code6": "733040"
          },
          {
            "name": "Xã Lý Nhơn",
            "code5": "73305",
            "code6": "733050"
          },
          {
            "name": "Xã Tam Thôn Hiệp",
            "code5": "73306",
            "code6": "733060"
          },
          {
            "name": "Xã Thạnh An",
            "code5": "73307",
            "code6": "733070"
          }
        ]
      },
      {
        "name": "Huyện Củ Chi",
        "code5": "71600",
        "code6": "716000",
        "wards": [
          {
            "name": "TT. Củ Chi",
            "code5": "71601",
            "code6": "716010"
          },
          {
            "name": "Xã An Nhơn Tây",
            "code5": "71602",
            "code6": "716020"
          },
          {
            "name": "Xã An Phú",
            "code5": "71603",
            "code6": "716030"
          },
          {
            "name": "Xã Bình Mỹ",
            "code5": "71604",
            "code6": "716040"
          },
          {
            "name": "Xã Hòa Phú",
            "code5": "71605",
            "code6": "716050"
          },
          {
            "name": "Xã Nhuận Đức",
            "code5": "71606",
            "code6": "716060"
          },
          {
            "name": "Xã Phạm Văn Cội",
            "code5": "71607",
            "code6": "716070"
          },
          {
            "name": "Xã Phú Hòa Đông",
            "code5": "71608",
            "code6": "716080"
          },
          {
            "name": "Xã Phú Mỹ Hưng",
            "code5": "71609",
            "code6": "716090"
          },
          {
            "name": "Xã Tân An Hội",
            "code5": "71610",
            "code6": "716100"
          },
          {
            "name": "Xã Tân Phú Trung",
            "code5": "71611",
            "code6": "716110"
          },
          {
            "name": "Xã Tân Thạnh Đông",
            "code5": "71612",
            "code6": "716120"
          },
          {
            "name": "Xã Tân Thạnh Tây",
            "code5": "71613",
            "code6": "716130"
          },
          {
            "name": "Xã Tân Thông Hội",
            "code5": "71614",
            "code6": "716140"
          },
          {
            "name": "Xã Thái Mỹ",
            "code5": "71615",
            "code6": "716150"
          },
          {
            "name": "Xã Trung An",
            "code5": "71616",
            "code6": "716160"
          },
          {
            "name": "Xã Trung Lập Hạ",
            "code5": "71617",
            "code6": "716170"
          },
          {
            "name": "Xã Trung Lập Thượng",
            "code5": "71618",
            "code6": "716180"
          }
        ]
      },
      {
        "name": "Huyện Hóc Môn",
        "code5": "71700",
        "code6": "717000",
        "wards": [
          {
            "name": "TT. Hóc Môn",
            "code5": "71701",
            "code6": "717010"
          },
          {
            "name": "Xã Bà Điểm",
            "code5": "71702",
            "code6": "717020"
          },
          {
            "name": "Xã Đông Thạnh",
            "code5": "71703",
            "code6": "717030"
          },
          {
            "name": "Xã Nhị Bình",
            "code5": "71704",
            "code6": "717040"
          },
          {
            "name": "Xã Tân Hiệp",
            "code5": "71705",
            "code6": "717050"
          },
          {
            "name": "Xã Tân Thới Nhì",
            "code5": "71706",
            "code6": "717060"
          },
          {
            "name": "Xã Tân Xuân",
            "code5": "71707",
            "code6": "717070"
          },
          {
            "name": "Xã Thới Tam Thôn",
            "code5": "71708",
            "code6": "717080"
          },
          {
            "name": "Xã Trung Chánh",
            "code5": "71709",
            "code6": "717090"
          },
          {
            "name": "Xã Xuân Thới Đông",
            "code5": "71710",
            "code6": "717100"
          },
          {
            "name": "Xã Xuân Thới Sơn",
            "code5": "71711",
            "code6": "717110"
          },
          {
            "name": "Xã Xuân Thới Thượng",
            "code5": "71712",
            "code6": "717120"
          }
        ]
      },
      {
        "name": "Huyện Nhà Bè",
        "code5": "73200",
        "code6": "732000",
        "wards": [
          {
            "name": "TT. Nhà Bè",
            "code5": "73201",
            "code6": "732010"
          },
          {
            "name": "Xã Hiệp Phước",
            "code5": "73202",
            "code6": "732020"
          },
          {
            "name": "Xã Long Thới",
            "code5": "73203",
            "code6": "732030"
          },
          {
            "name": "Xã Nhơn Đức",
            "code5": "73204",
            "code6": "732040"
          },
          {
            "name": "Xã Phú Xuân",
            "code5": "73205",
            "code6": "732050"
          },
          {
            "name": "Xã Phước Kiển",
            "code5": "73206",
            "code6": "732060"
          },
          {
            "name": "Xã Phước Lộc",
            "code5": "73207",
            "code6": "732070"
          }
        ]
      }
    ]
  },
  {
    "id": "danang",
    "name": "TP. Đà Nẵng",
    "codes": [
      "50",
      "51",
      "52"
    ],
    "code5": "50000",
    "code6": "550000",
    "note": "Đà Nẵng + Quảng Nam",
    "region": "Miền Trung",
    "centerPostOffice": "Bưu điện TT Đà Nẵng - 271 Nguyễn Văn Linh, P. Vĩnh Trung, Q. Thanh Khê",
    "searchKey": "da nang dng dn",
    "districts": [
      {
        "name": "Quận Hải Châu",
        "code5": "50100",
        "code6": "551000",
        "wards": [
          {
            "name": "P. Hải Châu 1",
            "code5": "50106",
            "code6": "551100"
          },
          {
            "name": "P. Hải Châu 2",
            "code5": "50107",
            "code6": "551200"
          },
          {
            "name": "P. Thạch Thang",
            "code5": "50108",
            "code6": "551300"
          },
          {
            "name": "P. Thanh Bình",
            "code5": "50109",
            "code6": "551400"
          },
          {
            "name": "P. Thuận Phước",
            "code5": "50110",
            "code6": "551500"
          },
          {
            "name": "P. Phước Ninh",
            "code5": "50114",
            "code6": "551600"
          },
          {
            "name": "P. Hòa Cường Bắc",
            "code5": "50117",
            "code6": "551700"
          },
          {
            "name": "P. Hòa Cường Nam",
            "code5": "50118",
            "code6": "551800"
          }
        ]
      },
      {
        "name": "Quận Thanh Khê",
        "code5": "50200",
        "code6": "552000",
        "wards": [
          {
            "name": "P. Vĩnh Trung",
            "code5": "50212",
            "code6": "552100"
          },
          {
            "name": "P. Thạc Gián",
            "code5": "50213",
            "code6": "552200"
          },
          {
            "name": "P. Chính Gián",
            "code5": "50211",
            "code6": "552300"
          },
          {
            "name": "P. Tân Chính",
            "code5": "50210",
            "code6": "552400"
          },
          {
            "name": "P. An Khê",
            "code5": "50214",
            "code6": "552500"
          },
          {
            "name": "P. Thanh Khê Đông",
            "code5": "50208",
            "code6": "552600"
          },
          {
            "name": "P. Thanh Khê Tây",
            "code5": "50207",
            "code6": "552700"
          }
        ]
      },
      {
        "name": "Quận Sơn Trà",
        "code5": "50300",
        "code6": "553000",
        "wards": [
          {
            "name": "P. An Hải Bắc",
            "code5": "50306",
            "code6": "553100"
          },
          {
            "name": "P. An Hải Đông",
            "code5": "50307",
            "code6": "553200"
          },
          {
            "name": "P. An Hải Tây",
            "code5": "50308",
            "code6": "553300"
          },
          {
            "name": "P. Mân Thái",
            "code5": "50309",
            "code6": "553400"
          },
          {
            "name": "P. Phước Mỹ",
            "code5": "50311",
            "code6": "553500"
          },
          {
            "name": "P. Thọ Quang",
            "code5": "50312",
            "code6": "553600"
          }
        ]
      },
      {
        "name": "Quận Ngũ Hành Sơn",
        "code5": "50400",
        "code6": "554000",
        "wards": [
          { "name": "P. Mỹ An", "code5": "50406", "code6": "554100" },
          { "name": "P. Khuê Mỹ", "code5": "50407", "code6": "554200" },
          { "name": "P. Hòa Hải", "code5": "50408", "code6": "554300" },
          { "name": "P. Hòa Quý", "code5": "50409", "code6": "554400" }
        ]
      },
      {
        "name": "Quận Liên Chiểu",
        "code5": "50500",
        "code6": "555000",
        "wards": [
          { "name": "P. Hòa Hiệp Bắc", "code5": "50506", "code6": "555100" },
          { "name": "P. Hòa Hiệp Nam", "code5": "50507", "code6": "555200" },
          { "name": "P. Hòa Khánh Bắc", "code5": "50508", "code6": "555300" },
          { "name": "P. Hòa Khánh Nam", "code5": "50509", "code6": "555400" },
          { "name": "P. Hòa Minh", "code5": "50510", "code6": "555500" }
        ]
      },
      {
        "name": "Quận Cẩm Lệ",
        "code5": "50600",
        "code6": "556000",
        "wards": [
          { "name": "P. Khuê Trung", "code5": "50606", "code6": "556100" },
          { "name": "P. Hòa Phát", "code5": "50607", "code6": "556200" },
          { "name": "P. Hòa An", "code5": "50608", "code6": "556300" },
          { "name": "P. Hòa Thọ Tây", "code5": "50609", "code6": "556400" },
          { "name": "P. Hòa Thọ Đông", "code5": "50610", "code6": "556500" },
          { "name": "P. Hòa Xuân", "code5": "50611", "code6": "556600" }
        ]
      },
      {
        "name": "Huyện Hòa Vang",
        "code5": "50700",
        "code6": "557000"
      },
      {
        "name": "Huyện Hoàng Sa",
        "code5": "50800",
        "code6": "558000"
      }
    ]
  },
  {
    "id": "haiphong",
    "name": "TP. Hải Phòng",
    "codes": [
      "03",
      "04",
      "05"
    ],
    "code5": "04000",
    "code6": "180000",
    "note": "Hải Phòng + Hải Dương",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện TT Hải Phòng - 05 Nguyễn Tri Phương, Minh Khai, Hồng Bàng",
    "searchKey": "hai phong hp dat cang",
    "districts": [
      {
        "name": "Quận Hồng Bàng",
        "code5": "04100",
        "code6": "181000",
        "wards": [
          {
            "name": "P. Hoàng Văn Thụ",
            "code5": "04106",
            "code6": "181100"
          },
          {
            "name": "P. Minh Khai",
            "code5": "04107",
            "code6": "181200"
          },
          {
            "name": "P. Phan Bội Châu",
            "code5": "04108",
            "code6": "181300"
          },
          {
            "name": "P. Quán Toan",
            "code5": "04109",
            "code6": "181400"
          },
          {
            "name": "P. Sở Dầu",
            "code5": "04110",
            "code6": "181500"
          },
          {
            "name": "P. Thượng Lý",
            "code5": "04111",
            "code6": "181600"
          }
        ]
      },
      {
        "name": "Quận Ngô Quyền",
        "code5": "04200",
        "code6": "182000",
        "wards": [
          {
            "name": "P. Máy Chai",
            "code5": "04206",
            "code6": "182100"
          },
          {
            "name": "P. Cầu Tre",
            "code5": "04209",
            "code6": "182200"
          },
          {
            "name": "P. Lạc Viên",
            "code5": "04210",
            "code6": "182300"
          },
          {
            "name": "P. Cầu Đất",
            "code5": "04213",
            "code6": "182400"
          },
          {
            "name": "P. Lạch Tray",
            "code5": "04216",
            "code6": "182500"
          },
          {
            "name": "P. Đằng Giang",
            "code5": "04215",
            "code6": "182600"
          }
        ]
      },
      {
        "name": "Quận Lê Chân",
        "code5": "04300",
        "code6": "183000",
        "wards": [
          { "name": "P. An Biên", "code5": "04306", "code6": "183100" },
          { "name": "P. Lam Sơn", "code5": "04307", "code6": "183200" },
          { "name": "P. Cát Dài", "code5": "04308", "code6": "183300" },
          { "name": "P. Hàng Kênh", "code5": "04309", "code6": "183400" },
          { "name": "P. Dư Hàng", "code5": "04310", "code6": "183500" },
          { "name": "P. Vĩnh Niệm", "code5": "04311", "code6": "183600" },
          { "name": "P. Niệm Nghĩa", "code5": "04312", "code6": "183700" }
        ]
      },
      {
        "name": "Quận Hải An",
        "code5": "04400",
        "code6": "184000",
        "wards": [
          { "name": "P. Đằng Hải", "code5": "04406", "code6": "184100" },
          { "name": "P. Đằng Lâm", "code5": "04407", "code6": "184200" },
          { "name": "P. Đông Hải 1", "code5": "04408", "code6": "184300" },
          { "name": "P. Đông Hải 2", "code5": "04409", "code6": "184400" },
          { "name": "P. Nam Hải", "code5": "04410", "code6": "184500" },
          { "name": "P. Cát Bi", "code5": "04411", "code6": "184600" }
        ]
      },
      {
        "name": "Quận Kiến An",
        "code5": "04500",
        "code6": "185000",
        "wards": [
          { "name": "P. Trần Thành Ngọ", "code5": "04506", "code6": "185100" },
          { "name": "P. Quán Trữ", "code5": "04507", "code6": "185200" },
          { "name": "P. Bắc Sơn", "code5": "04508", "code6": "185300" },
          { "name": "P. Phù Liễn", "code5": "04509", "code6": "185400" },
          { "name": "P. Văn Đẩu", "code5": "04510", "code6": "185500" }
        ]
      },
      {
        "name": "Quận Đồ Sơn",
        "code5": "04600",
        "code6": "186000"
      },
      {
        "name": "Quận Dương Kinh",
        "code5": "04700",
        "code6": "187000"
      },
      {
        "name": "Huyện Thủy Nguyên",
        "code5": "04800",
        "code6": "188000"
      },
      {
        "name": "Huyện An Dương",
        "code5": "04900",
        "code6": "189000"
      },
      {
        "name": "Huyện An Lão",
        "code5": "05100",
        "code6": "191000"
      },
      {
        "name": "Huyện Tiên Lãng",
        "code5": "05200",
        "code6": "192000"
      },
      {
        "name": "Huyện Vĩnh Bảo",
        "code5": "05300",
        "code6": "193000"
      },
      {
        "name": "Huyện Cát Hải",
        "code5": "05400",
        "code6": "194000"
      },
      {
        "name": "TX. Bạch Long Vĩ",
        "code5": "05500",
        "code6": "195000"
      }
    ]
  },
  {
    "id": "cantho",
    "name": "TP. Cần Thơ",
    "codes": [
      "94",
      "95",
      "96"
    ],
    "code5": "94000",
    "code6": "900000",
    "note": "Cần Thơ + Sóc Trăng + Hậu Giang",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện TT Cần Thơ - 02 Hòa Bình, Tân An, Ninh Kiều",
    "searchKey": "can tho tay do",
    "districts": [
      {
        "name": "Quận Ninh Kiều",
        "code5": "94100",
        "code6": "901000",
        "wards": [
          {
            "name": "P. Tân An",
            "code5": "94106",
            "code6": "901100"
          },
          {
            "name": "P. An Cư",
            "code5": "94107",
            "code6": "901200"
          },
          {
            "name": "P. An Nghiệp",
            "code5": "94108",
            "code6": "901300"
          },
          {
            "name": "P. Xuân Khánh",
            "code5": "94110",
            "code6": "901400"
          },
          {
            "name": "P. Hưng Lợi",
            "code5": "94111",
            "code6": "901500"
          },
          {
            "name": "P. An Khánh",
            "code5": "94112",
            "code6": "901600"
          },
          {
            "name": "P. Cái Khế",
            "code5": "94115",
            "code6": "901700"
          }
        ]
      },
      {
        "name": "Quận Bình Thủy",
        "code5": "94200",
        "code6": "902000",
        "wards": [
          { "name": "P. Bình Thủy", "code5": "94206", "code6": "902100" },
          { "name": "P. An Thới", "code5": "94207", "code6": "902200" },
          { "name": "P. Trà An", "code5": "94208", "code6": "902300" },
          { "name": "P. Trà Nóc", "code5": "94209", "code6": "902400" },
          { "name": "P. Bùi Hữu Nghĩa", "code5": "94210", "code6": "902500" },
          { "name": "P. Long Hòa", "code5": "94211", "code6": "902600" },
          { "name": "P. Long Tuyền", "code5": "94212", "code6": "902700" },
          { "name": "P. Thới An Đông", "code5": "94213", "code6": "902800" }
        ]
      },
      {
        "name": "Quận Cái Răng",
        "code5": "94300",
        "code6": "903000",
        "wards": [
          { "name": "P. Lê Bình", "code5": "94306", "code6": "903100" },
          { "name": "P. Hưng Phú", "code5": "94307", "code6": "903200" },
          { "name": "P. Hưng Thạnh", "code5": "94308", "code6": "903300" },
          { "name": "P. Ba Láng", "code5": "94309", "code6": "903400" },
          { "name": "P. Thường Thạnh", "code5": "94310", "code6": "903500" },
          { "name": "P. Phú Thứ", "code5": "94311", "code6": "903600" },
          { "name": "P. Tân Phú", "code5": "94312", "code6": "903700" }
        ]
      },
      {
        "name": "Quận Ô Môn",
        "code5": "94400",
        "code6": "904000",
        "wards": [
          { "name": "P. Châu Văn Liêm", "code5": "94406", "code6": "904100" },
          { "name": "P. Thới Hòa", "code5": "94407", "code6": "904200" },
          { "name": "P. Thới An", "code5": "94408", "code6": "904300" },
          { "name": "P. Phước Thới", "code5": "94409", "code6": "904400" },
          { "name": "P. Trường Lạc", "code5": "94410", "code6": "904500" },
          { "name": "P. Thới Long", "code5": "94411", "code6": "904600" },
          { "name": "P. Long Hưng", "code5": "94412", "code6": "904700" }
        ]
      },
      {
        "name": "Quận Thốt Nốt",
        "code5": "94500",
        "code6": "905000",
        "wards": [
          { "name": "P. Thốt Nốt", "code5": "94506", "code6": "905100" },
          { "name": "P. Thới Thuận", "code5": "94507", "code6": "905200" },
          { "name": "P. Thuận An", "code5": "94508", "code6": "905300" },
          { "name": "P. Tân Lộc", "code5": "94509", "code6": "905400" },
          { "name": "P. Trung Nhứt", "code5": "94510", "code6": "905500" },
          { "name": "P. Thạnh Hòa", "code5": "94511", "code6": "905600" },
          { "name": "P. Trung Kiên", "code5": "94512", "code6": "905700" },
          { "name": "P. Thuận Hưng", "code5": "94513", "code6": "905800" },
          { "name": "P. Tân Hưng", "code5": "94514", "code6": "905900" }
        ]
      },
      {
        "name": "Huyện Phong Điền",
        "code5": "94600",
        "code6": "906000"
      },
      {
        "name": "Huyện Cờ Đỏ",
        "code5": "94700",
        "code6": "907000"
      },
      {
        "name": "Huyện Vĩnh Thạnh",
        "code5": "94800",
        "code6": "908000"
      },
      {
        "name": "Huyện Thới Lai",
        "code5": "94900",
        "code6": "909000"
      }
    ]
  },
  {
    "id": "bacgiang",
    "name": "Bắc Giang",
    "codes": [
      "26"
    ],
    "code5": "26000",
    "code6": "220000",
    "note": "Bắc Giang + Bắc Ninh",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Bắc Giang - 39 Hùng Vương, P. Ngô Quyền, TP. Bắc Giang",
    "searchKey": "bac giang bg",
    "districts": [
      {
        "name": "TP. Bắc Giang",
        "code5": "26100",
        "code6": "221000"
      },
      {
        "name": "Huyện Lạng Giang",
        "code5": "26200",
        "code6": "222000"
      },
      {
        "name": "Huyện Lục Nam",
        "code5": "26300",
        "code6": "223000"
      },
      {
        "name": "Huyện Lục Ngạn",
        "code5": "26400",
        "code6": "224000"
      },
      {
        "name": "Huyện Sơn Động",
        "code5": "26500",
        "code6": "225000"
      },
      {
        "name": "Huyện Tân Yên",
        "code5": "26600",
        "code6": "226000"
      },
      {
        "name": "Huyện Việt Yên",
        "code5": "26700",
        "code6": "227000"
      },
      {
        "name": "Huyện Yên Dũng",
        "code5": "26800",
        "code6": "228000"
      },
      {
        "name": "Huyện Yên Thế",
        "code5": "26900",
        "code6": "229000"
      },
      {
        "name": "Huyện Hiệp Hòa",
        "code5": "26010",
        "code6": "226500"
      }
    ]
  },
  {
    "id": "backan",
    "name": "Bắc Kạn",
    "codes": [
      "23"
    ],
    "code5": "23000",
    "code6": "960000",
    "note": "Bắc Kạn + Thái Nguyên",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Bắc Kạn - Tổ 4, P. Đức Xuân, TP. Bắc Kạn",
    "searchKey": "bac kan bac can bk",
    "districts": [
      {
        "name": "TP. Bắc Kạn",
        "code5": "23100",
        "code6": "961000"
      },
      {
        "name": "Huyện Ba Bể",
        "code5": "23200",
        "code6": "962000"
      },
      {
        "name": "Huyện Bạch Thông",
        "code5": "23300",
        "code6": "963000"
      },
      {
        "name": "Huyện Chợ Đồn",
        "code5": "23400",
        "code6": "964000"
      },
      {
        "name": "Huyện Chợ Mới",
        "code5": "23500",
        "code6": "965000"
      },
      {
        "name": "Huyện Na Rì",
        "code5": "23600",
        "code6": "966000"
      },
      {
        "name": "Huyện Ngân Sơn",
        "code5": "23700",
        "code6": "967000"
      },
      {
        "name": "Huyện Pác Nặm",
        "code5": "23800",
        "code6": "968000"
      }
    ]
  },
  {
    "id": "bacninh",
    "name": "Bắc Ninh",
    "codes": [
      "16"
    ],
    "code5": "16000",
    "code6": "790000",
    "note": "Bắc Ninh + Bắc Giang",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Bắc Ninh - 01 Lý Thái Tổ, P. Suối Hoa, TP. Bắc Ninh",
    "searchKey": "bac ninh bn kinh bac",
    "districts": [
      {
        "name": "TP. Bắc Ninh",
        "code5": "16100",
        "code6": "791000"
      },
      {
        "name": "TP. Từ Sơn",
        "code5": "16200",
        "code6": "792000"
      },
      {
        "name": "Huyện Gia Bình",
        "code5": "16300",
        "code6": "793000"
      },
      {
        "name": "Huyện Lương Tài",
        "code5": "16400",
        "code6": "794000"
      },
      {
        "name": "Huyện Quế Võ",
        "code5": "16500",
        "code6": "795000"
      },
      {
        "name": "Huyện Thuận Thành",
        "code5": "16600",
        "code6": "796000"
      },
      {
        "name": "Huyện Tiên Du",
        "code5": "16700",
        "code6": "797000"
      },
      {
        "name": "Huyện Yên Phong",
        "code5": "16800",
        "code6": "798000"
      }
    ]
  },
  {
    "id": "caobang",
    "name": "Cao Bằng",
    "codes": [
      "21"
    ],
    "code5": "21000",
    "code6": "270000",
    "note": "Giữ nguyên",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Cao Bằng - 053 Phố Thầu, P. Hợp Giang, TP. Cao Bằng",
    "searchKey": "cao bang cb",
    "districts": [
      {
        "name": "TP. Cao Bằng",
        "code5": "21100",
        "code6": "271000"
      },
      {
        "name": "Huyện Bảo Lạc",
        "code5": "21200",
        "code6": "272000"
      },
      {
        "name": "Huyện Bảo Lâm",
        "code5": "21300",
        "code6": "273000"
      },
      {
        "name": "Huyện Hà Quảng",
        "code5": "21400",
        "code6": "274000"
      },
      {
        "name": "Huyện Hòa An",
        "code5": "21500",
        "code6": "275000"
      },
      {
        "name": "Huyện Nguyên Bình",
        "code5": "21600",
        "code6": "276000"
      },
      {
        "name": "Huyện Quảng Hòa",
        "code5": "21700",
        "code6": "277000"
      },
      {
        "name": "Huyện Thạch An",
        "code5": "21800",
        "code6": "278000"
      },
      {
        "name": "Huyện Trùng Khánh",
        "code5": "21900",
        "code6": "279000"
      }
    ]
  },
  {
    "id": "dienbien",
    "name": "Điện Biên",
    "codes": [
      "32"
    ],
    "code5": "32000",
    "code6": "380000",
    "note": "Giữ nguyên",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Điện Biên - Tổ 11, P. Mường Thanh, TP. Điện Biên Phủ",
    "searchKey": "dien bien db",
    "districts": [
      {
        "name": "TP. Điện Biên Phủ",
        "code5": "32100",
        "code6": "381000"
      },
      {
        "name": "TX. Mường Lay",
        "code5": "32200",
        "code6": "382000"
      },
      {
        "name": "Huyện Điện Biên",
        "code5": "32300",
        "code6": "383000"
      },
      {
        "name": "Huyện Điện Biên Đông",
        "code5": "32400",
        "code6": "384000"
      },
      {
        "name": "Huyện Mường Ảng",
        "code5": "32500",
        "code6": "385000"
      },
      {
        "name": "Huyện Mường Chà",
        "code5": "32600",
        "code6": "386000"
      },
      {
        "name": "Huyện Mường Nhé",
        "code5": "32700",
        "code6": "387000"
      },
      {
        "name": "Huyện Nậm Pồ",
        "code5": "32800",
        "code6": "388000"
      },
      {
        "name": "Huyện Tủa Chùa",
        "code5": "32900",
        "code6": "389000"
      },
      {
        "name": "Huyện Tuần Giáo",
        "code5": "32010",
        "code6": "389500"
      }
    ]
  },
  {
    "id": "hagiang",
    "name": "Hà Giang",
    "codes": [
      "20"
    ],
    "code5": "20000",
    "code6": "310000",
    "note": "Hà Giang + Tuyên Quang",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Hà Giang - Đường Nguyễn Trãi, P. Nguyễn Trãi, TP. Hà Giang",
    "searchKey": "ha giang hg dong van meo vac",
    "districts": [
      {
        "name": "TP. Hà Giang",
        "code5": "20100",
        "code6": "311000"
      },
      {
        "name": "Huyện Bắc Mê",
        "code5": "20200",
        "code6": "312000"
      },
      {
        "name": "Huyện Bắc Quang",
        "code5": "20300",
        "code6": "313000"
      },
      {
        "name": "Huyện Đồng Văn",
        "code5": "20400",
        "code6": "314000"
      },
      {
        "name": "Huyện Hoàng Su Phì",
        "code5": "20500",
        "code6": "315000"
      },
      {
        "name": "Huyện Mèo Vạc",
        "code5": "20600",
        "code6": "316000"
      },
      {
        "name": "Huyện Quản Bạ",
        "code5": "20700",
        "code6": "317000"
      },
      {
        "name": "Huyện Quang Bình",
        "code5": "20800",
        "code6": "318000"
      },
      {
        "name": "Huyện Vị Xuyên",
        "code5": "20900",
        "code6": "319000"
      },
      {
        "name": "Huyện Xín Mần",
        "code5": "20010",
        "code6": "319500"
      },
      {
        "name": "Huyện Yên Minh",
        "code5": "20020",
        "code6": "319600"
      }
    ]
  },
  {
    "id": "hanam",
    "name": "Hà Nam",
    "codes": [
      "18"
    ],
    "code5": "18000",
    "code6": "400000",
    "note": "Hà Nam + Ninh Bình",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Hà Nam - 114 Trần Phú, P. Quang Trung, TP. Phủ Lý",
    "searchKey": "ha nam hn phu ly",
    "districts": [
      {
        "name": "TP. Phủ Lý",
        "code5": "18100",
        "code6": "401000"
      },
      {
        "name": "TX. Duy Tiên",
        "code5": "18200",
        "code6": "402000"
      },
      {
        "name": "Huyện Bình Lục",
        "code5": "18300",
        "code6": "403000"
      },
      {
        "name": "Huyện Kim Bảng",
        "code5": "18400",
        "code6": "404000"
      },
      {
        "name": "Huyện Lý Nhân",
        "code5": "18500",
        "code6": "405000"
      },
      {
        "name": "Huyện Thanh Liêm",
        "code5": "18600",
        "code6": "406000"
      }
    ]
  },
  {
    "id": "haiduong",
    "name": "Hải Dương",
    "codes": [
      "03"
    ],
    "code5": "03000",
    "code6": "170000",
    "note": "Hải Dương + Hải Phòng",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Hải Dương - 01 Trần Hưng Đạo, P. Trần Hưng Đạo, TP. Hải Dương",
    "searchKey": "hai duong hd",
    "districts": [
      {
        "name": "TP. Hải Dương",
        "code5": "03100",
        "code6": "171000"
      },
      {
        "name": "TP. Chí Linh",
        "code5": "03200",
        "code6": "172000"
      },
      {
        "name": "TX. Kinh Môn",
        "code5": "03300",
        "code6": "173000"
      },
      {
        "name": "Huyện Bình Giang",
        "code5": "03400",
        "code6": "174000"
      },
      {
        "name": "Huyện Cẩm Giàng",
        "code5": "03500",
        "code6": "175000"
      },
      {
        "name": "Huyện Gia Lộc",
        "code5": "03600",
        "code6": "176000"
      },
      {
        "name": "Huyện Kim Thành",
        "code5": "03700",
        "code6": "177000"
      },
      {
        "name": "Huyện Nam Sách",
        "code5": "03800",
        "code6": "178000"
      },
      {
        "name": "Huyện Ninh Giang",
        "code5": "03900",
        "code6": "179000"
      },
      {
        "name": "Huyện Thanh Hà",
        "code5": "03010",
        "code6": "179500"
      },
      {
        "name": "Huyện Thanh Miện",
        "code5": "03020",
        "code6": "179600"
      },
      {
        "name": "Huyện Tứ Kỳ",
        "code5": "03030",
        "code6": "179700"
      }
    ]
  },
  {
    "id": "hoabinh",
    "name": "Hòa Bình",
    "codes": [
      "36"
    ],
    "code5": "36000",
    "code6": "350000",
    "note": "Hòa Bình + Phú Thọ",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Hòa Bình - 515 Cù Chính Lan, P. Phương Lâm, TP. Hòa Bình",
    "searchKey": "hoa binh hb",
    "districts": [
      {
        "name": "TP. Hòa Bình",
        "code5": "36100",
        "code6": "351000"
      },
      {
        "name": "Huyện Cao Phong",
        "code5": "36200",
        "code6": "352000"
      },
      {
        "name": "Huyện Đà Bắc",
        "code5": "36300",
        "code6": "353000"
      },
      {
        "name": "Huyện Kim Bôi",
        "code5": "36400",
        "code6": "354000"
      },
      {
        "name": "Huyện Kỳ Sơn",
        "code5": "36500",
        "code6": "355000"
      },
      {
        "name": "Huyện Lạc Sơn",
        "code5": "36600",
        "code6": "356000"
      },
      {
        "name": "Huyện Lạc Thủy",
        "code5": "36700",
        "code6": "357000"
      },
      {
        "name": "Huyện Lương Sơn",
        "code5": "36800",
        "code6": "358000"
      },
      {
        "name": "Huyện Mai Châu",
        "code5": "36900",
        "code6": "359000"
      },
      {
        "name": "Huyện Tân Lạc",
        "code5": "36010",
        "code6": "359500"
      },
      {
        "name": "Huyện Yên Thủy",
        "code5": "36020",
        "code6": "359600"
      }
    ]
  },
  {
    "id": "hungyen",
    "name": "Hưng Yên",
    "codes": [
      "17"
    ],
    "code5": "17000",
    "code6": "160000",
    "note": "Hưng Yên + Thái Bình",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Hưng Yên - 04 Chùa Chuông, P. Hiến Nam, TP. Hưng Yên",
    "searchKey": "hung yen hy",
    "districts": [
      {
        "name": "TP. Hưng Yên",
        "code5": "17100",
        "code6": "161000"
      },
      {
        "name": "TX. Mỹ Hào",
        "code5": "17200",
        "code6": "162000"
      },
      {
        "name": "Huyện Ân Thi",
        "code5": "17300",
        "code6": "163000"
      },
      {
        "name": "Huyện Khoái Châu",
        "code5": "17400",
        "code6": "164000"
      },
      {
        "name": "Huyện Kim Động",
        "code5": "17500",
        "code6": "165000"
      },
      {
        "name": "Huyện Phù Cừ",
        "code5": "17600",
        "code6": "166000"
      },
      {
        "name": "Huyện Tiên Lữ",
        "code5": "17700",
        "code6": "167000"
      },
      {
        "name": "Huyện Văn Giang",
        "code5": "17800",
        "code6": "168000"
      },
      {
        "name": "Huyện Văn Lâm",
        "code5": "17900",
        "code6": "169000"
      },
      {
        "name": "Huyện Yên Mỹ",
        "code5": "17010",
        "code6": "169500"
      }
    ]
  },
  {
    "id": "laichau",
    "name": "Lai Châu",
    "codes": [
      "30"
    ],
    "code5": "30000",
    "code6": "390000",
    "note": "Giữ nguyên",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Lai Châu - Đường Trần Phú, P. Tân Phong, TP. Lai Châu",
    "searchKey": "lai chau lc",
    "districts": [
      {
        "name": "TP. Lai Châu",
        "code5": "30100",
        "code6": "391000"
      },
      {
        "name": "Huyện Mường Tè",
        "code5": "30200",
        "code6": "392000"
      },
      {
        "name": "Huyện Nậm Nhùn",
        "code5": "30300",
        "code6": "393000"
      },
      {
        "name": "Huyện Phong Thổ",
        "code5": "30400",
        "code6": "394000"
      },
      {
        "name": "Huyện Sìn Hồ",
        "code5": "30500",
        "code6": "395000"
      },
      {
        "name": "Huyện Tam Đường",
        "code5": "30600",
        "code6": "396000"
      },
      {
        "name": "Huyện Tân Uyên",
        "code5": "30700",
        "code6": "397000"
      },
      {
        "name": "Huyện Than Uyên",
        "code5": "30800",
        "code6": "398000"
      }
    ]
  },
  {
    "id": "langson",
    "name": "Lạng Sơn",
    "codes": [
      "25"
    ],
    "code5": "25000",
    "code6": "240000",
    "note": "Giữ nguyên",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Lạng Sơn - 29 Lê Lợi, P. Vĩnh Trại, TP. Lạng Sơn",
    "searchKey": "lang son ls cua keo tan thanh",
    "districts": [
      {
        "name": "TP. Lạng Sơn",
        "code5": "25100",
        "code6": "241000"
      },
      {
        "name": "Huyện Bắc Sơn",
        "code5": "25200",
        "code6": "242000"
      },
      {
        "name": "Huyện Bình Gia",
        "code5": "25300",
        "code6": "243000"
      },
      {
        "name": "Huyện Cao Lộc",
        "code5": "25400",
        "code6": "244000"
      },
      {
        "name": "Huyện Chi Lăng",
        "code5": "25500",
        "code6": "245000"
      },
      {
        "name": "Huyện Đình Lập",
        "code5": "25600",
        "code6": "246000"
      },
      {
        "name": "Huyện Hữu Lũng",
        "code5": "25700",
        "code6": "247000"
      },
      {
        "name": "Huyện Lộc Bình",
        "code5": "25800",
        "code6": "248000"
      },
      {
        "name": "Huyện Tràng Định",
        "code5": "25900",
        "code6": "249000"
      },
      {
        "name": "Huyện Văn Lãng",
        "code5": "25010",
        "code6": "249500"
      },
      {
        "name": "Huyện Văn Quan",
        "code5": "25020",
        "code6": "249600"
      }
    ]
  },
  {
    "id": "laocai",
    "name": "Lào Cai",
    "codes": [
      "31"
    ],
    "code5": "31000",
    "code6": "330000",
    "note": "Lào Cai + Yên Bái",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Lào Cai - Đường Hoàng Liên, P. Cốc Lếu, TP. Lào Cai",
    "searchKey": "lao cai lc sapa sa pa",
    "districts": [
      {
        "name": "TP. Lào Cai",
        "code5": "31100",
        "code6": "331000"
      },
      {
        "name": "TX. Sa Pa",
        "code5": "31200",
        "code6": "332000"
      },
      {
        "name": "Huyện Bắc Hà",
        "code5": "31300",
        "code6": "333000"
      },
      {
        "name": "Huyện Bảo Thắng",
        "code5": "31400",
        "code6": "334000"
      },
      {
        "name": "Huyện Bảo Yên",
        "code5": "31500",
        "code6": "335000"
      },
      {
        "name": "Huyện Mường Khương",
        "code5": "31600",
        "code6": "336000"
      },
      {
        "name": "Huyện Si Ma Cai",
        "code5": "31700",
        "code6": "337000"
      },
      {
        "name": "Huyện Văn Bàn",
        "code5": "31800",
        "code6": "338000"
      }
    ]
  },
  {
    "id": "namdinh",
    "name": "Nam Định",
    "codes": [
      "07"
    ],
    "code5": "07000",
    "code6": "420000",
    "note": "Nam Định + Ninh Bình",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Nam Định - 04 Hà Huy Tập, P. Trần Hưng Đạo, TP. Nam Định",
    "searchKey": "nam dinh nd",
    "districts": [
      {
        "name": "TP. Nam Định",
        "code5": "07100",
        "code6": "421000"
      },
      {
        "name": "Huyện Giao Thủy",
        "code5": "07200",
        "code6": "422000"
      },
      {
        "name": "Huyện Hải Hậu",
        "code5": "07300",
        "code6": "423000"
      },
      {
        "name": "Huyện Mỹ Lộc",
        "code5": "07400",
        "code6": "424000"
      },
      {
        "name": "Huyện Nam Trực",
        "code5": "07500",
        "code6": "425000"
      },
      {
        "name": "Huyện Nghĩa Hưng",
        "code5": "07600",
        "code6": "426000"
      },
      {
        "name": "Huyện Trực Ninh",
        "code5": "07700",
        "code6": "427000"
      },
      {
        "name": "Huyện Vụ Bản",
        "code5": "07800",
        "code6": "428000"
      },
      {
        "name": "Huyện Xuân Trường",
        "code5": "07900",
        "code6": "429000"
      },
      {
        "name": "Huyện Ý Yên",
        "code5": "07010",
        "code6": "429500"
      }
    ]
  },
  {
    "id": "ninhbinh",
    "name": "Ninh Bình",
    "codes": [
      "08"
    ],
    "code5": "08000",
    "code6": "430000",
    "note": "Ninh Bình + Nam Định + Hà Nam",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Ninh Bình - Đường Trần Hưng Đạo, P. Đông Thành, TP. Ninh Bình",
    "searchKey": "ninh binh nb trang an",
    "districts": [
      {
        "name": "TP. Ninh Bình",
        "code5": "08100",
        "code6": "431000"
      },
      {
        "name": "TP. Tam Điệp",
        "code5": "08200",
        "code6": "432000"
      },
      {
        "name": "Huyện Gia Viễn",
        "code5": "08300",
        "code6": "433000"
      },
      {
        "name": "Huyện Hoa Lư",
        "code5": "08400",
        "code6": "434000"
      },
      {
        "name": "Huyện Kim Sơn",
        "code5": "08500",
        "code6": "435000"
      },
      {
        "name": "Huyện Nho Quan",
        "code5": "08600",
        "code6": "436000"
      },
      {
        "name": "Huyện Yên Khánh",
        "code5": "08700",
        "code6": "437000"
      },
      {
        "name": "Huyện Yên Mô",
        "code5": "08800",
        "code6": "438000"
      }
    ]
  },
  {
    "id": "phutho",
    "name": "Phú Thọ",
    "codes": [
      "35"
    ],
    "code5": "35000",
    "code6": "290000",
    "note": "Việt Trì - Đất Tổ",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Phú Thọ - 1144 Đại lộ Hùng Vương, TP. Việt Trì",
    "searchKey": "phu tho pt viet tri dat to",
    "districts": [
      {
        "name": "TP. Việt Trì",
        "code5": "35100",
        "code6": "291000"
      },
      {
        "name": "TX. Phú Thọ",
        "code5": "35200",
        "code6": "292000"
      },
      {
        "name": "Huyện Cẩm Khê",
        "code5": "35300",
        "code6": "293000"
      },
      {
        "name": "Huyện Đoan Hùng",
        "code5": "35400",
        "code6": "294000"
      },
      {
        "name": "Huyện Hạ Hòa",
        "code5": "35500",
        "code6": "295000"
      },
      {
        "name": "Huyện Lâm Thao",
        "code5": "35600",
        "code6": "296000"
      },
      {
        "name": "Huyện Phù Ninh",
        "code5": "35700",
        "code6": "297000"
      },
      {
        "name": "Huyện Tam Nông",
        "code5": "35800",
        "code6": "298000"
      },
      {
        "name": "Huyện Tân Sơn",
        "code5": "35900",
        "code6": "299000"
      },
      {
        "name": "Huyện Thanh Ba",
        "code5": "35010",
        "code6": "298500"
      },
      {
        "name": "Huyện Thanh Sơn",
        "code5": "35020",
        "code6": "298600"
      },
      {
        "name": "Huyện Thanh Thủy",
        "code5": "35030",
        "code6": "298700"
      },
      {
        "name": "Huyện Yên Lập",
        "code5": "35040",
        "code6": "298800"
      }
    ]
  },
  {
    "id": "quangninh",
    "name": "Quảng Ninh",
    "codes": [
      "01",
      "02"
    ],
    "code5": "01000",
    "code6": "200000",
    "note": "Hạ Long - Cẩm Phả - Uông Bí - Móng Cái",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Quảng Ninh - 539 Lê Thánh Tông, P. Bạch Đằng, TP. Hạ Long",
    "searchKey": "quang ninh qn ha long vinh ha long",
    "districts": [
      {
        "name": "TP. Hạ Long",
        "code5": "01100",
        "code6": "201000"
      },
      {
        "name": "TP. Cẩm Phả",
        "code5": "01200",
        "code6": "202000"
      },
      {
        "name": "TP. Uông Bí",
        "code5": "01300",
        "code6": "203000"
      },
      {
        "name": "TP. Móng Cái",
        "code5": "01400",
        "code6": "204000"
      },
      {
        "name": "TX. Đông Triều",
        "code5": "01500",
        "code6": "205000"
      },
      {
        "name": "TX. Quảng Yên",
        "code5": "01600",
        "code6": "206000"
      },
      {
        "name": "Huyện Ba Chẽ",
        "code5": "01700",
        "code6": "207000"
      },
      {
        "name": "Huyện Bình Liêu",
        "code5": "01800",
        "code6": "208000"
      },
      {
        "name": "Huyện Cô Tô",
        "code5": "01900",
        "code6": "209000"
      },
      {
        "name": "Huyện Đầm Hà",
        "code5": "02100",
        "code6": "210000"
      },
      {
        "name": "Huyện Hải Hà",
        "code5": "02200",
        "code6": "211000"
      },
      {
        "name": "Huyện Tiên Yên",
        "code5": "02300",
        "code6": "212000"
      },
      {
        "name": "Huyện Vân Đồn",
        "code5": "02400",
        "code6": "213000"
      }
    ]
  },
  {
    "id": "sonla",
    "name": "Sơn La",
    "codes": [
      "34"
    ],
    "code5": "34000",
    "code6": "360000",
    "note": "Sơn La - Mộc Châu",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Sơn La - Đường Tô Hiệu, P. Chiềng Lề, TP. Sơn La",
    "searchKey": "son la sl moc chau",
    "districts": [
      {
        "name": "TP. Sơn La",
        "code5": "34100",
        "code6": "361000"
      },
      {
        "name": "Huyện Bắc Yên",
        "code5": "34200",
        "code6": "362000"
      },
      {
        "name": "Huyện Mai Sơn",
        "code5": "34300",
        "code6": "363000"
      },
      {
        "name": "Huyện Mộc Châu",
        "code5": "34400",
        "code6": "364000"
      },
      {
        "name": "Huyện Mường La",
        "code5": "34500",
        "code6": "365000"
      },
      {
        "name": "Huyện Phù Yên",
        "code5": "34600",
        "code6": "366000"
      },
      {
        "name": "Huyện Quỳnh Nhai",
        "code5": "34700",
        "code6": "367000"
      },
      {
        "name": "Huyện Sông Mã",
        "code5": "34800",
        "code6": "368000"
      },
      {
        "name": "Huyện Sốp Cộp",
        "code5": "34900",
        "code6": "369000"
      },
      {
        "name": "Huyện Thuận Châu",
        "code5": "34010",
        "code6": "369500"
      },
      {
        "name": "Huyện Vân Hồ",
        "code5": "34020",
        "code6": "369600"
      },
      {
        "name": "Huyện Yên Châu",
        "code5": "34030",
        "code6": "369700"
      }
    ]
  },
  {
    "id": "thaibinh",
    "name": "Thái Bình",
    "codes": [
      "06"
    ],
    "code5": "06000",
    "code6": "410000",
    "note": "Thái Bình + Hưng Yên",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Thái Bình - 10 Lê Lợi, TP. Thái Bình",
    "searchKey": "thai binh tb",
    "districts": [
      {
        "name": "TP. Thái Bình",
        "code5": "06100",
        "code6": "411000"
      },
      {
        "name": "Huyện Đông Hưng",
        "code5": "06200",
        "code6": "412000"
      },
      {
        "name": "Huyện Hưng Hà",
        "code5": "06300",
        "code6": "413000"
      },
      {
        "name": "Huyện Kiến Xương",
        "code5": "06400",
        "code6": "414000"
      },
      {
        "name": "Huyện Quỳnh Phụ",
        "code5": "06500",
        "code6": "415000"
      },
      {
        "name": "Huyện Thái Thụy",
        "code5": "06600",
        "code6": "416000"
      },
      {
        "name": "Huyện Tiền Hải",
        "code5": "06700",
        "code6": "417000"
      },
      {
        "name": "Huyện Vũ Thư",
        "code5": "06800",
        "code6": "418000"
      }
    ]
  },
  {
    "id": "thainguyen",
    "name": "Thái Nguyên",
    "codes": [
      "24"
    ],
    "code5": "24000",
    "code6": "250000",
    "note": "Thái Nguyên + Bắc Kạn",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Thái Nguyên - 10 Cách Mạng Tháng 8, P. Phan Đình Phùng, TP. Thái Nguyên",
    "searchKey": "thai nguyen tn",
    "districts": [
      {
        "name": "TP. Thái Nguyên",
        "code5": "24100",
        "code6": "251000"
      },
      {
        "name": "TP. Sông Công",
        "code5": "24200",
        "code6": "252000"
      },
      {
        "name": "TP. Phổ Yên",
        "code5": "24300",
        "code6": "253000"
      },
      {
        "name": "TX. Gia Sàng",
        "code5": "24400",
        "code6": "254000"
      },
      {
        "name": "Huyện Định Hóa",
        "code5": "24500",
        "code6": "255000"
      },
      {
        "name": "Huyện Đại Từ",
        "code5": "24600",
        "code6": "256000"
      },
      {
        "name": "Huyện Đồng Hỷ",
        "code5": "24700",
        "code6": "257000"
      },
      {
        "name": "Huyện Phú Bình",
        "code5": "24800",
        "code6": "258000"
      },
      {
        "name": "Huyện Phú Lương",
        "code5": "24900",
        "code6": "259000"
      },
      {
        "name": "Huyện Võ Nhai",
        "code5": "24010",
        "code6": "259500"
      }
    ]
  },
  {
    "id": "tuyenquang",
    "name": "Tuyên Quang",
    "codes": [
      "22"
    ],
    "code5": "22000",
    "code6": "300000",
    "note": "Tuyên Quang + Hà Giang",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Tuyên Quang - 02 Bình Thuận, P. Tân Quang, TP. Tuyên Quang",
    "searchKey": "tuyen quang tq",
    "districts": [
      {
        "name": "TP. Tuyên Quang",
        "code5": "22100",
        "code6": "301000"
      },
      {
        "name": "Huyện Chiêm Hóa",
        "code5": "22200",
        "code6": "302000"
      },
      {
        "name": "Huyện Hàm Yên",
        "code5": "22300",
        "code6": "303000"
      },
      {
        "name": "Huyện Lâm Bình",
        "code5": "22400",
        "code6": "304000"
      },
      {
        "name": "Huyện Na Hang",
        "code5": "22500",
        "code6": "305000"
      },
      {
        "name": "Huyện Sơn Dương",
        "code5": "22600",
        "code6": "306000"
      },
      {
        "name": "Huyện Yên Sơn",
        "code5": "22700",
        "code6": "307000"
      }
    ]
  },
  {
    "id": "vinhphuc",
    "name": "Vĩnh Phúc",
    "codes": [
      "15"
    ],
    "code5": "15000",
    "code6": "280000",
    "note": "Vĩnh Yên - Phúc Yên",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Vĩnh Phúc - Phường Khai Quang, TP. Vĩnh Yên",
    "searchKey": "vinh phuc vp",
    "districts": [
      {
        "name": "TP. Vĩnh Yên",
        "code5": "15100",
        "code6": "281000"
      },
      {
        "name": "TP. Phúc Yên",
        "code5": "15200",
        "code6": "282000"
      },
      {
        "name": "Huyện Bình Xuyên",
        "code5": "15300",
        "code6": "283000"
      },
      {
        "name": "Huyện Lập Thạch",
        "code5": "15400",
        "code6": "284000"
      },
      {
        "name": "Huyện Sông Lô",
        "code5": "15500",
        "code6": "285000"
      },
      {
        "name": "Huyện Tam Đảo",
        "code5": "15600",
        "code6": "286000"
      },
      {
        "name": "Huyện Tam Dương",
        "code5": "15700",
        "code6": "287000"
      },
      {
        "name": "Huyện Vĩnh Tường",
        "code5": "15800",
        "code6": "288000"
      },
      {
        "name": "Huyện Yên Lạc",
        "code5": "15900",
        "code6": "289000"
      }
    ]
  },
  {
    "id": "yenbai",
    "name": "Yên Bái",
    "codes": [
      "33"
    ],
    "code5": "33000",
    "code6": "320000",
    "note": "Yên Bái + Lào Cai",
    "region": "Miền Bắc",
    "centerPostOffice": "Bưu điện tỉnh Yên Bái - 247 Đinh Tiên Hoàng, P. Đồng Tâm, TP. Yên Bái",
    "searchKey": "yen bai yb mu cang chai",
    "districts": [
      {
        "name": "TP. Yên Bái",
        "code5": "33100",
        "code6": "321000"
      },
      {
        "name": "TX. Nghĩa Lộ",
        "code5": "33200",
        "code6": "322000"
      },
      {
        "name": "Huyện Lục Yên",
        "code5": "33300",
        "code6": "323000"
      },
      {
        "name": "Huyện Mù Cang Chải",
        "code5": "33400",
        "code6": "324000"
      },
      {
        "name": "Huyện Trạm Tấu",
        "code5": "33500",
        "code6": "325000"
      },
      {
        "name": "Huyện Trấn Yên",
        "code5": "33600",
        "code6": "326000"
      },
      {
        "name": "Huyện Văn Chấn",
        "code5": "33700",
        "code6": "327000"
      },
      {
        "name": "Huyện Văn Yên",
        "code5": "33800",
        "code6": "328000"
      },
      {
        "name": "Huyện Yên Bình",
        "code5": "33900",
        "code6": "329000"
      }
    ]
  },
  {
    "id": "binhdinh",
    "name": "Bình Định",
    "codes": [
      "55"
    ],
    "code5": "55000",
    "code6": "590000",
    "note": "Bình Định + Gia Lai",
    "region": "Miền Trung",
    "centerPostOffice": "Bưu điện tỉnh Bình Định - 127 Hai Bà Trưng, P. Lê Lợi, TP. Quy Nhơn",
    "searchKey": "binh dinh bd quy nhon",
    "districts": [
      {
        "name": "TP. Quy Nhơn",
        "code5": "55100",
        "code6": "591000"
      },
      {
        "name": "TX. An Nhơn",
        "code5": "55200",
        "code6": "592000"
      },
      {
        "name": "TX. Hoài Nhơn",
        "code5": "55300",
        "code6": "593000"
      },
      {
        "name": "Huyện An Lão",
        "code5": "55400",
        "code6": "594000"
      },
      {
        "name": "Huyện Hoài Ân",
        "code5": "55500",
        "code6": "595000"
      },
      {
        "name": "Huyện Phù Cát",
        "code5": "55600",
        "code6": "596000"
      },
      {
        "name": "Huyện Phù Mỹ",
        "code5": "55700",
        "code6": "597000"
      },
      {
        "name": "Huyện Tây Sơn",
        "code5": "55800",
        "code6": "598000"
      },
      {
        "name": "Huyện Tuy Phước",
        "code5": "55900",
        "code6": "599000"
      },
      {
        "name": "Huyện Vân Canh",
        "code5": "55010",
        "code6": "599500"
      },
      {
        "name": "Huyện Vĩnh Thạnh",
        "code5": "55020",
        "code6": "599600"
      }
    ]
  },
  {
    "id": "daklak",
    "name": "Đắk Lắk",
    "codes": [
      "63",
      "64"
    ],
    "code5": "63000",
    "code6": "630000",
    "note": "Đắk Lắk + Phú Yên",
    "region": "Miền Trung",
    "centerPostOffice": "Bưu điện tỉnh Đắk Lắk - 06 Lê Duẩn, P. Tân Thành, TP. Buôn Ma Thuột",
    "searchKey": "dak lak dl buon ma thuot tay nguyen",
    "districts": [
      {
        "name": "TP. Buôn Ma Thuột",
        "code5": "63100",
        "code6": "631000"
      },
      {
        "name": "TX. Buôn Hồ",
        "code5": "63200",
        "code6": "632000"
      },
      {
        "name": "Huyện Buôn Đôn",
        "code5": "63300",
        "code6": "633000"
      },
      {
        "name": "Huyện Cư Kuin",
        "code5": "63400",
        "code6": "634000"
      },
      {
        "name": "Huyện Cư M'gar",
        "code5": "63500",
        "code6": "635000"
      },
      {
        "name": "Huyện Ea H'leo",
        "code5": "63600",
        "code6": "636000"
      },
      {
        "name": "Huyện Ea Kar",
        "code5": "63700",
        "code6": "637000"
      },
      {
        "name": "Huyện Ea Súp",
        "code5": "63800",
        "code6": "638000"
      },
      {
        "name": "Huyện Krông Ana",
        "code5": "63900",
        "code6": "639000"
      },
      {
        "name": "Huyện Krông Bông",
        "code5": "64100",
        "code6": "639500"
      },
      {
        "name": "Huyện Krông Búk",
        "code5": "64200",
        "code6": "639600"
      },
      {
        "name": "Huyện Krông Năng",
        "code5": "64300",
        "code6": "639700"
      },
      {
        "name": "Huyện Krông Pắc",
        "code5": "64400",
        "code6": "639800"
      },
      {
        "name": "Huyện Lắk",
        "code5": "64500",
        "code6": "639900"
      },
      {
        "name": "Huyện M'Drắk",
        "code5": "64600",
        "code6": "639100"
      }
    ]
  },
  {
    "id": "daknong",
    "name": "Đắk Nông",
    "codes": [
      "65"
    ],
    "code5": "65000",
    "code6": "640000",
    "note": "Đắk Nông + Lâm Đồng",
    "region": "Miền Trung",
    "centerPostOffice": "Bưu điện tỉnh Đắk Nông - P. Nghĩa Trung, TP. Gia Nghĩa",
    "searchKey": "dak nong dn gia nghia",
    "districts": [
      {
        "name": "TP. Gia Nghĩa",
        "code5": "65100",
        "code6": "641000"
      },
      {
        "name": "Huyện Cư Jút",
        "code5": "65200",
        "code6": "642000"
      },
      {
        "name": "Huyện Đắk G'Long",
        "code5": "65300",
        "code6": "643000"
      },
      {
        "name": "Huyện Đắk Mil",
        "code5": "65400",
        "code6": "644000"
      },
      {
        "name": "Huyện Đắk R'Lấp",
        "code5": "65500",
        "code6": "645000"
      },
      {
        "name": "Huyện Đắk Song",
        "code5": "65600",
        "code6": "646000"
      },
      {
        "name": "Huyện Krông Nô",
        "code5": "65700",
        "code6": "647000"
      },
      {
        "name": "Huyện Tuy Đức",
        "code5": "65800",
        "code6": "648000"
      }
    ]
  },
  {
    "id": "gialai",
    "name": "Gia Lai",
    "codes": [
      "61",
      "62"
    ],
    "code5": "61000",
    "code6": "600000",
    "note": "Gia Lai + Bình Định",
    "region": "Miền Trung",
    "centerPostOffice": "Bưu điện tỉnh Gia Lai - 69 Hùng Vương, P. Diên Hồng, TP. Pleiku",
    "searchKey": "gia lai gl pleiku an khe",
    "districts": [
      {
        "name": "TP. Pleiku",
        "code5": "61100",
        "code6": "601000"
      },
      {
        "name": "TX. An Khê",
        "code5": "61200",
        "code6": "602000"
      },
      {
        "name": "TX. Ayun Pa",
        "code5": "61300",
        "code6": "603000"
      },
      {
        "name": "Huyện Chư Păh",
        "code5": "61400",
        "code6": "604000"
      },
      {
        "name": "Huyện Chư Prông",
        "code5": "61500",
        "code6": "605000"
      },
      {
        "name": "Huyện Chư Pưh",
        "code5": "61600",
        "code6": "606000"
      },
      {
        "name": "Huyện Chư Sê",
        "code5": "61700",
        "code6": "607000"
      },
      {
        "name": "Huyện Đắk Đoa",
        "code5": "61800",
        "code6": "608000"
      },
      {
        "name": "Huyện Đắk Pơ",
        "code5": "61900",
        "code6": "609000"
      },
      {
        "name": "Huyện Đức Cơ",
        "code5": "62100",
        "code6": "609500"
      },
      {
        "name": "Huyện Ia Grai",
        "code5": "62200",
        "code6": "609600"
      },
      {
        "name": "Huyện Ia Pa",
        "code5": "62300",
        "code6": "609700"
      },
      {
        "name": "Huyện K'Bang",
        "code5": "62400",
        "code6": "609800"
      },
      {
        "name": "Huyện Kbang",
        "code5": "62500",
        "code6": "609900"
      },
      {
        "name": "Huyện Krông Pa",
        "code5": "62600",
        "code6": "609100"
      },
      {
        "name": "Huyện Mang Yang",
        "code5": "62700",
        "code6": "609200"
      },
      {
        "name": "Huyện Phú Thiện",
        "code5": "62800",
        "code6": "609300"
      }
    ]
  },
  {
    "id": "hatinh",
    "name": "Hà Tĩnh",
    "codes": [
      "45",
      "46"
    ],
    "code5": "45000",
    "code6": "480000",
    "note": "Giữ nguyên",
    "region": "Miền Trung",
    "centerPostOffice": "Bưu điện tỉnh Hà Tĩnh - 115 Phan Đình Phùng, TP. Hà Tĩnh",
    "searchKey": "ha tinh ht hong linh",
    "districts": [
      {
        "name": "TP. Hà Tĩnh",
        "code5": "45100",
        "code6": "481000"
      },
      {
        "name": "TX. Hồng Lĩnh",
        "code5": "45200",
        "code6": "482000"
      },
      {
        "name": "TX. Kỳ Anh",
        "code5": "45300",
        "code6": "483000"
      },
      {
        "name": "Huyện Can Lộc",
        "code5": "45400",
        "code6": "484000"
      },
      {
        "name": "Huyện Cẩm Xuyên",
        "code5": "45500",
        "code6": "485000"
      },
      {
        "name": "Huyện Đức Thọ",
        "code5": "45600",
        "code6": "486000"
      },
      {
        "name": "Huyện Hương Khê",
        "code5": "45700",
        "code6": "487000"
      },
      {
        "name": "Huyện Hương Sơn",
        "code5": "45800",
        "code6": "488000"
      },
      {
        "name": "Huyện Kỳ Anh",
        "code5": "46100",
        "code6": "489000"
      },
      {
        "name": "Huyện Lộc Hà",
        "code5": "46200",
        "code6": "489500"
      },
      {
        "name": "Huyện Nghi Xuân",
        "code5": "46300",
        "code6": "489600"
      },
      {
        "name": "Huyện Thạch Hà",
        "code5": "46400",
        "code6": "489700"
      },
      {
        "name": "Huyện Vũ Quang",
        "code5": "46500",
        "code6": "489800"
      }
    ]
  },
  {
    "id": "khanhhoa",
    "name": "Khánh Hòa",
    "codes": [
      "57"
    ],
    "code5": "57000",
    "code6": "650000",
    "note": "Nha Trang - Cam Ranh",
    "region": "Miền Trung",
    "centerPostOffice": "Bưu điện tỉnh Khánh Hòa - 02 Trần Phú, P. Xương Huân, TP. Nha Trang",
    "searchKey": "khanh hoa kh nha trang cam ranh",
    "districts": [
      {
        "name": "TP. Nha Trang",
        "code5": "57100",
        "code6": "651000"
      },
      {
        "name": "TP. Cam Ranh",
        "code5": "57200",
        "code6": "652000"
      },
      {
        "name": "TX. Ninh Hòa",
        "code5": "57300",
        "code6": "653000"
      },
      {
        "name": "Huyện Cam Lâm",
        "code5": "57400",
        "code6": "654000"
      },
      {
        "name": "Huyện Diên Khánh",
        "code5": "57500",
        "code6": "655000"
      },
      {
        "name": "Huyện Khánh Sơn",
        "code5": "57600",
        "code6": "656000"
      },
      {
        "name": "Huyện Khánh Vĩnh",
        "code5": "57700",
        "code6": "657000"
      },
      {
        "name": "Huyện Trường Sa",
        "code5": "57800",
        "code6": "658000"
      },
      {
        "name": "Huyện Vạn Ninh",
        "code5": "57900",
        "code6": "659000"
      }
    ]
  },
  {
    "id": "kontum",
    "name": "Kon Tum",
    "codes": [
      "60"
    ],
    "code5": "60000",
    "code6": "580000",
    "note": "Kon Tum + Quảng Ngãi",
    "region": "Miền Trung",
    "centerPostOffice": "Bưu điện tỉnh Kon Tum - 245 Lê Hồng Phong, P. Quyết Thắng, TP. Kon Tum",
    "searchKey": "kon tum kt",
    "districts": [
      {
        "name": "TP. Kon Tum",
        "code5": "60100",
        "code6": "581000"
      },
      {
        "name": "Huyện Đắk Glei",
        "code5": "60200",
        "code6": "582000"
      },
      {
        "name": "Huyện Đắk Hà",
        "code5": "60300",
        "code6": "583000"
      },
      {
        "name": "Huyện Đắk Tô",
        "code5": "60400",
        "code6": "584000"
      },
      {
        "name": "Huyện Ia H'Drai",
        "code5": "60500",
        "code6": "585000"
      },
      {
        "name": "Huyện Kon Plông",
        "code5": "60600",
        "code6": "586000"
      },
      {
        "name": "Huyện Kon Rẫy",
        "code5": "60700",
        "code6": "587000"
      },
      {
        "name": "Huyện Ngọc Hồi",
        "code5": "60800",
        "code6": "588000"
      },
      {
        "name": "Huyện Sa Thầy",
        "code5": "60900",
        "code6": "589000"
      },
      {
        "name": "Huyện Tu Mơ Rông",
        "code5": "60010",
        "code6": "589500"
      }
    ]
  },
  {
    "id": "lamdong",
    "name": "Lâm Đồng",
    "codes": [
      "66"
    ],
    "code5": "66000",
    "code6": "670000",
    "note": "Đà Lạt - Bảo Lộc",
    "region": "Miền Trung",
    "centerPostOffice": "Bưu điện tỉnh Lâm Đồng - 14 Trần Phú, Phường 3, TP. Đà Lạt",
    "searchKey": "lam dong ld da lat bao loc",
    "districts": [
      {
        "name": "TP. Đà Lạt",
        "code5": "66100",
        "code6": "671000"
      },
      {
        "name": "TP. Bảo Lộc",
        "code5": "66200",
        "code6": "672000"
      },
      {
        "name": "Huyện Bảo Lâm",
        "code5": "66300",
        "code6": "673000"
      },
      {
        "name": "Huyện Cát Tiên",
        "code5": "66400",
        "code6": "674000"
      },
      {
        "name": "Huyện Đam Rông",
        "code5": "66500",
        "code6": "675000"
      },
      {
        "name": "Huyện Di Linh",
        "code5": "66600",
        "code6": "676000"
      },
      {
        "name": "Huyện Đơn Dương",
        "code5": "66700",
        "code6": "677000"
      },
      {
        "name": "Huyện Đức Trọng",
        "code5": "66800",
        "code6": "678000"
      },
      {
        "name": "Huyện Lạc Dương",
        "code5": "66900",
        "code6": "679000"
      },
      {
        "name": "Huyện Lâm Hà",
        "code5": "66010",
        "code6": "679500"
      }
    ]
  },
  {
    "id": "nghean",
    "name": "Nghệ An",
    "codes": [
      "43",
      "44"
    ],
    "code5": "43000",
    "code6": "460000",
    "note": "Giữ nguyên",
    "region": "Miền Trung",
    "centerPostOffice": "Bưu điện tỉnh Nghệ An - 02 Hồ Tùng Mậu, P. Quán Bàu, TP. Vinh",
    "searchKey": "nghe an na vinh cua lo",
    "districts": [
      {
        "name": "TP. Vinh",
        "code5": "43100",
        "code6": "461000"
      },
      {
        "name": "TX. Cửa Lò",
        "code5": "43200",
        "code6": "462000"
      },
      {
        "name": "TX. Hoàng Mai",
        "code5": "43300",
        "code6": "463000"
      },
      {
        "name": "TX. Thái Hòa",
        "code5": "43400",
        "code6": "464000"
      },
      {
        "name": "Huyện Anh Sơn",
        "code5": "43500",
        "code6": "465000"
      },
      {
        "name": "Huyện Con Cuông",
        "code5": "43600",
        "code6": "466000"
      },
      {
        "name": "Huyện Diễn Châu",
        "code5": "43700",
        "code6": "467000"
      },
      {
        "name": "Huyện Đô Lương",
        "code5": "43800",
        "code6": "468000"
      },
      {
        "name": "Huyện Hưng Nguyên",
        "code5": "43900",
        "code6": "469000"
      },
      {
        "name": "Huyện Kỳ Sơn",
        "code5": "44100",
        "code6": "469500"
      },
      {
        "name": "Huyện Nam Đàn",
        "code5": "44200",
        "code6": "469600"
      },
      {
        "name": "Huyện Nghĩa Đàn",
        "code5": "44300",
        "code6": "469700"
      },
      {
        "name": "Huyện Nghi Lộc",
        "code5": "44400",
        "code6": "469800"
      },
      {
        "name": "Huyện Quế Phong",
        "code5": "44500",
        "code6": "469900"
      },
      {
        "name": "Huyện Quỳ Châu",
        "code5": "44600",
        "code6": "469100"
      },
      {
        "name": "Huyện Quỳ Hợp",
        "code5": "44700",
        "code6": "469200"
      },
      {
        "name": "Huyện Quỳnh Lưu",
        "code5": "44800",
        "code6": "469300"
      },
      {
        "name": "Huyện Tân Kỳ",
        "code5": "44900",
        "code6": "469400"
      },
      {
        "name": "Huyện Tương Dương",
        "code5": "44010",
        "code6": "469010"
      },
      {
        "name": "Huyện Yên Thành",
        "code5": "44020",
        "code6": "469020"
      }
    ]
  },
  {
    "id": "ninhthuan",
    "name": "Ninh Thuận",
    "codes": [
      "59"
    ],
    "code5": "59000",
    "code6": "660000",
    "note": "Phan Rang - Tháp Chàm",
    "region": "Miền Trung",
    "centerPostOffice": "Bưu điện tỉnh Ninh Thuận - 17 Thống Nhất, TP. Phan Rang - Tháp Chàm",
    "searchKey": "ninh thuan nt phan rang",
    "districts": [
      {
        "name": "TP. Phan Rang - Tháp Chàm",
        "code5": "59100",
        "code6": "661000"
      },
      {
        "name": "Huyện Bác Ái",
        "code5": "59200",
        "code6": "662000"
      },
      {
        "name": "Huyện Ninh Hải",
        "code5": "59300",
        "code6": "663000"
      },
      {
        "name": "Huyện Ninh Phước",
        "code5": "59400",
        "code6": "664000"
      },
      {
        "name": "Huyện Ninh Sơn",
        "code5": "59500",
        "code6": "665000"
      },
      {
        "name": "Huyện Thuận Bắc",
        "code5": "59600",
        "code6": "666000"
      },
      {
        "name": "Huyện Thuận Nam",
        "code5": "59700",
        "code6": "667000"
      }
    ]
  },
  {
    "id": "phuyen",
    "name": "Phú Yên",
    "codes": [
      "56"
    ],
    "code5": "56000",
    "code6": "620000",
    "note": "Tuy Hòa - Sông Cầu",
    "region": "Miền Trung",
    "centerPostOffice": "Bưu điện tỉnh Phú Yên - 206 Trần Hưng Đạo, Phường 4, TP. Tuy Hòa",
    "searchKey": "phu yen py tuy hoa song cau",
    "districts": [
      {
        "name": "TP. Tuy Hòa",
        "code5": "56100",
        "code6": "621000"
      },
      {
        "name": "TX. Sông Cầu",
        "code5": "56200",
        "code6": "622000"
      },
      {
        "name": "Huyện Đông Hòa",
        "code5": "56300",
        "code6": "623000"
      },
      {
        "name": "Huyện Đồng Xuân",
        "code5": "56400",
        "code6": "624000"
      },
      {
        "name": "Huyện Phú Hòa",
        "code5": "56500",
        "code6": "625000"
      },
      {
        "name": "Huyện Sông Hinh",
        "code5": "56600",
        "code6": "626000"
      },
      {
        "name": "Huyện Sơn Hòa",
        "code5": "56700",
        "code6": "627000"
      },
      {
        "name": "Huyện Tây Hòa",
        "code5": "56800",
        "code6": "628000"
      },
      {
        "name": "Huyện Tuy An",
        "code5": "56900",
        "code6": "629000"
      }
    ]
  },
  {
    "id": "quangbinh",
    "name": "Quảng Bình",
    "codes": [
      "47"
    ],
    "code5": "47000",
    "code6": "510000",
    "note": "Đồng Hới - Phong Nha",
    "region": "Miền Trung",
    "centerPostOffice": "Bưu điện tỉnh Quảng Bình - 01 Hùng Vương, P. Đồng Hải, TP. Đồng Hới",
    "searchKey": "quang binh qb dong hoi phong nha",
    "districts": [
      {
        "name": "TP. Đồng Hới",
        "code5": "47100",
        "code6": "511000"
      },
      {
        "name": "TX. Ba Đồn",
        "code5": "47200",
        "code6": "512000"
      },
      {
        "name": "Huyện Bố Trạch",
        "code5": "47300",
        "code6": "513000"
      },
      {
        "name": "Huyện Lệ Thủy",
        "code5": "47400",
        "code6": "514000"
      },
      {
        "name": "Huyện Minh Hóa",
        "code5": "47500",
        "code6": "515000"
      },
      {
        "name": "Huyện Quảng Ninh",
        "code5": "47600",
        "code6": "516000"
      },
      {
        "name": "Huyện Quảng Trạch",
        "code5": "47700",
        "code6": "517000"
      },
      {
        "name": "Huyện Tuyên Hóa",
        "code5": "47800",
        "code6": "518000"
      }
    ]
  },
  {
    "id": "quangnam",
    "name": "Quảng Nam",
    "codes": [
      "51",
      "52"
    ],
    "code5": "51000",
    "code6": "560000",
    "note": "Tam Kỳ - Hội An",
    "region": "Miền Trung",
    "centerPostOffice": "Bưu điện tỉnh Quảng Nam - 06 Trần Phú, TP. Tam Kỳ",
    "searchKey": "quang nam qnam tam ky hoi an",
    "districts": [
      {
        "name": "TP. Tam Kỳ",
        "code5": "51100",
        "code6": "561000"
      },
      {
        "name": "TP. Hội An",
        "code5": "51200",
        "code6": "562000"
      },
      {
        "name": "TX. Điện Bàn",
        "code5": "51300",
        "code6": "563000"
      },
      {
        "name": "Huyện Bắc Trà My",
        "code5": "51400",
        "code6": "564000"
      },
      {
        "name": "Huyện Duy Xuyên",
        "code5": "51500",
        "code6": "565000"
      },
      {
        "name": "Huyện Đại Lộc",
        "code5": "51600",
        "code6": "566000"
      },
      {
        "name": "Huyện Đông Giang",
        "code5": "51700",
        "code6": "567000"
      },
      {
        "name": "Huyện Hiệp Đức",
        "code5": "51800",
        "code6": "568000"
      },
      {
        "name": "Huyện Nam Giang",
        "code5": "52100",
        "code6": "568500"
      },
      {
        "name": "Huyện Nam Trà My",
        "code5": "52200",
        "code6": "568600"
      },
      {
        "name": "Huyện Nông Sơn",
        "code5": "52300",
        "code6": "568700"
      },
      {
        "name": "Huyện Núi Thành",
        "code5": "52400",
        "code6": "568800"
      },
      {
        "name": "Huyện Phú Ninh",
        "code5": "52500",
        "code6": "568900"
      },
      {
        "name": "Huyện Phước Sơn",
        "code5": "52600",
        "code6": "568100"
      },
      {
        "name": "Huyện Quế Sơn",
        "code5": "52700",
        "code6": "568200"
      },
      {
        "name": "Huyện Tây Giang",
        "code5": "52800",
        "code6": "568300"
      },
      {
        "name": "Huyện Thăng Bình",
        "code5": "52900",
        "code6": "568400"
      },
      {
        "name": "Huyện Tiên Phước",
        "code5": "52010",
        "code6": "568010"
      }
    ]
  },
  {
    "id": "quangngai",
    "name": "Quảng Ngãi",
    "codes": [
      "53",
      "54"
    ],
    "code5": "53000",
    "code6": "570000",
    "note": "Quảng Ngãi + Kon Tum",
    "region": "Miền Trung",
    "centerPostOffice": "Bưu điện tỉnh Quảng Ngãi - 70 Hùng Vương, P. Trần Phú, TP. Quảng Ngãi",
    "searchKey": "quang ngai qng",
    "districts": [
      {
        "name": "TP. Quảng Ngãi",
        "code5": "53100",
        "code6": "571000"
      },
      {
        "name": "TX. Đức Phổ",
        "code5": "53200",
        "code6": "572000"
      },
      {
        "name": "Huyện Ba Tơ",
        "code5": "53300",
        "code6": "573000"
      },
      {
        "name": "Huyện Bình Sơn",
        "code5": "53400",
        "code6": "574000"
      },
      {
        "name": "Huyện Lý Sơn",
        "code5": "53500",
        "code6": "575000"
      },
      {
        "name": "Huyện Minh Long",
        "code5": "53600",
        "code6": "576000"
      },
      {
        "name": "Huyện Mộ Đức",
        "code5": "53700",
        "code6": "577000"
      },
      {
        "name": "Huyện Nghĩa Hành",
        "code5": "53800",
        "code6": "578000"
      },
      {
        "name": "Huyện Sơn Hà",
        "code5": "53900",
        "code6": "579000"
      },
      {
        "name": "Huyện Sơn Tây",
        "code5": "54100",
        "code6": "579500"
      },
      {
        "name": "Huyện Sơn Tịnh",
        "code5": "54200",
        "code6": "579600"
      },
      {
        "name": "Huyện Tây Trà",
        "code5": "54300",
        "code6": "579700"
      },
      {
        "name": "Huyện Tư Nghĩa",
        "code5": "54400",
        "code6": "579800"
      },
      {
        "name": "Huyện Trà Bồng",
        "code5": "54500",
        "code6": "579900"
      }
    ]
  },
  {
    "id": "quangtri",
    "name": "Quảng Trị",
    "codes": [
      "48"
    ],
    "code5": "48000",
    "code6": "520000",
    "note": "Đông Hà - Quảng Trị",
    "region": "Miền Trung",
    "centerPostOffice": "Bưu điện tỉnh Quảng Trị - 57 Ngô Quyền, P. 5, TP. Đông Hà",
    "searchKey": "quang tri qt dong ha",
    "districts": [
      {
        "name": "TP. Đông Hà",
        "code5": "48100",
        "code6": "521000"
      },
      {
        "name": "TX. Quảng Trị",
        "code5": "48200",
        "code6": "522000"
      },
      {
        "name": "Huyện Cam Lộ",
        "code5": "48300",
        "code6": "523000"
      },
      {
        "name": "Huyện Cồn Cỏ",
        "code5": "48400",
        "code6": "524000"
      },
      {
        "name": "Huyện Đắk Rông",
        "code5": "48500",
        "code6": "525000"
      },
      {
        "name": "Huyện Gio Linh",
        "code5": "48600",
        "code6": "526000"
      },
      {
        "name": "Huyện Hải Lăng",
        "code5": "48700",
        "code6": "527000"
      },
      {
        "name": "Huyện Hướng Hóa",
        "code5": "48800",
        "code6": "528000"
      },
      {
        "name": "Huyện Triệu Phong",
        "code5": "48900",
        "code6": "529000"
      },
      {
        "name": "Huyện Vĩnh Linh",
        "code5": "48010",
        "code6": "529500"
      }
    ]
  },
  {
    "id": "hue",
    "name": "Thừa Thiên Huế",
    "codes": [
      "49"
    ],
    "code5": "49000",
    "code6": "530000",
    "note": "Cố đô Huế",
    "region": "Miền Trung",
    "centerPostOffice": "Bưu điện tỉnh TT Huế - 08 Hoàng Hoa Thám, P. Vĩnh Ninh, TP. Huế",
    "searchKey": "thua thien hue tth hue co do",
    "districts": [
      {
        "name": "TP. Huế",
        "code5": "49100",
        "code6": "531000"
      },
      {
        "name": "TX. Hương Thủy",
        "code5": "49200",
        "code6": "532000"
      },
      {
        "name": "TX. Hương Trà",
        "code5": "49300",
        "code6": "533000"
      },
      {
        "name": "Huyện A Lưới",
        "code5": "49400",
        "code6": "534000"
      },
      {
        "name": "Huyện Nam Đông",
        "code5": "49500",
        "code6": "535000"
      },
      {
        "name": "Huyện Phong Điền",
        "code5": "49600",
        "code6": "536000"
      },
      {
        "name": "Huyện Phú Lộc",
        "code5": "49700",
        "code6": "537000"
      },
      {
        "name": "Huyện Phú Vang",
        "code5": "49800",
        "code6": "538000"
      },
      {
        "name": "Huyện Quảng Điền",
        "code5": "49900",
        "code6": "539000"
      }
    ]
  },
  {
    "id": "thanhhoa",
    "name": "Thanh Hóa",
    "codes": [
      "40",
      "41",
      "42"
    ],
    "code5": "40000",
    "code6": "440000",
    "note": "Thanh Hóa - Sầm Sơn - Bỉm Sơn",
    "region": "Miền Trung",
    "centerPostOffice": "Bưu điện tỉnh Thanh Hóa - 27 Trần Phú, P. Điện Biên, TP. Thanh Hóa",
    "searchKey": "thanh hoa th sam son bim son",
    "districts": [
      {
        "name": "TP. Thanh Hóa",
        "code5": "40100",
        "code6": "441000"
      },
      {
        "name": "TP. Sầm Sơn",
        "code5": "40200",
        "code6": "442000"
      },
      {
        "name": "TX. Bỉm Sơn",
        "code5": "40300",
        "code6": "443000"
      },
      {
        "name": "Huyện Bá Thước",
        "code5": "40400",
        "code6": "444000"
      },
      {
        "name": "Huyện Cẩm Thủy",
        "code5": "40500",
        "code6": "445000"
      },
      {
        "name": "Huyện Đông Sơn",
        "code5": "40600",
        "code6": "446000"
      },
      {
        "name": "Huyện Hà Trung",
        "code5": "40700",
        "code6": "447000"
      },
      {
        "name": "Huyện Hậu Lộc",
        "code5": "40800",
        "code6": "448000"
      },
      {
        "name": "Huyện Hoằng Hóa",
        "code5": "40900",
        "code6": "449000"
      },
      {
        "name": "Huyện Lang Chánh",
        "code5": "41100",
        "code6": "449500"
      },
      {
        "name": "Huyện Mường Lát",
        "code5": "41200",
        "code6": "449600"
      },
      {
        "name": "Huyện Nga Sơn",
        "code5": "41300",
        "code6": "449700"
      },
      {
        "name": "Huyện Ngọc Lặc",
        "code5": "41400",
        "code6": "449800"
      },
      {
        "name": "Huyện Như Thanh",
        "code5": "41500",
        "code6": "449900"
      },
      {
        "name": "Huyện Như Xuân",
        "code5": "41600",
        "code6": "449100"
      },
      {
        "name": "Huyện Nông Cống",
        "code5": "41700",
        "code6": "449200"
      },
      {
        "name": "Huyện Quan Hóa",
        "code5": "41800",
        "code6": "449300"
      },
      {
        "name": "Huyện Quan Sơn",
        "code5": "41900",
        "code6": "449400"
      },
      {
        "name": "Huyện Quảng Xương",
        "code5": "42100",
        "code6": "449010"
      },
      {
        "name": "Huyện Thạch Thành",
        "code5": "42200",
        "code6": "449020"
      },
      {
        "name": "Huyện Thiệu Hóa",
        "code5": "42300",
        "code6": "449030"
      },
      {
        "name": "Huyện Thọ Xuân",
        "code5": "42400",
        "code6": "449040"
      },
      {
        "name": "Huyện Thường Xuân",
        "code5": "42500",
        "code6": "449050"
      },
      {
        "name": "Huyện Tĩnh Gia",
        "code5": "42600",
        "code6": "449060"
      },
      {
        "name": "Huyện Triệu Sơn",
        "code5": "42700",
        "code6": "449070"
      },
      {
        "name": "Huyện Vĩnh Lộc",
        "code5": "42800",
        "code6": "449080"
      },
      {
        "name": "Huyện Yên Định",
        "code5": "42900",
        "code6": "449090"
      }
    ]
  },
  {
    "id": "angiang",
    "name": "An Giang",
    "codes": [
      "90",
      "91",
      "92"
    ],
    "code5": "90000",
    "code6": "880000",
    "note": "An Giang + Kiên Giang",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện tỉnh An Giang - 04 Hai Bà Trưng, P. Mỹ Long, Long Xuyên",
    "searchKey": "an giang ag long xuyen chau doc",
    "districts": [
      {
        "name": "TP. Long Xuyên",
        "code5": "90100",
        "code6": "881000"
      },
      {
        "name": "TP. Châu Đốc",
        "code5": "90200",
        "code6": "882000"
      },
      {
        "name": "TX. Tân Châu",
        "code5": "90300",
        "code6": "883000"
      },
      {
        "name": "Huyện An Phú",
        "code5": "90400",
        "code6": "884000"
      },
      {
        "name": "Huyện Châu Phú",
        "code5": "90500",
        "code6": "885000"
      },
      {
        "name": "Huyện Châu Thành",
        "code5": "90600",
        "code6": "886000"
      },
      {
        "name": "Huyện Chợ Mới",
        "code5": "90700",
        "code6": "887000"
      },
      {
        "name": "Huyện Phú Tân",
        "code5": "90800",
        "code6": "888000"
      },
      {
        "name": "Huyện Thoại Sơn",
        "code5": "90900",
        "code6": "889000"
      },
      {
        "name": "Huyện Tịnh Biên",
        "code5": "91100",
        "code6": "889500"
      },
      {
        "name": "Huyện Tri Tôn",
        "code5": "91200",
        "code6": "889600"
      }
    ]
  },
  {
    "id": "baclieu",
    "name": "Bạc Liêu",
    "codes": [
      "97"
    ],
    "code5": "97000",
    "code6": "960000",
    "note": "Bạc Liêu + Cà Mau",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện tỉnh Bạc Liêu - 02 Trần Phú, Phường 3, TP. Bạc Liêu",
    "searchKey": "bac lieu bl",
    "districts": [
      {
        "name": "TP. Bạc Liêu",
        "code5": "97100",
        "code6": "961000"
      },
      {
        "name": "Huyện Đông Hải",
        "code5": "97200",
        "code6": "962000"
      },
      {
        "name": "Huyện Giá Rai",
        "code5": "97300",
        "code6": "963000"
      },
      {
        "name": "Huyện Hòa Bình",
        "code5": "97400",
        "code6": "964000"
      },
      {
        "name": "Huyện Hồng Dân",
        "code5": "97500",
        "code6": "965000"
      },
      {
        "name": "Huyện Phước Long",
        "code5": "97600",
        "code6": "966000"
      },
      {
        "name": "Huyện Vĩnh Lợi",
        "code5": "97700",
        "code6": "967000"
      }
    ]
  },
  {
    "id": "bentre",
    "name": "Bến Tre",
    "codes": [
      "86"
    ],
    "code5": "86000",
    "code6": "930000",
    "note": "Bến Tre + Vĩnh Long",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện tỉnh Bến Tre - 01 Hùng Vương, Phường 3, TP. Bến Tre",
    "searchKey": "ben tre bt xuat du dua",
    "districts": [
      {
        "name": "TP. Bến Tre",
        "code5": "86100",
        "code6": "931000"
      },
      {
        "name": "Huyện Ba Tri",
        "code5": "86200",
        "code6": "932000"
      },
      {
        "name": "Huyện Bình Đại",
        "code5": "86300",
        "code6": "933000"
      },
      {
        "name": "Huyện Châu Thành",
        "code5": "86400",
        "code6": "934000"
      },
      {
        "name": "Huyện Chợ Lách",
        "code5": "86500",
        "code6": "935000"
      },
      {
        "name": "Huyện Giồng Trôm",
        "code5": "86600",
        "code6": "936000"
      },
      {
        "name": "Huyện Mỏ Cày Bắc",
        "code5": "86700",
        "code6": "937000"
      },
      {
        "name": "Huyện Mỏ Cày Nam",
        "code5": "86800",
        "code6": "938000"
      },
      {
        "name": "Huyện Thạnh Phú",
        "code5": "86900",
        "code6": "939000"
      }
    ]
  },
  {
    "id": "binhphuoc",
    "name": "Bình Phước",
    "codes": [
      "67"
    ],
    "code5": "67000",
    "code6": "830000",
    "note": "Đồng Xoài - Bình Long - Chơn Thành",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện tỉnh Bình Phước - Quốc lộ 14, P. Tân Phú, TP. Đồng Xoài",
    "searchKey": "binh phuoc bphuoc dong xoai",
    "districts": [
      {
        "name": "TP. Đồng Xoài",
        "code5": "67100",
        "code6": "831000"
      },
      {
        "name": "TX. Bình Long",
        "code5": "67200",
        "code6": "832000"
      },
      {
        "name": "TX. Phước Long",
        "code5": "67300",
        "code6": "833000"
      },
      {
        "name": "Huyện Bù Đăng",
        "code5": "67400",
        "code6": "834000"
      },
      {
        "name": "Huyện Bù Đốp",
        "code5": "67500",
        "code6": "835000"
      },
      {
        "name": "Huyện Bù Gia Mập",
        "code5": "67600",
        "code6": "836000"
      },
      {
        "name": "Huyện Chơn Thành",
        "code5": "67700",
        "code6": "837000"
      },
      {
        "name": "Huyện Đồng Phú",
        "code5": "67800",
        "code6": "838000"
      },
      {
        "name": "Huyện Hớn Quản",
        "code5": "67900",
        "code6": "839000"
      },
      {
        "name": "Huyện Lộc Ninh",
        "code5": "67010",
        "code6": "839500"
      }
    ]
  },
  {
    "id": "binhthuan",
    "name": "Bình Thuận",
    "codes": [
      "77"
    ],
    "code5": "77000",
    "code6": "800000",
    "note": "Phan Thiết - La Gi - Mũi Né",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện tỉnh Bình Thuận - 19 Nguyễn Du, P. Đức Thắng, TP. Phan Thiết",
    "searchKey": "binh thuan bt phan thiet la gi mui ne",
    "districts": [
      {
        "name": "TP. Phan Thiết",
        "code5": "77100",
        "code6": "801000"
      },
      {
        "name": "TX. La Gi",
        "code5": "77200",
        "code6": "802000"
      },
      {
        "name": "Huyện Bắc Bình",
        "code5": "77300",
        "code6": "803000"
      },
      {
        "name": "Huyện Đức Linh",
        "code5": "77400",
        "code6": "804000"
      },
      {
        "name": "Huyện Hàm Thuận Bắc",
        "code5": "77500",
        "code6": "805000"
      },
      {
        "name": "Huyện Hàm Thuận Nam",
        "code5": "77600",
        "code6": "806000"
      },
      {
        "name": "Huyện Phú Quý",
        "code5": "77700",
        "code6": "807000"
      },
      {
        "name": "Huyện Tánh Linh",
        "code5": "77800",
        "code6": "808000"
      },
      {
        "name": "Huyện Tuy Phong",
        "code5": "77900",
        "code6": "809000"
      }
    ]
  },
  {
    "id": "binhduong",
    "name": "Bình Dương",
    "codes": [
      "75"
    ],
    "code5": "75000",
    "code6": "820000",
    "note": "Thủ Dầu Một - Thuận An - Dĩ An",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện tỉnh Bình Dương - 324 Đại lộ Bình Dương, Thủ Dầu Một",
    "searchKey": "binh duong bd thu dau mot di an thuan an",
    "districts": [
      {
        "name": "TP. Thủ Dầu Một",
        "code5": "75100",
        "code6": "821000",
        "wards": [
          {
            "name": "P. Phú Cường",
            "code5": "75106",
            "code6": "821100"
          },
          {
            "name": "P. Hiệp Thành",
            "code5": "75107",
            "code6": "821200"
          },
          {
            "name": "P. Chánh Nghĩa",
            "code5": "75108",
            "code6": "821300"
          },
          {
            "name": "P. Phú Hòa",
            "code5": "75109",
            "code6": "821400"
          },
          {
            "name": "P. Phú Thọ",
            "code5": "75110",
            "code6": "821500"
          },
          {
            "name": "P. Phú Lợi",
            "code5": "75111",
            "code6": "821600"
          },
          {
            "name": "P. Định Hòa",
            "code5": "75112",
            "code6": "821700"
          },
          {
            "name": "P. Hòa Phú",
            "code5": "75118",
            "code6": "821800"
          }
        ]
      },
      {
        "name": "TP. Thuận An",
        "code5": "75200",
        "code6": "822000",
        "wards": [
          {
            "name": "P. Lái Thiêu",
            "code5": "75206",
            "code6": "822100"
          },
          {
            "name": "P. An Phú",
            "code5": "75207",
            "code6": "822200"
          },
          {
            "name": "P. Bình Hòa",
            "code5": "75208",
            "code6": "822300"
          },
          {
            "name": "P. Bình Chuẩn",
            "code5": "75209",
            "code6": "822400"
          },
          {
            "name": "P. Thuận Giao",
            "code5": "75211",
            "code6": "822500"
          },
          {
            "name": "P. Vĩnh Phú",
            "code5": "75214",
            "code6": "822600"
          }
        ]
      },
      {
        "name": "TP. Dĩ An",
        "code5": "75300",
        "code6": "823000",
        "wards": [
          {
            "name": "P. Dĩ An",
            "code5": "75306",
            "code6": "823100"
          },
          {
            "name": "P. An Bình",
            "code5": "75307",
            "code6": "823200"
          },
          {
            "name": "P. Đông Hòa",
            "code5": "75310",
            "code6": "823300"
          },
          {
            "name": "P. Tân Đông Hiệp",
            "code5": "75312",
            "code6": "823400"
          },
          {
            "name": "P. Bình An",
            "code5": "75308",
            "code6": "823500"
          }
        ]
      },
      {
        "name": "TP. Tân Uyên",
        "code5": "75400",
        "code6": "824000"
      },
      {
        "name": "TP. Bến Cát",
        "code5": "75500",
        "code6": "825000"
      },
      {
        "name": "Huyện Bàu Bàng",
        "code5": "75600",
        "code6": "826000"
      },
      {
        "name": "Huyện Bắc Tân Uyên",
        "code5": "75700",
        "code6": "827000"
      },
      {
        "name": "Huyện Dầu Tiếng",
        "code5": "75800",
        "code6": "828000"
      },
      {
        "name": "Huyện Phú Giáo",
        "code5": "75900",
        "code6": "829000"
      }
    ]
  },
  {
    "id": "camau",
    "name": "Cà Mau",
    "codes": [
      "98"
    ],
    "code5": "98000",
    "code6": "970000",
    "note": "Cà Mau + Bạc Liêu",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện tỉnh Cà Mau - 03 Lưu Tấn Tài, Phường 5, TP. Cà Mau",
    "searchKey": "ca mau cm mui ca mau",
    "districts": [
      {
        "name": "TP. Cà Mau",
        "code5": "98100",
        "code6": "971000"
      },
      {
        "name": "Huyện Cái Nước",
        "code5": "98200",
        "code6": "972000"
      },
      {
        "name": "Huyện Đầm Dơi",
        "code5": "98300",
        "code6": "973000"
      },
      {
        "name": "Huyện Năm Căn",
        "code5": "98400",
        "code6": "974000"
      },
      {
        "name": "Huyện Ngọc Hiển",
        "code5": "98500",
        "code6": "975000"
      },
      {
        "name": "Huyện Phú Tân",
        "code5": "98600",
        "code6": "976000"
      },
      {
        "name": "Huyện Thới Bình",
        "code5": "98700",
        "code6": "977000"
      },
      {
        "name": "Huyện Trần Văn Thời",
        "code5": "98800",
        "code6": "978000"
      },
      {
        "name": "Huyện U Minh",
        "code5": "98900",
        "code6": "979000"
      }
    ]
  },
  {
    "id": "dongnai",
    "name": "Đồng Nai",
    "codes": [
      "76"
    ],
    "code5": "76000",
    "code6": "810000",
    "note": "Đồng Nai + Bình Dương",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện tỉnh Đồng Nai - 33 Nguyễn Ái Quốc, P. Quang Vinh, Biên Hòa",
    "searchKey": "dong nai dn bien hoa long khanh",
    "districts": [
      {
        "name": "TP. Biên Hòa",
        "code5": "76100",
        "code6": "811000",
        "wards": [
          {
            "name": "P. Quyết Thắng",
            "code5": "76106",
            "code6": "811100"
          },
          {
            "name": "P. Quang Vinh",
            "code5": "76109",
            "code6": "811200"
          },
          {
            "name": "P. Trung Dũng",
            "code5": "76110",
            "code6": "811300"
          },
          {
            "name": "P. Bửu Long",
            "code5": "76111",
            "code6": "811400"
          },
          {
            "name": "P. Tân Tiến",
            "code5": "76117",
            "code6": "811500"
          },
          {
            "name": "P. Tân Mai",
            "code5": "76118",
            "code6": "811600"
          },
          {
            "name": "P. Tam Hiệp",
            "code5": "76120",
            "code6": "811700"
          },
          {
            "name": "P. Tân Phong",
            "code5": "76123",
            "code6": "811800"
          },
          {
            "name": "P. Trảng Dài",
            "code5": "76124",
            "code6": "811900"
          },
          {
            "name": "P. Long Bình",
            "code5": "76126",
            "code6": "811010"
          }
        ]
      },
      {
        "name": "TP. Long Khánh",
        "code5": "76200",
        "code6": "812000"
      },
      {
        "name": "Huyện Cẩm Mỹ",
        "code5": "76300",
        "code6": "813000"
      },
      {
        "name": "Huyện Định Quán",
        "code5": "76400",
        "code6": "814000"
      },
      {
        "name": "Huyện Long Thành",
        "code5": "76500",
        "code6": "815000"
      },
      {
        "name": "Huyện Nhơn Trạch",
        "code5": "76600",
        "code6": "816000"
      },
      {
        "name": "Huyện Tân Phú",
        "code5": "76700",
        "code6": "817000"
      },
      {
        "name": "Huyện Thống Nhất",
        "code5": "76800",
        "code6": "818000"
      },
      {
        "name": "Huyện Trảng Bom",
        "code5": "76900",
        "code6": "819000"
      },
      {
        "name": "Huyện Vĩnh Cửu",
        "code5": "76010",
        "code6": "819500"
      },
      {
        "name": "Huyện Xuân Lộc",
        "code5": "76020",
        "code6": "819600"
      }
    ]
  },
  {
    "id": "dongthap",
    "name": "Đồng Tháp",
    "codes": [
      "81",
      "84"
    ],
    "code5": "81000",
    "code6": "870000",
    "note": "Đồng Tháp + Tiền Giang",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện tỉnh Đồng Tháp - 85 Nguyễn Huệ, Phường 1, TP. Cao Lãnh",
    "searchKey": "dong thap dt cao lanh sa dec",
    "districts": [
      {
        "name": "TP. Cao Lãnh",
        "code5": "81100",
        "code6": "871000"
      },
      {
        "name": "TP. Sa Đéc",
        "code5": "81200",
        "code6": "872000"
      },
      {
        "name": "TX. Hồng Ngự",
        "code5": "81300",
        "code6": "873000"
      },
      {
        "name": "Huyện Cao Lãnh",
        "code5": "81400",
        "code6": "874000"
      },
      {
        "name": "Huyện Châu Thành",
        "code5": "81500",
        "code6": "875000"
      },
      {
        "name": "Huyện Hồng Ngự",
        "code5": "81600",
        "code6": "876000"
      },
      {
        "name": "Huyện Lai Vung",
        "code5": "81700",
        "code6": "877000"
      },
      {
        "name": "Huyện Lấp Vò",
        "code5": "81800",
        "code6": "878000"
      },
      {
        "name": "Huyện Tam Nông",
        "code5": "81900",
        "code6": "879000"
      },
      {
        "name": "Huyện Tân Hồng",
        "code5": "84100",
        "code6": "879500"
      },
      {
        "name": "Huyện Tháp Mười",
        "code5": "84200",
        "code6": "879600"
      }
    ]
  },
  {
    "id": "haugiang",
    "name": "Hậu Giang",
    "codes": [
      "95"
    ],
    "code5": "95000",
    "code6": "910000",
    "note": "Hậu Giang + Cần Thơ",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện tỉnh Hậu Giang - 02 Ngô Quyền, P. 1, TP. Vị Thanh",
    "searchKey": "hau giang hg vi thanh",
    "districts": [
      {
        "name": "TP. Vị Thanh",
        "code5": "95100",
        "code6": "911000"
      },
      {
        "name": "TP. Ngã Bảy",
        "code5": "95200",
        "code6": "912000"
      },
      {
        "name": "Huyện Châu Thành",
        "code5": "95300",
        "code6": "913000"
      },
      {
        "name": "Huyện Châu Thành A",
        "code5": "95400",
        "code6": "914000"
      },
      {
        "name": "Huyện Long Mỹ",
        "code5": "95500",
        "code6": "915000"
      },
      {
        "name": "Huyện Phụng Hiệp",
        "code5": "95600",
        "code6": "916000"
      },
      {
        "name": "Huyện Vị Thủy",
        "code5": "95700",
        "code6": "917000"
      },
      {
        "name": "TX. Long Mỹ",
        "code5": "95800",
        "code6": "918000"
      }
    ]
  },
  {
    "id": "kiengiang",
    "name": "Kiên Giang",
    "codes": [
      "91",
      "92"
    ],
    "code5": "91000",
    "code6": "920000",
    "note": "Rạch Giá - Phú Quốc - Hà Tiên",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện tỉnh Kiên Giang - 01 Mạc Cửu, P. Vĩnh Thanh, TP. Rạch Giá",
    "searchKey": "kien giang kg rach gia phu quoc ha tien",
    "districts": [
      {
        "name": "TP. Rạch Giá",
        "code5": "91100",
        "code6": "921000"
      },
      {
        "name": "TP. Phú Quốc",
        "code5": "91200",
        "code6": "922000"
      },
      {
        "name": "TX. Hà Tiên",
        "code5": "91300",
        "code6": "923000"
      },
      {
        "name": "Huyện An Biên",
        "code5": "91400",
        "code6": "924000"
      },
      {
        "name": "Huyện An Minh",
        "code5": "91500",
        "code6": "925000"
      },
      {
        "name": "Huyện Châu Thành",
        "code5": "91600",
        "code6": "926000"
      },
      {
        "name": "Huyện Giang Thành",
        "code5": "91700",
        "code6": "927000"
      },
      {
        "name": "Huyện Giồng Riềng",
        "code5": "91800",
        "code6": "928000"
      },
      {
        "name": "Huyện Gò Quao",
        "code5": "91900",
        "code6": "929000"
      },
      {
        "name": "Huyện Hòn Đất",
        "code5": "92100",
        "code6": "929500"
      },
      {
        "name": "Huyện Kiên Lương",
        "code5": "92200",
        "code6": "929600"
      },
      {
        "name": "Huyện Tân Hiệp",
        "code5": "92300",
        "code6": "929700"
      },
      {
        "name": "Huyện U Minh Thượng",
        "code5": "92400",
        "code6": "929800"
      },
      {
        "name": "Huyện Vĩnh Thuận",
        "code5": "92500",
        "code6": "929900"
      }
    ]
  },
  {
    "id": "longan",
    "name": "Long An",
    "codes": [
      "82",
      "83"
    ],
    "code5": "82000",
    "code6": "850000",
    "note": "Long An + Tây Ninh",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện tỉnh Long An - 55 Trương Định, Phường 1, TP. Tân An",
    "searchKey": "long an la tan an",
    "districts": [
      {
        "name": "TP. Tân An",
        "code5": "82100",
        "code6": "851000"
      },
      {
        "name": "TX. Kiến Tường",
        "code5": "82200",
        "code6": "852000"
      },
      {
        "name": "Huyện Bến Lức",
        "code5": "82300",
        "code6": "853000"
      },
      {
        "name": "Huyện Cần Đước",
        "code5": "82400",
        "code6": "854000"
      },
      {
        "name": "Huyện Cần Giuộc",
        "code5": "82500",
        "code6": "855000"
      },
      {
        "name": "Huyện Châu Thành",
        "code5": "82600",
        "code6": "856000"
      },
      {
        "name": "Huyện Đức Hòa",
        "code5": "82700",
        "code6": "857000"
      },
      {
        "name": "Huyện Đức Huệ",
        "code5": "82800",
        "code6": "858000"
      },
      {
        "name": "Huyện Mộc Hóa",
        "code5": "82900",
        "code6": "859000"
      },
      {
        "name": "Huyện Tân Hưng",
        "code5": "83100",
        "code6": "859500"
      },
      {
        "name": "Huyện Tân Thạnh",
        "code5": "83200",
        "code6": "859600"
      },
      {
        "name": "Huyện Tân Trụ",
        "code5": "83300",
        "code6": "859700"
      },
      {
        "name": "Huyện Thủ Thừa",
        "code5": "83400",
        "code6": "859800"
      },
      {
        "name": "Huyện Vĩnh Hưng",
        "code5": "83500",
        "code6": "859900"
      }
    ]
  },
  {
    "id": "soctrang",
    "name": "Sóc Trăng",
    "codes": [
      "96"
    ],
    "code5": "96000",
    "code6": "950000",
    "note": "Sóc Trăng + Cần Thơ",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện tỉnh Sóc Trăng - 19 Trần Hưng Đạo, Phường 2, TP. Sóc Trăng",
    "searchKey": "soc trang st",
    "districts": [
      {
        "name": "TP. Sóc Trăng",
        "code5": "96100",
        "code6": "951000"
      },
      {
        "name": "TX. Ngã Năm",
        "code5": "96200",
        "code6": "952000"
      },
      {
        "name": "TX. Vĩnh Châu",
        "code5": "96300",
        "code6": "953000"
      },
      {
        "name": "Huyện Châu Thành",
        "code5": "96400",
        "code6": "954000"
      },
      {
        "name": "Huyện Cù Lao Dung",
        "code5": "96500",
        "code6": "955000"
      },
      {
        "name": "Huyện Kế Sách",
        "code5": "96600",
        "code6": "956000"
      },
      {
        "name": "Huyện Long Phú",
        "code5": "96700",
        "code6": "957000"
      },
      {
        "name": "Huyện Mỹ Tú",
        "code5": "96800",
        "code6": "958000"
      },
      {
        "name": "Huyện Mỹ Xuyên",
        "code5": "96900",
        "code6": "959000"
      },
      {
        "name": "Huyện Thạnh Trị",
        "code5": "96010",
        "code6": "959500"
      },
      {
        "name": "Huyện Trần Đề",
        "code5": "96020",
        "code6": "959600"
      }
    ]
  },
  {
    "id": "tayninh",
    "name": "Tây Ninh",
    "codes": [
      "80"
    ],
    "code5": "80000",
    "code6": "840000",
    "note": "Tây Ninh + Long An",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện tỉnh Tây Ninh - 333 đường 30/4, P. 1, TP. Tây Ninh",
    "searchKey": "tay ninh tn nui ba den",
    "districts": [
      {
        "name": "TP. Tây Ninh",
        "code5": "80100",
        "code6": "841000"
      },
      {
        "name": "Huyện Bến Cầu",
        "code5": "80200",
        "code6": "842000"
      },
      {
        "name": "Huyện Châu Thành",
        "code5": "80300",
        "code6": "843000"
      },
      {
        "name": "Huyện Dương Minh Châu",
        "code5": "80400",
        "code6": "844000"
      },
      {
        "name": "Huyện Gò Dầu",
        "code5": "80500",
        "code6": "845000"
      },
      {
        "name": "Huyện Hòa Thành",
        "code5": "80600",
        "code6": "846000"
      },
      {
        "name": "Huyện Tân Biên",
        "code5": "80700",
        "code6": "847000"
      },
      {
        "name": "Huyện Tân Châu",
        "code5": "80800",
        "code6": "848000"
      },
      {
        "name": "Huyện Trảng Bàng",
        "code5": "80900",
        "code6": "849000"
      }
    ]
  },
  {
    "id": "tiengiang",
    "name": "Tiền Giang",
    "codes": [
      "84"
    ],
    "code5": "84000",
    "code6": "860000",
    "note": "Mỹ Tho - Gò Công",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện tỉnh Tiền Giang - 59 Nam Kỳ Khởi Nghĩa, Phường 1, TP. Mỹ Tho",
    "searchKey": "tien giang tg my tho go cong",
    "districts": [
      {
        "name": "TP. Mỹ Tho",
        "code5": "84100",
        "code6": "861000"
      },
      {
        "name": "TX. Cai Lậy",
        "code5": "84200",
        "code6": "862000"
      },
      {
        "name": "TX. Gò Công",
        "code5": "84300",
        "code6": "863000"
      },
      {
        "name": "Huyện Cai Lậy",
        "code5": "84400",
        "code6": "864000"
      },
      {
        "name": "Huyện Cái Bè",
        "code5": "84500",
        "code6": "865000"
      },
      {
        "name": "Huyện Châu Thành",
        "code5": "84600",
        "code6": "866000"
      },
      {
        "name": "Huyện Chợ Gạo",
        "code5": "84700",
        "code6": "867000"
      },
      {
        "name": "Huyện Gò Công Đông",
        "code5": "84800",
        "code6": "868000"
      },
      {
        "name": "Huyện Gò Công Tây",
        "code5": "84900",
        "code6": "869000"
      },
      {
        "name": "Huyện Tân Phú Đông",
        "code5": "84010",
        "code6": "869500"
      },
      {
        "name": "Huyện Tân Phước",
        "code5": "84020",
        "code6": "869600"
      }
    ]
  },
  {
    "id": "travinh",
    "name": "Trà Vinh",
    "codes": [
      "87"
    ],
    "code5": "87000",
    "code6": "940000",
    "note": "Trà Vinh + Vĩnh Long",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện tỉnh Trà Vinh - 01 Nguyễn Thị Minh Khai, Phường 1, TP. Trà Vinh",
    "searchKey": "tra vinh tv",
    "districts": [
      {
        "name": "TP. Trà Vinh",
        "code5": "87100",
        "code6": "941000"
      },
      {
        "name": "Huyện Càng Long",
        "code5": "87200",
        "code6": "942000"
      },
      {
        "name": "Huyện Cầu Kè",
        "code5": "87300",
        "code6": "943000"
      },
      {
        "name": "Huyện Cầu Ngang",
        "code5": "87400",
        "code6": "944000"
      },
      {
        "name": "Huyện Châu Thành",
        "code5": "87500",
        "code6": "945000"
      },
      {
        "name": "Huyện Duyên Hải",
        "code5": "87600",
        "code6": "946000"
      },
      {
        "name": "Huyện Tiểu Cần",
        "code5": "87700",
        "code6": "947000"
      },
      {
        "name": "Huyện Trà Cú",
        "code5": "87800",
        "code6": "948000"
      },
      {
        "name": "TX. Duyên Hải",
        "code5": "87900",
        "code6": "949000"
      }
    ]
  },
  {
    "id": "vinhlong",
    "name": "Vĩnh Long",
    "codes": [
      "85"
    ],
    "code5": "85000",
    "code6": "890000",
    "note": "Vĩnh Long + Bến Tre + Trà Vinh",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện tỉnh Vĩnh Long - 14 Hoàng Thái Hiếu, Phường 1, TP. Vĩnh Long",
    "searchKey": "vinh long vl",
    "districts": [
      {
        "name": "TP. Vĩnh Long",
        "code5": "85100",
        "code6": "891000"
      },
      {
        "name": "Huyện Bình Minh",
        "code5": "85200",
        "code6": "892000"
      },
      {
        "name": "Huyện Long Hồ",
        "code5": "85300",
        "code6": "893000"
      },
      {
        "name": "Huyện Mang Thít",
        "code5": "85400",
        "code6": "894000"
      },
      {
        "name": "Huyện Tam Bình",
        "code5": "85500",
        "code6": "895000"
      },
      {
        "name": "Huyện Trà Ôn",
        "code5": "85600",
        "code6": "896000"
      },
      {
        "name": "Huyện Vũng Liêm",
        "code5": "85700",
        "code6": "897000"
      },
      {
        "name": "TX. Bình Minh",
        "code5": "85800",
        "code6": "898000"
      }
    ]
  },
  {
    "id": "vungtau",
    "name": "Bà Rịa - Vũng Tàu",
    "codes": [
      "78"
    ],
    "code5": "78000",
    "code6": "790000",
    "note": "Vũng Tàu - Bà Rịa - Phú Mỹ",
    "region": "Miền Nam",
    "centerPostOffice": "Bưu điện TP. Vũng Tàu - 408 Lê Hồng Phong, Phường 8, Vũng Tàu",
    "searchKey": "ba ria vung tau brvt vung tau",
    "districts": [
      {
        "name": "TP. Vũng Tàu",
        "code5": "78100",
        "code6": "791000"
      },
      {
        "name": "TP. Bà Rịa",
        "code5": "78200",
        "code6": "792000"
      },
      {
        "name": "TX. Phú Mỹ",
        "code5": "78300",
        "code6": "793000"
      },
      {
        "name": "Huyện Châu Đức",
        "code5": "78400",
        "code6": "794000"
      },
      {
        "name": "Huyện Côn Đảo",
        "code5": "78500",
        "code6": "795000"
      },
      {
        "name": "Huyện Đất Đỏ",
        "code5": "78600",
        "code6": "796000"
      },
      {
        "name": "Huyện Long Điền",
        "code5": "78700",
        "code6": "797000"
      },
      {
        "name": "Huyện Xuyên Mộc",
        "code5": "78800",
        "code6": "798000"
      }
    ]
  }
];

export function stripDiacritics(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

export function searchVnByName(query) {
  const q = stripDiacritics(query.trim());
  if (!q) return VN_PROVINCES;
  return VN_PROVINCES.filter((p) => {
    const matchName = stripDiacritics(p.name).includes(q);
    const matchKey = p.searchKey ? stripDiacritics(p.searchKey).includes(q) : false;
    const matchNote = p.note ? stripDiacritics(p.note).includes(q) : false;
    const matchDistricts = (p.districts || []).some((d) => {
      const matchD = stripDiacritics(d.name).includes(q);
      const matchW = (d.wards || []).some((w) => stripDiacritics(w.name).includes(q));
      return matchD || matchW;
    });
    return matchName || matchKey || matchNote || matchDistricts;
  });
}

export function searchVnByCode(query) {
  const q = query.trim();
  if (!q) return VN_PROVINCES;
  return VN_PROVINCES.filter((p) => {
    const matchCode2 = (p.codes || []).some((c) => q.startsWith(c) || c.startsWith(q));
    const matchCode5 = p.code5 && (p.code5.startsWith(q) || q.startsWith(p.code5));
    const matchCode6 = p.code6 && (p.code6.startsWith(q) || q.startsWith(p.code6));
    const matchDistrict = (p.districts || []).some((d) => {
      const matchD = (d.code5 && d.code5.startsWith(q)) || (d.code6 && d.code6.startsWith(q));
      const matchW = (d.wards || []).some(
        (w) => (w.code5 && w.code5.startsWith(q)) || (w.code6 && w.code6.startsWith(q))
      );
      return matchD || matchW;
    });
    return matchCode2 || matchCode5 || matchCode6 || matchDistrict;
  });
}

// Quy đổi 2 chiều: mã 5 số ⇄ mã 6 số
export function convertPostalCode(input) {
  if (!input) return null;
  const cleanInput = input.replace(/[\s\-]/g, "").trim();
  if (cleanInput.length < 2) return null;

  const is5 = cleanInput.length === 5;
  const is6 = cleanInput.length === 6;

  // 1. Tìm chính xác theo mã tỉnh/thành
  for (const p of VN_PROVINCES) {
    if (p.code5 === cleanInput) {
      return {
        matched: true,
        is5Digit: true,
        targetCode5: p.code5,
        targetCode6: p.code6,
        targetName: p.name,
        message: `${p.name} (Tỉnh/Thành phố)`
      };
    }
    if (p.code6 === cleanInput) {
      return {
        matched: true,
        is5Digit: false,
        targetCode5: p.code5,
        targetCode6: p.code6,
        targetName: p.name,
        message: `${p.name} (Tỉnh/Thành phố)`
      };
    }

    // 2. Tìm theo quận huyện & phường xã
    if (p.districts) {
      for (const d of p.districts) {
        if (d.code5 === cleanInput) {
          return {
            matched: true,
            is5Digit: true,
            targetCode5: d.code5,
            targetCode6: d.code6,
            targetName: `${d.name}, ${p.name}`,
            message: `${d.name} (${p.name})`
          };
        }
        if (d.code6 === cleanInput) {
          return {
            matched: true,
            is5Digit: false,
            targetCode5: d.code5,
            targetCode6: d.code6,
            targetName: `${d.name}, ${p.name}`,
            message: `${d.name} (${p.name})`
          };
        }

        // 3. Tìm theo phường / xã cụ thể
        if (d.wards) {
          for (const w of d.wards) {
            if (w.code5 === cleanInput) {
              return {
                matched: true,
                is5Digit: true,
                targetCode5: w.code5,
                targetCode6: w.code6,
                targetName: `${w.name}, ${d.name}, ${p.name}`,
                message: `${w.name} (${d.name}, ${p.name})`
              };
            }
            if (w.code6 === cleanInput) {
              return {
                matched: true,
                is5Digit: false,
                targetCode5: w.code5,
                targetCode6: w.code6,
                targetName: `${w.name}, ${d.name}, ${p.name}`,
                message: `${w.name} (${d.name}, ${p.name})`
              };
            }
          }
        }
      }
    }
  }

  // 4. Dự đoán theo 2 số đầu nếu chưa khớp chính xác
  const prefix2 = cleanInput.substring(0, 2);
  const matchedProvince = VN_PROVINCES.find((p) => (p.codes || []).includes(prefix2));

  if (matchedProvince) {
    if (is5) {
      return {
        matched: false,
        is5Digit: true,
        targetCode5: cleanInput,
        targetCode6: prefix2 + cleanInput.substring(2) + "0",
        targetName: matchedProvince.name,
        message: `Mã thuộc khu vực ${matchedProvince.name}`
      };
    } else if (is6) {
      return {
        matched: false,
        is5Digit: false,
        targetCode5: prefix2 + cleanInput.substring(2, 5),
        targetCode6: cleanInput,
        targetName: matchedProvince.name,
        message: `Mã thuộc khu vực ${matchedProvince.name}`
      };
    }
  }

  return null;
}
