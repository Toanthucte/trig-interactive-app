# 📱 Phiếu Học Tập Góc Lượng Giác - Phiên Bản Điện Tử

> **Interactive Trigonometric Angle Worksheet - Mobile Optimized**  
> Phiếu học tập tương tác dành cho học sinh lớp 11 - Tối ưu cho điện thoại

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://toanthucte.github.io/phieu-hoc-tap-goc-luong-giac)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://github.com/Toanthucte/phieu-hoc-tap-goc-luong-giac)
[![Mobile Friendly](https://img.shields.io/badge/Mobile-Friendly-orange)](https://github.com/Toanthucte/phieu-hoc-tap-goc-luong-giac)

## 🎯 Mục tiêu dự án

Chuyển đổi phiếu học tập LaTeX truyền thống thành ứng dụng web tương tác, giúp học sinh:

- 📱 Học mọi lúc mọi nơi trên điện thoại
- 🎮 Tương tác trực tiếp với vòng tròn lượng giác
- ⚡ Nhận phản hồi tức thì khi làm bài
- 🎨 Trải nghiệm học tập thú vị và hiệu quả

## 🚀 Demo trực tiếp

**URL:** `https://toanthucte.github.io/phieu-hoc-tap-goc-luong-giac`

## 📋 Mục lục

- [Tính năng chính](#-tính-năng-chính)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Tính năng chi tiết](#-tính-năng-chi-tiết)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cài đặt và triển khai](#-cài-đặt-và-triển-khai)
- [Hướng dẫn sử dụng](#-hướng-dẫn-sử-dụng)
- [Đóng góp](#-đóng-góp)

## ✨ Tính năng chính

### 🔄 **1. Đổi đơn vị góc tương tác**

- Slider kéo thả để chọn góc 0-360°
- Nút nhanh cho các góc đặc biệt (30°, 45°, 60°, 90°...)
- Chuyển đổi tự động Độ ↔ Radian
- Keyboard ảo hỗ trợ ký hiệu toán học (π, √, phân số)

### 🎯 **2. Vòng tròn lượng giác tương tác**

- Chạm và kéo điểm trên vòng tròn
- Hiển thị realtime: góc, tọa độ, sin/cos/tan
- Animation mượt mà với hiệu ứng snap
- Feedback haptic khi chạm góc đặc biệt

### 📊 **3. Bảng giá trị lượng giác thông minh**

- Fill-in-blank với multiple choice
- Smart input nhận diện phân số/căn thức
- Auto-complete cho các giá trị phổ biến
- Kiểm tra đáp án tức thì với visual feedback

### 🧮 **4. Ứng dụng thực tế**

- Tính độ dài cung với animation bánh xe
- Bài toán kim đồng hồ tương tác
- Vòng quay Ferris Wheel với hiệu ứng 3D
- Minh họa trực quan từng bước tính toán

### 🎮 **5. Game học tập**

- Chế độ "Nhanh tay" với timer
- Quiz tương tác với ranking
- Thách đấu góc đặc biệt
- Hệ thống điểm và achievement

### ⌨️ **6. Keyboard ảo toán học**

- Layout tối ưu cho mobile
- Quick insert: 1/2, √2/2, √3/2, π/3...
- Nhận diện input thông minh
- Hiển thị công thức đẹp mắt

## 📁 Cấu trúc dự án

```
phieu-hoc-tap-goc-luong-giac/
├── 📄 index.html                    # Trang chính
├── 📁 css/
│   ├── 🎨 style.css                # CSS chính
│   ├── 📱 mobile.css               # Responsive mobile
│   ├── 🎯 components.css           # Components UI
│   └── 🌈 animations.css           # Animations & effects
├── 📁 js/
│   ├── 🧠 main.js                  # Logic chính
│   ├── ⭕ circle-interactive.js    # Vòng tròn tương tác
│   ├── ⌨️ math-keyboard.js         # Keyboard ảo toán học
│   ├── 📊 value-table.js           # Bảng giá trị lượng giác
│   ├── 🎮 quiz-game.js             # Game & quiz
│   ├── 🔄 unit-converter.js        # Đổi đơn vị góc
│   └── 🧮 practical-apps.js        # Ứng dụng thực tế
├── 📁 assets/
│   ├── 🖼️ images/
│   │   ├── ferris-wheel.svg        # Vòng quay
│   │   ├── clock-face.svg          # Mặt đồng hồ
│   │   └── unit-circle.svg         # Vòng tròn đơn vị
│   ├── 🔊 sounds/
│   │   ├── correct.mp3             # Âm thanh đúng
│   │   ├── wrong.mp3               # Âm thanh sai
│   │   └── click.mp3               # Âm thanh click
│   └── 🎭 icons/
│       ├── favicon.ico
│       ├── apple-touch-icon.png
│       └── manifest.json           # PWA manifest
├── 📁 data/
│   ├── 📋 angles-data.json         # Dữ liệu góc đặc biệt
│   ├── 🎯 quiz-questions.json      # Câu hỏi quiz
│   └── 🏆 achievements.json        # Hệ thống thành tích
├── 📁 docs/
│   ├── 📖 user-guide.md            # Hướng dẫn người dùng
│   ├── 👨‍🏫 teacher-guide.md          # Hướng dẫn giáo viên
│   └── 🔧 technical-docs.md        # Tài liệu kỹ thuật
├── 📄 README.md                    # File này
├── 📄 LICENSE                      # Giấy phép MIT
└── 📄 package.json                 # Dependencies (nếu dùng build tools)
```

## 🔧 Tính năng chi tiết

### 1️⃣ **Đổi đơn vị góc - Unit Converter** (`unit-converter.js`)

#### **Giao diện Mobile:**

```
┌─────────────────────────────────┐
│  🔄 ĐỔI ĐƠN VỊ GÓC             │
│                                 │
│  Nhập góc: [120] [độ ▼]         │
│  ┌─────────────────────────────┐ │
│  │ 0° ●────────────────── 360° │ │ ← Slider
│  └─────────────────────────────┘ │
│                                 │
│  Kết quả: 2π/3 radian ≈ 2.094   │
│                                 │
│  📌 Góc đặc biệt:               │
│  [30°] [45°] [60°] [90°] [120°] │
│  [π/6] [π/4] [π/3] [π/2] [2π/3] │
│                                 │
│  [🔄 Đảo ngược] [🔢 Keyboard]   │
└─────────────────────────────────┘
```

#### **Tính năng:**

- ✅ Slider tương tác 0-360°
- ✅ Input validation thông minh
- ✅ Quick buttons cho góc phổ biến
- ✅ Auto-convert với animation
- ✅ Hiển thị cả exact và decimal
- ✅ Keyboard ảo hỗ trợ π, phân số

### 2️⃣ **Vòng tròn lượng giác** (`circle-interactive.js`)

#### **Giao diện Mobile:**

```
┌─────────────────────────────────┐
│  ⭕ VÒNG TRÒN LƯỢNG GIÁC        │
│                                 │
│         ↑ y                     │
│         │                       │
│   ──────●────── → x             │
│        ╱│                       │
│       ╱ │  ● M                  │
│      ╱60°                       │
│     ╱                           │
│                                 │
│  📊 Thông tin:                  │
│  Góc: 60° = π/3 rad             │
│  M(0.5, 0.866)                  │
│  sin = √3/2 ≈ 0.866             │
│  cos = 1/2 = 0.5                │
│  tan = √3 ≈ 1.732               │
│                                 │
│  [📐 Snap góc] [🔄 Reset]       │
│  [🎬 Auto rotate] [📷 Capture]  │
└─────────────────────────────────┘
```

#### **Tính năng:**

- ✅ Touch & drag điểm M trên vòng tròn
- ✅ Snap tự động đến góc đặc biệt
- ✅ Hiển thị realtime sin/cos/tan
- ✅ Animation mượt với easing
- ✅ Haptic feedback (rung nhẹ)
- ✅ Color coding theo quadrant
- ✅ Export screenshot kết quả

### 3️⃣ **Bảng giá trị lượng giác** (`value-table.js`)

#### **Giao diện Mobile:**

```
┌─────────────────────────────────┐
│  📊 BẢNG GIÁ TRỊ LƯỢNG GIÁC     │
│                                 │
│  🎯 Góc: 30° = π/6              │
│  ┌─────────────────────────────┐ │
│  │ sin 30° = [    ?    ] ✓     │ │
│  │          [1/2][√3/2][0]     │ │ ← Multiple choice
│  └─────────────────────────────┘ │
│                                 │
│  ┌─────────────────────────────┐ │
│  │ cos 30° = [Chọn đáp án ▼]   │ │ ← Dropdown
│  │          √3/2 ✅            │ │
│  └─────────────────────────────┘ │
│                                 │
│  ┌─────────────────────────────┐ │
│  │ tan 30° = [_____________]   │ │ ← Smart input
│  │          Gợi ý: √3/3        │ │
│  │          [🔢 Keyboard]      │ │
│  └─────────────────────────────┘ │
│                                 │
│  Progress: ████████░░ 80%       │
│  [⬅️ Prev] [Kiểm tra] [Next ➡️] │
└─────────────────────────────────┘
```

#### **Tính năng:**

- ✅ 3 chế độ input: Multiple choice, Dropdown, Free input
- ✅ Smart recognition: `can3/3` → `√3/3`
- ✅ Auto-complete suggestions
- ✅ Visual feedback: ✅ ❌ với animation
- ✅ Progress tracking
- ✅ Hint system với từng bước
- ✅ Export kết quả PDF/Image

### 4️⃣ **Ứng dụng thực tế** (`practical-apps.js`)

#### **4.1 Độ dài cung - Bánh xe:**

```
┌─────────────────────────────────┐
│  🎡 BÁNH XE FERRIS WHEEL        │
│                                 │
│     ╭─────────────╮             │
│    ╱               ╲            │
│   │        ●        │           │ ← Animation quay
│    ╲               ╱            │
│     ╰─────────────╯             │
│                                 │
│  📏 Thông số:                   │
│  Bán kính: [6] cm  ▲▼           │
│  Góc quay: [60°] = [π/3] rad    │
│           [30°][45°][90°][120°] │
│                                 │
│  📊 Kết quả:                    │
│  Quãng đường = R × α            │
│              = 6 × π/3          │
│              = 2π ≈ 6.28 cm     │
│                                 │
│  [▶️ Xem animation] [📸 Chụp]   │
└─────────────────────────────────┘
```

#### **4.2 Kim đồng hồ:**

```
┌─────────────────────────────────┐
│  🕐 KIM ĐỒNG HỒ                 │
│                                 │
│       12                        │
│        │                        │
│    9 ───●─── 3                  │ ← Kim quay tương tác
│        │                        │
│        6                        │
│                                 │
│  ⏰ Thiết lập:                  │
│  Thời gian: [20] phút           │
│  Kim dài: [6] cm                │
│                                 │
│  📐 Góc quay kim phút:          │
│  20 phút × 6°/phút = 120°       │
│  = 2π/3 radian                  │
│                                 │
│  📏 Quãng đường đầu kim:        │
│  s = R × α = 6 × 2π/3 = 4π cm   │
│                                 │
│  [⏰ Chạy thời gian thực]       │
└─────────────────────────────────┘
```

### 5️⃣ **Game học tập** (`quiz-game.js`)

#### **5.1 Chế độ "Nhanh tay":**

```
┌─────────────────────────────────┐
│  ⚡ NHANH TAY - Level 3          │
│  ⏱️ 12s    ❤️❤️❤️    🏆 #2      │
│                                 │
│  ❓ sin 45° = ?                 │
│                                 │
│  ┌──────────┐ ┌──────────┐      │
│  │   1/2    │ │  √2/2    │      │ ← Touch to answer
│  └──────────┘ └──────────┘      │
│  ┌──────────┐ ┌──────────┐      │
│  │  √3/2    │ │    0     │      │
│  └──────────┘ └──────────┘      │
│                                 │
│  Combo: ×3   Điểm: 1,250        │
│  [🔥 Streak: 8] [💡 Gợi ý: 1]   │
│                                 │
│  Progress: ████████░░ 8/10      │
└─────────────────────────────────┘
```

#### **5.2 Thách đấu góc đặc biệt:**

```
┌─────────────────────────────────┐
│  🎯 THÁCH ĐẤU - BOSS LEVEL      │
│  💀 Góc bất kỳ    ❤️❤️❤️        │
│                                 │
│  ❓ sin(5π/6) = ?               │
│     (Gợi ý: 5π/6 = 150°)       │
│                                 │
│  ⭕ Vòng tròn hỗ trợ:            │
│      ● ← Chạm để xem            │
│                                 │
│  📝 Nhập đáp án:                │
│  [________________]             │
│  [🔢 Keyboard] [⭕ Xem vòng tròn]│
│                                 │
│  💰 Phần thưởng: +500 XP        │
│  🏆 Achievement: "Góc Master"    │
└─────────────────────────────────┘
```

### 6️⃣ **Keyboard ảo toán học** (`math-keyboard.js`)

#### **Layout thông minh:**

```
┌─────────────────────────────────┐
│  ⌨️ KEYBOARD TOÁN HỌC            │
│                                 │
│  📝 Input: 1/2                  │
│  📺 Preview: ½                  │
│                                 │
│  🔢 Số:    [1][2][3][π][√]      │
│  ➕ Phép:  [+][-][×][÷][=]      │
│  📐 Phân số: [a/b][( )][⌫]      │
│                                 │
│  ⚡ Quick Insert:               │
│  [1/2][√2/2][√3/2][√3/3][π/6]  │
│  [π/4][π/3][π/2][2π/3][π]      │
│                                 │
│  🎯 Góc:                        │
│  [30°][45°][60°][90°][120°][180°]│
│                                 │
│  [❌ Đóng] ────────── [✅ Xong] │
└─────────────────────────────────┘
```

#### **Tính năng đặc biệt:**

- ✅ Preview realtime với MathJax
- ✅ Smart autocomplete
- ✅ Template cho phân số/căn thức
- ✅ Copy/paste support
- ✅ Undo/redo
- ✅ Voice input (experimental)

## 🛠️ Công nghệ sử dụng

### **Frontend:**

- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) **HTML5** - Cấu trúc semantic
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) **CSS3** - Styling & animations
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) **Vanilla JavaScript** - Logic & tương tác
- ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=flat&logo=bootstrap&logoColor=white) **Bootstrap 5** - Responsive framework

### **Libraries & Tools:**

- 🧮 **MathJax/KaTeX** - Render công thức toán học
- 📊 **Chart.js** - Biểu đồ và visualizations
- 🎨 **GSAP** - Animations mượt mà
- 🔊 **Howler.js** - Audio effects
- 📱 **Hammer.js** - Touch gestures
- 🎯 **Canvas API** - Vẽ vòng tròn tương tác

### **PWA & Performance:**

- 📱 **Service Worker** - Offline support
- 🚀 **Lighthouse** Score 95+
- 📊 **Web Vitals** - Core metrics optimized
- 💾 **LocalStorage** - Lưu progress học tập
- 🔔 **Web Push** - Notifications (optional)

### **Build & Deploy:**

- ![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white) **GitHub Actions** - CI/CD
- 🌐 **GitHub Pages** - Free hosting
- 📦 **Webpack/Vite** - Bundle & optimize (optional)
- 🔍 **ESLint/Prettier** - Code quality

## 🚀 Cài đặt và triển khai

### **Phương pháp 1: GitHub Pages (Đơn giản nhất)**

1. **Fork repository:**

   ```bash
   # Trên GitHub, fork repo này về account Toanthucte
   # Hoặc tạo repo mới với tên: phieu-hoc-tap-goc-luong-giac
   ```

2. **Clone về máy:**

   ```bash
   git clone https://github.com/Toanthucte/phieu-hoc-tap-goc-luong-giac.git
   cd phieu-hoc-tap-goc-luong-giac
   ```

3. **Enable GitHub Pages:**

   - Vào Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / root
   - Save

4. **URL truy cập:**
   ```
   https://toanthucte.github.io/phieu-hoc-tap-goc-luong-giac
   ```

### **Phương pháp 2: Development local**

1. **Clone & setup:**

   ```bash
   git clone https://github.com/Toanthucte/phieu-hoc-tap-goc-luong-giac.git
   cd phieu-hoc-tap-goc-luong-giac
   ```

2. **Chạy local server:**

   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js
   npx serve .

   # Live Server (VS Code extension)
   # Right-click index.html → Open with Live Server
   ```

3. **Truy cập:**
   ```
   http://localhost:8000
   ```

### **Phương pháp 3: Advanced với build tools**

1. **Setup Node.js environment:**

   ```bash
   npm init -y
   npm install --save-dev vite eslint prettier
   ```

2. **Development:**
   ```bash
   npm run dev    # Start dev server
   npm run build  # Build for production
   npm run deploy # Deploy to GitHub Pages
   ```

## 📖 Hướng dẫn sử dụng

### **Cho học sinh:**

1. **Truy cập website** trên điện thoại/máy tính
2. **Chọn phần học:** Đổi đơn vị → Vòng tròn → Bảng giá trị → Ứng dụng
3. **Tương tác:** Chạm, kéo, nhập liệu theo hướng dẫn
4. **Kiểm tra:** Nhận feedback tức thì, xem lời giải chi tiết
5. **Luyện tập:** Chơi game, làm quiz để củng cố kiến thức

### **Cho giáo viên:**

1. **Chia sẻ link** với học sinh qua Zalo, email, Google Classroom
2. **Theo dõi progress** qua localStorage hoặc Google Analytics
3. **Tùy chỉnh nội dung** trong file `data/*.json`
4. **Thêm câu hỏi mới** trong `quiz-questions.json`
5. **Export báo cáo** kết quả học tập của lớp

### **Workflow học tập đề xuất:**

```
📚 Buổi 1: Đổi đơn vị góc (15 phút)
   ↓
⭕ Buổi 2: Vòng tròn lượng giác (20 phút)
   ↓
📊 Buổi 3: Bảng giá trị (15 phút)
   ↓
🧮 Buổi 4: Ứng dụng thực tế (20 phút)
   ↓
🎮 Buổi 5: Game & Quiz (15 phút)
```

## 📱 Tối ưu hóa Mobile

### **Responsive Design:**

- ✅ Breakpoints: 320px, 768px, 1024px, 1200px
- ✅ Touch-friendly buttons (min 44px)
- ✅ Swipe gestures hỗ trợ
- ✅ Landscape/Portrait orientation

### **Performance:**

- ✅ Lazy loading images
- ✅ Code splitting theo modules
- ✅ Service Worker caching
- ✅ Preload critical resources

### **UX/UI:**

- ✅ Material Design principles
- ✅ Dark/Light mode toggle
- ✅ Accessibility (a11y) compliant
- ✅ Keyboard navigation support

## 🤝 Đóng góp

### **Báo lỗi:**

- 🐛 Tạo issue trên GitHub
- 📧 Email: [your-email@example.com]
- 💬 Feedback qua Google Form

### **Đóng góp code:**

1. Fork repository
2. Tạo feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature-name`
5. Tạo Pull Request

### **Roadmap:**

- [ ] 🔊 Text-to-speech cho công thức
- [ ] 🎨 Theme tùy chỉnh theo trường học
- [ ] 📊 Dashboard giáo viên với analytics
- [ ] 🤖 AI tutor hỗ trợ học tập
- [ ] 🌐 Đa ngôn ngữ (English, Tiếng Việt)
- [ ] 📚 Tích hợp với LMS (Moodle, Canvas)

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết chi tiết.

## 🙏 Cảm ơn

- **MathJax** - Render công thức toán học đẹp
- **Chart.js** - Biểu đồ tương tác mượt mà
- **Bootstrap** - Framework responsive tuyệt vời
- **GitHub** - Hosting miễn phí với GitHub Pages
- **Học sinh lớp 11** - Beta testers đầu tiên

---

## 📞 Liên hệ

- 👨‍🏫 **Tác giả:** Nguyễn Quang Quý (NQQ)
- 📧 **Email:** [your-email@example.com]
- 🌐 **GitHub:** [@Toanthucte](https://github.com/Toanthucte)
- 📱 **Demo:** [https://toanthucte.github.io/phieu-hoc-tap-goc-luong-giac](https://toanthucte.github.io/phieu-hoc-tap-goc-luong-giac)

---

_"Học toán không còn khô khan - Tương tác, trực quan, hiệu quả!"_ 🎯📱✨
