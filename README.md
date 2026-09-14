# Hôm nay ăn gì?

Web chọn món ăn ngẫu nhiên bằng tiếng Việt, giúp chốt món nhanh theo ngân sách và khẩu vị.

## Tính năng

- 30 món ăn với mức giá tham khảo.
- Lọc theo ngân sách, cơm, món nước, món khô hoặc ăn chay.
- Hiệu ứng quay món nhanh rồi chậm dần; tránh chọn lại ngay món trước khi còn lựa chọn khác.
- Ảnh minh họa AI riêng cho từng món, có hiệu ứng đổi ảnh.
- Tự cuộn tới kết quả trên màn hình điện thoại.
- Hỗ trợ tùy chọn giảm chuyển động của thiết bị.
- Tìm quán theo món qua GrabFood, Google Maps; mở ShopeeFood và sao chép tên món. Liên kết ứng dụng phụ thuộc thiết bị; dịch vụ có thể yêu cầu địa chỉ hoặc đăng nhập.

## Chạy trên máy

Không cần cài thư viện hay build. Với Python 3:

```sh
python3 -m http.server 4173 --directory dist
```

Mở `http://localhost:4173` trong trình duyệt. Có thể dùng bất kỳ máy chủ web tĩnh nào với thư mục `dist`.

## Cấu trúc

- `dist/index.html`: giao diện.
- `dist/style.css`: kiểu hiển thị, bố cục responsive và hiệu ứng.
- `dist/app.js`: dữ liệu món ăn, bộ lọc và quay ngẫu nhiên.
- `dist/photos.js`: ánh xạ từng món tới ảnh minh họa.
- `dist/assets/`: năm bộ ảnh minh họa AI, mỗi bộ gồm sáu món.
- `.openai/hosting.json`: cấu hình dự án Sites đã dùng để xuất bản.

## Lưu ý

Giá chỉ mang tính tham khảo, thay đổi theo quán và khu vực. Ảnh là minh họa AI, không phải ảnh của một nhà hàng cụ thể. Ứng dụng chạy ở trình duyệt, không yêu cầu tài khoản và không gửi lựa chọn món ăn lên máy chủ. Font chữ được tải từ Google Fonts, với font hệ thống dự phòng.
