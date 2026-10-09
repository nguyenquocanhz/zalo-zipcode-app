# ==========================================
# STAGE 1: Build binary bằng Golang Alpine
# ==========================================
FROM golang:1.23-alpine AS builder

WORKDIR /build

# Cài đặt git và ca-certificates
RUN apk add --no-cache git ca-certificates tzdata

# Cache dependencies
COPY go.mod ./
RUN go mod download

# Copy source code
COPY . .

# Build binary tĩnh tối ưu dung lượng (CGO_ENABLED=0)
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \
    -ldflags="-s -w -extldflags '-static'" \
    -o /build/zaloapp-server ./cmd/server

# ==========================================
# STAGE 2: Image chạy siêu nhẹ (Scratch/Alpine)
# ==========================================
FROM alpine:3.20

WORKDIR /app

# Cài chứng chỉ SSL gốc & múi giờ Việt Nam
RUN apk add --no-cache ca-certificates tzdata wget \
    && cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime \
    && echo "Asia/Ho_Chi_Minh" > /etc/timezone

# Copy binary từ builder stage
COPY --from=builder /build/zaloapp-server /app/zaloapp-server

# Tạo thư mục dữ liệu đệm
RUN mkdir -p /app/data

# Khai báo Volume để giữ dữ liệu bền vững trên Homelab
VOLUME ["/app/data"]

EXPOSE 8088

ENV PORT=8088 \
    DATA_DIR=/app/data \
    NODE_ID=homelab-node-01 \
    CRAWLER_INTERVAL_MINUTES=60 \
    TZ=Asia/Ho_Chi_Minh

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8088/health || exit 1

ENTRYPOINT ["/app/zaloapp-server"]
