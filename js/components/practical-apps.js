/**
 * Practical Applications Component - Project V2
 * Author: NQQ
 * Created: 24/07/2024
 */

export const PracticalApps = {
    isInitialized: false,
    elements: {},
    state: {
        currentCategory: 'construction',
        currentProblem: null,
        userSolution: {},
        showingSolution: false,
    },

    PROBLEM_CATEGORIES: {
        construction: {
            name: 'Xây dựng',
            icon: '🏗️',
            problems: [
                {
                    title: "Tính chiều cao của tòa nhà",
                    description: "Bạn đứng cách chân một tòa nhà 50m. Góc nâng từ vị trí của bạn đến đỉnh tòa nhà là 60°. Tính chiều cao của tòa nhà.",
                    diagram: 'Sơ đồ: Một người đứng cách tòa nhà một khoảng, nhìn lên đỉnh tòa nhà.',
                    inputs: [
                        { name: 'height', label: 'Chiều cao (m)', type: 'number' }
                    ],
                    solution: { height: 86.6 },
                    calculation: (inputs) => 50 * Math.tan(Utils.degToRad(60)),
                    steps: [
                        "Gọi h là chiều cao tòa nhà và d là khoảng cách từ người quan sát đến chân tòa nhà (d=50m).",
                        "Góc nâng là α = 60°.",
                        "Ta có mối quan hệ: tan(α) = h / d.",
                        "Suy ra, h = d * tan(α) = 50 * tan(60°).",
                        "h ≈ 50 * 1.732 = 86.6 (m)."
                    ]
                }
            ]
        },
        navigation: {
            name: 'Hàng hải',
            icon: '🧭',
            problems: [
                {
                    title: "Xác định vị trí tàu",
                    description: "Một ngọn hải đăng cao 120m so với mực nước biển. Từ đỉnh hải đăng, người ta nhìn thấy một con tàu ở góc hạ 30°. Hỏi con tàu cách chân hải đăng bao xa?",
                    diagram: 'Sơ đồ: Một con tàu trên biển nhìn về phía một ngọn hải đăng trên bờ.',
                    inputs: [
                        { name: 'distance', label: 'Khoảng cách (m)', type: 'number' }
                    ],
                    solution: { distance: 207.8 },
                    calculation: (inputs) => 120 / Math.tan(Utils.degToRad(30)),
                    steps: [
                        "Gọi h là chiều cao ngọn hải đăng (h=120m) và d là khoảng cách từ tàu đến chân hải đăng.",
                        "Góc hạ từ đỉnh là 30°, do đó góc nâng từ tàu đến đỉnh cũng là 30° (so le trong).",
                        "Ta có mối quan hệ: tan(30°) = h / d.",
                        "Suy ra, d = h / tan(30°) = 120 / tan(30°).",
                        "d ≈ 120 / 0.577 = 207.8 (m)."
                    ]
                }
            ]
        },
        astronomy: {
            name: 'Thiên văn',
            icon: '🔭',
            problems: [
                {
                    title: "Tính khoảng cách đến ngôi sao",
                    description: "Các nhà thiên văn đo thị sai của một ngôi sao gần là 0.772 giây cung. Một giây cung bằng 1/3600 độ. Tính khoảng cách từ Trái Đất đến ngôi sao đó theo đơn vị năm ánh sáng, biết 1 parsec (pc) xấp xỉ 3.26 năm ánh sáng và khoảng cách d (tính bằng parsec) được tính bởi công thức d = 1/p, với p là thị sai (tính bằng giây cung).",
                    inputs: [
                        { name: 'distance_ly', label: 'Khoảng cách (năm ánh sáng)', type: 'number' }
                    ],
                    solution: { distance_ly: 4.22 },
                    calculation: () => (1 / 0.772) * 3.26,
                    steps: [
                        "Thị sai của ngôi sao là p = 0.772 giây cung.",
                        "Công thức tính khoảng cách d (tính bằng parsec) là d = 1/p.",
                        "d = 1 / 0.772 ≈ 1.295 parsec.",
                        "Đổi từ parsec sang năm ánh sáng: 1.295 pc * 3.26 ly/pc ≈ 4.22 năm ánh sáng.",
                        "Đây chính là khoảng cách đến Proxima Centauri, ngôi sao gần nhất với Hệ Mặt Trời."
                    ]
                }
            ]
        },
        physics: {
            name: 'Vật lý',
            icon: '🔬',
            problems: [
                {
                    title: "Phân tích lực trên mặt phẳng nghiêng",
                    description: "Một vật nặng 10kg đặt trên một mặt phẳng nghiêng một góc 30° so với phương ngang. Hãy tính thành phần của trọng lực song song với mặt phẳng nghiêng, thành phần này có xu hướng kéo vật trượt xuống.",
                    inputs: [
                        { name: 'force_parallel', label: 'Lực song song (N)', type: 'number' }
                    ],
                    solution: { force_parallel: 49 },
                    calculation: () => 10 * 9.8 * Math.sin(Utils.degToRad(30)),
                    steps: [
                        "Trọng lực (P) của vật là P = m * g = 10 kg * 9.8 m/s² = 98 N.",
                        "Góc của mặt phẳng nghiêng là α = 30°.",
                        "Thành phần trọng lực song song với mặt phẳng nghiêng (P_parallel) được tính bằng công thức: P_parallel = P * sin(α).",
                        "P_parallel = 98 * sin(30°) = 98 * 0.5 = 49 N."
                    ]
                }
            ]
        },
        geography: {
            name: 'Địa lý',
            icon: '🗺️',
            problems: [
                {
                    title: "Ước tính bán kính Trái Đất",
                    description: "Eratosthenes quan sát thấy vào ngày hạ chí, tại thành phố Syene, Mặt Trời ở ngay trên đỉnh đầu (không có bóng). Cùng lúc đó, ở Alexandria, cách Syene 800km về phía bắc, một cây gậy thẳng đứng lại tạo ra bóng với góc 7.2°. Hãy ước tính bán kính của Trái Đất.",
                    inputs: [
                        { name: 'radius_km', label: 'Bán kính Trái Đất (km)', type: 'number' }
                    ],
                    solution: { radius_km: 6366 },
                    calculation: () => 800 / Utils.degToRad(7.2),
                    steps: [
                        "Góc lệch 7.2° chính là góc ở tâm Trái Đất chắn cung có độ dài 800km (khoảng cách giữa hai thành phố).",
                        "Chuyển đổi góc sang radian: α_rad = 7.2 * (π / 180).",
                        "Công thức tính độ dài cung tròn là L = R * α_rad, trong đó R là bán kính.",
                        "Suy ra, R = L / α_rad = 800 / (7.2 * π / 180).",
                        "R ≈ 800 / 0.1256 ≈ 6366 km."
                    ]
                }
            ]
        },
    },

    init(container) {
        if (this.isInitialized) return;
        console.log('PracticalApps component initialized');
        this.render(container);
        this.cacheElements();
        this.addEventListeners();
        this.loadRandomProblem();
        this.isInitialized = true;
    },

    render(container) {
        container.innerHTML = `
            <div class="section-header">
                <h2>🌍 Ứng Dụng Thực Tế</h2>
                <p class="section-description">Giải quyết các bài toán thực tế sử dụng lượng giác.</p>
            </div>
            <div class="apps-layout">
                <div class="problem-statement">
                    <h3 class="problem-title"></h3>
                    <p class="problem-description"></p>
                    <div class="problem-diagram"></div>
                </div>
                <div class="problem-solver">
                    <div class="input-section"></div>
                    <div class="action-buttons">
                        <button id="check-solution">Kiểm tra</button>
                        <button id="show-solution">Xem giải</button>
                        <button id="next-problem">Bài toán khác</button>
                    </div>
                    <div class="result-display"></div>
                    <div class="solution-section"></div>
                </div>
            </div>
        `;
    },

    cacheElements() {
        const section = document.getElementById('practical-apps');
        this.elements = {
            section,
            problemTitle: section.querySelector('.problem-title'),
            problemDescription: section.querySelector('.problem-description'),
            problemDiagram: section.querySelector('.problem-diagram'),
            inputSection: section.querySelector('.input-section'),
            resultDisplay: section.querySelector('.result-display'),
            solutionSection: section.querySelector('.solution-section'),
            checkBtn: section.querySelector('#check-solution'),
            showSolutionBtn: section.querySelector('#show-solution'),
            nextProblemBtn: section.querySelector('#next-problem'),
        };
    },

    addEventListeners() {
        this.elements.checkBtn.addEventListener('click', () => this.checkSolution());
        this.elements.showSolutionBtn.addEventListener('click', () => this.showSolution());
        this.elements.nextProblemBtn.addEventListener('click', () => this.loadRandomProblem());
    },

    loadRandomProblem() {
        const allCategoryKeys = Object.keys(this.PROBLEM_CATEGORIES);
        if (allCategoryKeys.length === 0) {
            console.error("No problem categories found.");
            return;
        }

        // 1. Select a random category
        const randomCategoryKey = allCategoryKeys[Math.floor(Math.random() * allCategoryKeys.length)];
        const category = this.PROBLEM_CATEGORIES[randomCategoryKey];
        this.state.currentCategory = randomCategoryKey;

        // 2. Select a random problem from that category
        if (!category || category.problems.length === 0) {
            console.error(`Category ${randomCategoryKey} has no problems.`);
            // Optionally, try another category or show a default message
            return;
        }
        const problemIndex = Math.floor(Math.random() * category.problems.length);
        this.state.currentProblem = category.problems[problemIndex];
        
        this.state.showingSolution = false;
        this.state.userSolution = {};
        this.updateProblemDisplay();
    },

    updateProblemDisplay() {
        if (!this.state.currentProblem) {
            this.elements.problemTitle.textContent = 'Không có bài toán nào';
            this.elements.problemDescription.textContent = 'Vui lòng thêm bài toán vào file practical-apps.js';
            return;
        }
        const problem = this.state.currentProblem;
        this.elements.problemTitle.textContent = problem.title;
        this.elements.problemDescription.textContent = problem.description;
        this.elements.problemDiagram.innerHTML = problem.diagram; // Use innerHTML for diagram
        
        this.elements.inputSection.innerHTML = problem.inputs.map(input => `
            <div class="input-group">
                <label for="input-${input.name}">${input.label}:</label>
                <input type="text" inputmode="decimal" id="input-${input.name}" data-name="${input.name}" class="practical-app-input" data-math-keyboard>
            </div>
        `).join('');
        this.resetSolver();
    },

    checkSolution() {
        const problem = this.state.currentProblem;
        if (!problem) return;

        let allCorrect = true;
        problem.inputs.forEach(input => {
            const inputEl = this.elements.inputSection.querySelector(`#input-${input.name}`);
            const userAnswer = parseFloat(inputEl.value);
            const correctAnswer = problem.solution[input.name];

            if (isNaN(userAnswer) || Math.abs(userAnswer - correctAnswer) > 0.1) {
                allCorrect = false;
            }
        });

        if (allCorrect) {
            this.elements.resultDisplay.innerHTML = '<p class="success">🎉 Chính xác! Bạn đã giải đúng bài toán.</p>';
        } else {
            this.elements.resultDisplay.innerHTML = '<p class="error">🤔 Chưa đúng. Hãy thử lại hoặc xem lời giải nhé.</p>';
        }
        this.elements.resultDisplay.style.display = 'block';
    },

    showSolution() {
        // Logic to display the detailed solution
        this.elements.solutionSection.innerHTML = `<h4>Các bước giải:</h4><ol>${this.state.currentProblem.steps.map(s => `<li>${s}</li>`).join('')}</ol>`;
        this.elements.solutionSection.style.display = 'block';
    },

    resetSolver() {
        this.elements.resultDisplay.style.display = 'none';
        this.elements.solutionSection.style.display = 'none';
        this.elements.inputSection.querySelectorAll('input').forEach(i => i.value = '');
    }
};
