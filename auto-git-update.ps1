# Tự động cập nhật toàn bộ dự án lên GitHub
# Sử dụng: Mở PowerShell tại thư mục dự án và chạy: ./auto-git-update.ps1

# Bước 1: Thêm toàn bộ thay đổi
Write-Host "Đang thêm tất cả thay đổi..."
git add .

# Bước 2: Tạo commit với thông điệp tự động kèm ngày giờ
$datetime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMsg = "Auto update: $datetime"
Write-Host "Đang commit với thông điệp: $commitMsg"
git commit -m "$commitMsg"

# Bước 3: Đẩy lên GitHub
Write-Host "Đang đẩy lên GitHub..."
git push

Write-Host "Hoàn tất! Dự án đã được cập nhật lên GitHub."
