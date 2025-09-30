// Flashcard Component UI - Khung giao diện cơ bản
// Dựa trên ý tưởng docs/flashcard-ui-idea.md

export const Flashcard = {
  isInitialized: false,
  init(container) {
  // Preload âm thanh
  const soundFlip = new Audio('assets/sounds/card-slide.mp3');
  const soundCorrect = new Audio('assets/sounds/quiz-correct.mp3');
  const soundWrong = new Audio('assets/sounds/quiz-incorrect.mp3');
  const soundClick = new Audio('assets/sounds/ui-click.mp3');
    if (this.isInitialized) return;
    container.innerHTML = `
      <div class="flashcard-ui">
        <div class="flashcard-header">
          <div class="flashcard-title">Công thức lượng giác</div>
          <div class="flashcard-filter">
            <select>
              <option value="all">Tất cả chủ đề</option>
              <option value="Công thức Cơ Bản">Công thức Cơ Bản</option>
              <option value="Công thức Cộng (a + b)">Công thức Cộng (a + b)</option>
              <option value="Hạ bậc">Hạ bậc</option>
              <option value="Tổng thành Tích">Tổng thành Tích</option>
              <option value="Tích thành Tổng">Tích thành Tổng</option>
              <option value="Chu kỳ hàm LG">Chu kỳ hàm LG</option>
              <option value="Phương trình LG cơ bản">Phương trình LG cơ bản</option>
              <option value="Phương trình LG đặc biệt">Phương trình LG đặc biệt</option>
            </select>
          </div>
        </div>
        <div class="flashcard-progress-row" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
          <div class="flashcard-progress">Tiến độ: <span id="flashcard-progress-info">0/0</span> | Đúng: <span id="flashcard-correct">0</span> | Sai: <span id="flashcard-wrong">0</span></div>
          <div class="flashcard-tip" style="margin-bottom: 0; align-self: center; cursor: pointer;">
            <span id="flashcard-tip-icon">💡</span>
            <span id="flashcard-tip" style="display: none; margin-left: 8px;">Gợi ý</span>
          </div>
        </div>
        <div class="flashcard-main-row">
          <div class="flashcard-card">
            <div class="flashcard-face flashcard-front">
              <div id="flashcard-question">Câu hỏi/thách đố</div>
            </div>
            <div class="flashcard-face flashcard-back">
              <div id="flashcard-answer">Đáp án/công thức LaTeX</div>
            </div>
          </div>
        </div>
        <div class="flashcard-controls">
          <button id="flashcard-prev" class="flashcard-btn">Trước</button>
          <button id="flashcard-flip" class="flashcard-btn">Lật thẻ</button>
          <button id="flashcard-next" class="flashcard-btn">Tiếp theo</button>
        </div>
        <div class="flashcard-eval-row">
          <div style="flex:1"></div>
          <button id="flashcard-wrong-btn" class="flashcard-btn flashcard-wrong">Sai</button>
          <button id="flashcard-correct-btn" class="flashcard-btn flashcard-correct">Đúng</button>
        </div>
      </div>
    `;
    this.isInitialized = true;
    // State
    let flashcards = [];
    let currentIndex = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let filteredTopic = 'all';
    let filteredCards = [];
    let isFlipped = false;

    // Elements
    const questionEl = container.querySelector('#flashcard-question');
    const answerEl = container.querySelector('#flashcard-answer');
    const tipEl = container.querySelector('#flashcard-tip');
    const tipIconEl = container.querySelector('#flashcard-tip-icon');
    const tipContainerEl = container.querySelector('.flashcard-tip');
    const progressInfoEl = container.querySelector('#flashcard-progress-info');
    const correctEl = container.querySelector('#flashcard-correct');
    const wrongEl = container.querySelector('#flashcard-wrong');
    const cardEl = container.querySelector('.flashcard-card');
    const prevBtn = container.querySelector('#flashcard-prev');
    const nextBtn = container.querySelector('#flashcard-next');
    const flipBtn = container.querySelector('#flashcard-flip');
    const correctBtn = container.querySelector('#flashcard-correct-btn');
    const wrongBtn = container.querySelector('#flashcard-wrong-btn');
    const filterSelect = container.querySelector('.flashcard-filter select');

    // Fetch data
    // Sự kiện click vùng tip để hiện/ẩn nội dung
    tipContainerEl.addEventListener('click', function() {
      if (tipEl.style.display === 'none') {
        tipEl.style.display = 'inline';
      } else {
        tipEl.style.display = 'none';
      }
    });
    async function fetchFlashcards() {
      try {
        const res = await fetch('data/flashcard-basic.json');
        flashcards = await res.json();
        filteredCards = flashcards;
        renderCard();
        updateProgress();
      } catch (e) {
        questionEl.textContent = 'Không thể tải dữ liệu flashcard.';
      }
    }

    function renderCard() {
      if (!filteredCards.length) {
        questionEl.textContent = 'Không có thẻ nào.';
        answerEl.textContent = '';
        tipEl.textContent = '';
        return;
      }
      const card = filteredCards[currentIndex];
      questionEl.innerHTML = card.front.replace(/\n/g, '<br>');
      if (window.MathJax) {
        window.MathJax.typesetPromise([questionEl]);
      }
      // Render LaTeX bằng MathJax cho mặt sau
      answerEl.innerHTML = card.back.replace(/\n/g, '<br>');
      if (window.MathJax) {
        window.MathJax.typesetPromise([answerEl]);
      }
      tipEl.innerHTML = card.tip;
      tipEl.style.display = 'none'; // Ẩn tip mặc định
      if (window.MathJax) {
        window.MathJax.typesetPromise([tipEl]);
      }
      cardEl.classList.toggle('flipped', isFlipped);
    }

    function updateProgress() {
      progressInfoEl.textContent = `${currentIndex + 1}/${filteredCards.length}`;
      correctEl.textContent = correctCount;
      wrongEl.textContent = wrongCount;
    }

    function nextCard() {
      if (currentIndex < filteredCards.length - 1) {
        currentIndex++;
        isFlipped = false;
        renderCard();
        updateProgress();
        soundClick.currentTime = 0; soundClick.play();
      }
    }
    function prevCard() {
      if (currentIndex > 0) {
        currentIndex--;
        isFlipped = false;
        renderCard();
        updateProgress();
        soundClick.currentTime = 0; soundClick.play();
      }
    }
    function flipCard() {
      isFlipped = !isFlipped;
      renderCard();
      soundFlip.currentTime = 0; soundFlip.play();
    }
    function markCorrect() {
      correctCount++;
      soundCorrect.currentTime = 0; soundCorrect.play();
      nextCard();
      updateProgress();
    }
    function markWrong() {
      wrongCount++;
      soundWrong.currentTime = 0; soundWrong.play();
      nextCard();
      updateProgress();
    }
    function filterCards() {
      filteredTopic = filterSelect.value;
      if (filteredTopic === 'all') {
        filteredCards = flashcards;
      } else {
        filteredCards = flashcards.filter(card => card.topic === filteredTopic);
      }
      currentIndex = 0;
      isFlipped = false;
      renderCard();
      updateProgress();
    }

    prevBtn.addEventListener('click', prevCard);
    nextBtn.addEventListener('click', nextCard);
    flipBtn.addEventListener('click', flipCard);
    correctBtn.addEventListener('click', markCorrect);
    wrongBtn.addEventListener('click', markWrong);
    filterSelect.addEventListener('change', filterCards);

    fetchFlashcards();
  }
};
