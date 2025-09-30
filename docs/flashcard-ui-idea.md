# Ý tưởng giao diện & bố cục Tab Flashcard

## Sơ đồ bố cục

```
+------------------------------------------------------+
|    [Tiêu đề/Chủ đề]  [Bộ lọc chủ đề]                 |
+------------------------------------------------------+
|   [Tiến độ học: số thẻ đã học, số đúng/sai, tiến độ] |
|   +----------------------------------------------+   |
|   |                                [Tip/gợi ý]   |   |
|   |   [Flashcard]                                |   |
|   |   +-------------------------------+          |   |
|   |   |  [Mặt trước]                  |          |   |
|   |   |  (Câu hỏi/thách đố)           |          |   |
|   |   +-------------------------------+          |   |
|   |   |  [Mặt sau]                    |          |   |
|   |   |  (Đáp án/công thức LaTeX)     |          |   |
|   |   |                               |
|   |   |                               |          |   |
|   |   +-------------------------------+          |   |
|   +----------------------------------------------+   |
|                                                      |
|   [Nút Trước]   [Nút Lật thẻ]   [Nút Tiếp theo]      |  <-- Căn cách đều, nằm dưới thẻ
|                                                      |
|                             [Nút Sai]   [Nút Đúng]   |  <-- Căn lề phải, cách nhau rộng
|                                                      |
+------------------------------------------------------+
```

## Ý tưởng màu sắc, hiệu ứng, font chữ

- **Màu sắc:**

  - Nền tab: trắng/xám rất nhạt
  - Tiêu đề: xanh chủ đạo, chữ đậm
  - Bộ lọc: xanh nhạt/accent, hover xanh đậm
  - Tiến độ: xám đậm/xanh lá (đúng), đỏ (sai), thanh tiến độ xanh
  - Flashcard: mặt trước nền trắng, viền xanh nhạt, bóng nhẹ; mặt sau vàng nhạt/xanh lá nhạt, viền nổi bật, bóng đậm khi lật
  - Tip: nền vàng cam nhạt, chữ nâu/cam, icon bóng đèn
  - Nút: bo tròn, nền xanh nhạt, chữ trắng, hover xanh đậm; Sai đỏ, Đúng xanh lá

- **Font chữ:**

  - Font chính: Inter, Segoe UI, Roboto
  - Tiêu đề: đậm, lớn (24–28px)
  - Câu hỏi: vừa (18–20px), đậm
  - Đáp án: thường, 18px, render LaTeX
  - Tip: nghiêng/thường, cam/nâu, nhỏ hơn (16px)

- **Hiệu ứng:**

  - Lật thẻ: 3D flip, transition 0.4s
  - Nút hover: đổi màu, bóng đậm, scale nhẹ
  - Bóng thẻ: shadow nhẹ, đậm hơn khi lật
  - Tip: fade-in, icon rung nhẹ
  - Tiến độ: thanh trượt mượt, số nhảy nhẹ

- **Khả năng tùy biến:**
  - Sáng/tối: tự động đổi màu
  - Mobile: nút lớn, bố cục dọc, flashcard chiếm phần lớn màn hình

---

> File này dùng để kiểm tra, đối chiếu ý tưởng khi xây dựng code tab Flashcard.
