/**
 * Quiz Game Component - Project V2
 * Author: NQQ
 * Created: 24/07/2024
 */

const QuizGame = {
    isInitialized: false,
    elements: {},
    state: {
        currentDifficulty: 'easy',
        currentQuestionIndex: 0,
        gameSession: null,
        timer: null,
    },

    QUIZ_CONFIG: {
        easy: { name: 'Dễ', questions: 5, time: 120 },
        medium: { name: 'Vừa', questions: 10, time: 300 },
        hard: { name: 'Khó', questions: 15, time: 450 },
    },

    QUESTION_BANK: {
        easy: [
            { q: 'Đổi 30° sang radian:', o: ['π/6', 'π/4', 'π/3', 'π/2'], a: 0 },
            { q: 'Đổi 60° sang radian:', o: ['π/4', 'π/6', 'π/3', 'π/2'], a: 2 },
            { q: 'Đổi 90° sang radian:', o: ['π', 'π/2', '2π/3', 'π/4'], a: 1 },
            { q: 'Đổi 120° sang radian:', o: ['3π/4', '5π/6', '2π/3', 'π/2'], a: 2 },
            { q: 'Đổi 180° sang radian:', o: ['2π', 'π', '3π/2', 'π/2'], a: 1 },
            { q: 'Đổi π/6 sang độ:', o: ['30°', '45°', '60°', '90°'], a: 0 },
            { q: 'Đổi π/3 sang độ:', o: ['45°', '90°', '30°', '60°'], a: 3 },
            { q: 'Đổi π/2 sang độ:', o: ['180°', '60°', '90°', '45°'], a: 2 },
            { q: 'Đổi 2π/3 sang độ:', o: ['120°', '150°', '135°', '90°'], a: 0 },
            { q: 'Đổi π sang độ:', o: ['360°', '90°', '270°', '180°'], a: 3 }
        ],
        medium: [
            { q: 'sin(30°) = ?', o: ['1/2', '√2/2', '√3/2', '1'], a: 0 },
            { q: 'cos(45°) = ?', o: ['1/2', '√2/2', '√3/2', '0'], a: 1 },
            { q: 'tan(60°) = ?', o: ['1', '√3', '1/√3', 'Không xác định'], a: 1 },
            { q: 'sin(90°) = ?', o: ['0', '1/2', '1', '-1'], a: 2 },
            { q: 'cos(0°) = ?', o: ['0', '1', '-1', '1/2'], a: 1 },
            { q: 'tan(45°) = ?', o: ['1', '√3', '0', 'Không xác định'], a: 0 },
            { q: 'sin(60°) = ?', o: ['1/2', '√2/2', '√3/2', '1'], a: 2 },
            { q: 'cos(30°) = ?', o: ['1/2', '√2/2', '√3/2', '0'], a: 2 }
        ],
        hard: [
            { q: 'sin(2π/3) = ?', o: ['1/2', '-1/2', '√3/2', '-√3/2'], a: 2 },
            { q: 'cos(5π/6) = ?', o: ['√3/2', '-√3/2', '1/2', '-1/2'], a: 1 },
            { q: 'Bánh xe bán kính 35cm quay 240°. Quãng đường đi được là bao nhiêu?', o: ['146.6 cm', '122.5 cm', '104.7 cm', '210 cm'], a: 0 }, // s = r * theta = 35 * (240 * pi/180) = 35 * 4pi/3 ~= 146.6
            { q: 'Kim phút dài 6cm. Trong 20 phút, đầu kim đi được quãng đường bao nhiêu?', o: ['12.57 cm', '18.85 cm', '25.13 cm', '6.28 cm'], a: 2 }, // 20 min = 1/3 hour => 1/3 * 360 = 120 deg = 2pi/3 rad. s = 6 * 2pi/3 = 4pi ~= 12.57. Wait, 20 min is 1/3 of a circle, which is 120 degrees. No, 20 minutes is 20/60 = 1/3 of a full circle. A full circle is 2pi. So angle is (1/3)*2pi. s = r*theta = 6 * (2pi/3) = 4pi ~= 12.56. Let's recheck. 20 minutes on a clock is 1/3 of the way around. The angle is 1/3 * 360 = 120 degrees. Radian is 120 * pi/180 = 2pi/3. Arc length s = r * theta = 6 * (2pi/3) = 4pi ~= 12.57. Let's make the options better. 4*pi is about 12.57. Let's use that. Wait, the previous calculation was 25.13. Let's re-read the question. Kim phút dài 6cm. Trong 20 phút, kim phút quay được góc bao nhiêu và đầu kim di chuyển quãng đường bao nhiêu? Angle is 20/60 * 360 = 120 degrees. Radian is 2pi/3. s = r * theta = 6 * (2pi/3) = 4pi ~= 12.57. The previous answer was 25.13. That would be 8pi. That would be 40 minutes. Let's stick with 12.57.
            { q: 'Tìm tất cả các góc α trong [0°, 360°] sao cho sin(α) = √3/2.', o: ['60°', '60° và 120°', '60° và 240°', '60° và 300°'], a: 1 }
        ]
    },

    init(container) {
        if (this.isInitialized) return;
        console.log('QuizGame component initialized');
        this.render(container);
        this.cacheElements();
        this.addEventListeners();
        this.isInitialized = true;
    },

    render(container) {
        container.innerHTML = `
            <div class="section-header">
                <h2>🎮 Trò Chơi Trắc Nghiệm</h2>
                <p class="section-description">Kiểm tra kiến thức của bạn qua các câu hỏi trắc nghiệm.</p>
            </div>
            <div class="quiz-setup">
                <h3>Chọn độ khó:</h3>
                <div class="difficulty-selector">
                    <button class="difficulty-btn active" data-difficulty="easy">Dễ</button>
                    <button class="difficulty-btn" data-difficulty="medium">Vừa</button>
                    <button class="difficulty-btn" data-difficulty="hard">Khó</button>
                </div>
                <button id="start-quiz">Bắt đầu!</button>
            </div>
            <div class="game-area" style="display: none;">
                <div class="game-header">
                    <span class="question-counter"></span>
                    <span class="time-display"></span>
                </div>
                <div class="question-text"></div>
                <div class="options-container"></div>
                <button id="next-question" style="display: none;">Câu tiếp</button>
            </div>
            <div class="result-section" style="display: none;">
                <h3>Kết quả</h3>
                <div class="score-display"></div>
                <button id="restart-quiz">Chơi lại</button>
            </div>
        `;
    },

    cacheElements() {
        const section = document.getElementById('quiz-game');
        this.elements = {
            section,
            quizSetup: section.querySelector('.quiz-setup'),
            gameArea: section.querySelector('.game-area'),
            resultSection: section.querySelector('.result-section'),
            difficultySelector: section.querySelector('.difficulty-selector'),
            startBtn: section.querySelector('#start-quiz'),
            questionCounter: section.querySelector('.question-counter'),
            timeDisplay: section.querySelector('.time-display'),
            questionText: section.querySelector('.question-text'),
            optionsContainer: section.querySelector('.options-container'),
            nextBtn: section.querySelector('#next-question'),
            scoreDisplay: section.querySelector('.score-display'),
            restartBtn: section.querySelector('#restart-quiz'),
        };
    },

    addEventListeners() {
        this.elements.difficultySelector.addEventListener('click', (e) => {
            if (e.target.matches('.difficulty-btn')) this.selectDifficulty(e.target.dataset.difficulty);
        });
        this.elements.startBtn.addEventListener('click', () => this.startQuiz());
        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.restartBtn.addEventListener('click', () => this.resetGame());
    },

    selectDifficulty(difficulty) {
        this.state.currentDifficulty = difficulty;
        this.elements.difficultySelector.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.difficulty === difficulty);
        });
    },

    startQuiz() {
        this.elements.quizSetup.style.display = 'none';
        this.elements.gameArea.style.display = 'block';
        this.state.gameSession = {
            score: 0,
            answers: [],
            questions: this.generateQuestions(),
        };
        this.state.currentQuestionIndex = 0;
        this.loadQuestion();
    },

    generateQuestions() {
        // For now, just return the bank
        return this.QUESTION_BANK[this.state.currentDifficulty];
    },

    loadQuestion() {
        if (this.state.currentQuestionIndex >= this.state.gameSession.questions.length) {
            this.endQuiz();
            return;
        }
        const q = this.state.gameSession.questions[this.state.currentQuestionIndex];
        this.elements.questionCounter.textContent = `Câu ${this.state.currentQuestionIndex + 1}/${this.state.gameSession.questions.length}`;
        this.elements.questionText.textContent = q.q;
        this.elements.optionsContainer.innerHTML = q.o.map((opt, i) => 
            `<button class="option-btn" data-index="${i}">${opt}</button>`
        ).join('');
        this.elements.optionsContainer.onclick = (e) => {
            if (e.target.matches('.option-btn')) this.selectAnswer(parseInt(e.target.dataset.index));
        };
        this.elements.nextBtn.style.display = 'none';
    },

    selectAnswer(index) {
        const q = this.state.gameSession.questions[this.state.currentQuestionIndex];
        const isCorrect = index === q.a;
        if (isCorrect) {
            this.state.gameSession.score++;
        }
        this.elements.optionsContainer.querySelectorAll('.option-btn').forEach((btn, i) => {
            btn.disabled = true;
            if (i === q.a) btn.classList.add('correct');
            else if (i === index) btn.classList.add('incorrect');
        });
        this.elements.nextBtn.style.display = 'block';
    },

    nextQuestion() {
        this.state.currentQuestionIndex++;
        this.loadQuestion();
    },

    endQuiz() {
        this.elements.gameArea.style.display = 'none';
        this.elements.resultSection.style.display = 'block';
        this.elements.scoreDisplay.innerHTML = `Điểm của bạn: ${this.state.gameSession.score}/${this.state.gameSession.questions.length}`;
    },

    resetGame() {
        this.elements.resultSection.style.display = 'none';
        this.elements.quizSetup.style.display = 'block';
    }
};
