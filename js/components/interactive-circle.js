/**
 * Interactive Circle Component - Project V2
 * Author: NQQ
 * Created: 24/07/2024
 */

export const InteractiveCircle = {
    isInitialized: false,
    elements: {},
    canvas: null,
    ctx: null,
    isDragging: false,
    currentAngle: 0,
    animationFrame: null,
    
    config: {
        backgroundColor: '#ffffff',
        gridColor: '#e5e7eb',
        axisColor: '#374151',
        circleColor: '#3b82f6',
        pointColor: '#ef4444',
        lineColor: '#10b981',
        textColor: '#1f2937',
        highlightColor: '#f59e0b',
        animationSpeed: 0.02,
        pointRadius: 8,
        lineWidth: 2,
        fontSize: 12,
        showGrid: true,
        showLabels: true,
        showTrigLines: true
    },

    animation: {
        isRunning: false,
        speed: 1,
        direction: 1,
        startTime: 0
    },

    init(container) {
        if (this.isInitialized) {
            this.activate();
            return;
        }
        console.log('InteractiveCircle component initialized');
        this.render(container);
        this.cacheElements();
        this.setupCanvas();
        this.addEventListeners();
        this.setAngle(0);
        this.isInitialized = true;
    },

    render(container) {
        container.innerHTML = `
            <div class="section-header">
                <h2>⭕ Vòng Tròn Lượng Giác</h2>
                <p class="section-description">Tương tác với vòng tròn để hiểu các giá trị lượng giác.</p>
            </div>
            <div class="circle-layout-vertical">
                <div class="canvas-container">
                    <canvas id="unit-circle-canvas"></canvas>
                </div>
                <div class="circle-controls">
                    <div class="control-group">
                        <label for="circle-angle-input">Góc (độ):</label>
                        <input type="number" id="circle-angle-input" min="0" max="360" step="1" value="0">
                        <input type="range" id="angle-slider" min="0" max="360" step="0.1" value="0">
                    </div>
                    <div class="button-group">
                        <button id="animation-toggle">▶️ Chạy</button>
                        <button id="animation-slow-toggle">🐢 Chạy chậm</button>
                        <button id="reset-circle">🔄 Reset</button>
                    </div>
                </div>
                <div class="info-panel">
                    <div id="coordinates-panel" class="info-card"></div>
                    <div id="quadrant-info" class="info-card"></div>
                    <div id="trig-values" class="info-card"></div>
                    <div id="quadrant-rule" class="info-card"></div>
                </div>
            </div>
        `;
    },

    cacheElements() {
        const section = document.getElementById('interactive-circle');
        this.elements = {
            section,
            canvas: section.querySelector('#unit-circle-canvas'),
            angleInput: section.querySelector('#circle-angle-input'),
            angleSlider: section.querySelector('#angle-slider'),
            coordinatesPanel: section.querySelector('#coordinates-panel'),
            quadrantInfo: section.querySelector('#quadrant-info'),
            trigValues: section.querySelector('#trig-values'),
            quadrantRule: section.querySelector('#quadrant-rule'),
            animationToggle: section.querySelector('#animation-toggle'),
            animationSlowToggle: section.querySelector('#animation-slow-toggle'),
            resetBtn: section.querySelector('#reset-circle'),
            canvasContainer: section.querySelector('.canvas-container')
        };
        this.canvas = this.elements.canvas;
        this.ctx = this.canvas.getContext('2d');
    },

    setupCanvas() {
        const container = this.elements.canvasContainer;
        const size = Math.min(container.clientWidth, container.clientHeight, 400);
        
        this.canvas.width = size * window.devicePixelRatio;
        this.canvas.height = size * window.devicePixelRatio;
        this.canvas.style.width = `${size}px`;
        this.canvas.style.height = `${size}px`;

        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        this.centerX = size / 2;
        this.centerY = size / 2;
        this.radius = Math.min(this.centerX, this.centerY) - 40;
    },

    addEventListeners() {
        this.elements.angleInput.addEventListener('input', (e) => this.setAngle(parseFloat(e.target.value) || 0));
        this.elements.angleSlider.addEventListener('input', (e) => this.setAngle(parseFloat(e.target.value) || 0));
        
        this.elements.animationToggle.addEventListener('click', () => this.toggleAnimation(1));
        this.elements.animationSlowToggle.addEventListener('click', () => this.toggleAnimation(0.5));
        this.elements.resetBtn.addEventListener('click', () => this.resetCircle());

        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.handleMouseUp());
        this.canvas.addEventListener('mouseleave', () => this.handleMouseUp());

        window.addEventListener('resize', Utils.debounce(() => {
            this.setupCanvas();
            this.draw();
        }, 100));
    },

    setAngle(degrees) {
        this.currentAngle = degrees;
        if (document.activeElement !== this.elements.angleInput) {
            this.elements.angleInput.value = Utils.formatNumber(degrees, 1);
        }
        if (document.activeElement !== this.elements.angleSlider) {
            this.elements.angleSlider.value = degrees;
        }
        this.updateInfoPanels();
        this.draw();
    },

    updateInfoPanels() {
        const angleRad = Utils.degToRad(this.currentAngle);
        const x = Math.cos(angleRad);
        const y = Math.sin(angleRad);
        const quadrant = this.getQuadrant(this.currentAngle);
        const signs = this.getQuadrantSigns(quadrant);
        const rule = this.getQuadrantRule(quadrant);

        this.elements.coordinatesPanel.innerHTML = `<h4>Tọa độ (x, y)</h4><p>(${Utils.formatNumber(x, 3)}, ${Utils.formatNumber(y, 3)})</p>`;
        this.elements.quadrantInfo.innerHTML = `<h4>Góc phần tư ${quadrant}</h4><p>sin: ${signs.sin}, cos: ${signs.cos}, tan: ${signs.tan}</p>`;
        this.elements.trigValues.innerHTML = `
            <h4>Giá trị</h4>
            <div class="values-grid">
                <span>sin: ${Utils.formatNumber(y, 3)}</span>
                <span>cos: ${Utils.formatNumber(x, 3)}</span>
                <span>tan: ${y/x === Infinity ? '∞' : Utils.formatNumber(Math.tan(angleRad), 3)}</span>
            </div>`;
        this.elements.quadrantRule.innerHTML = `
            <h4>Qui tắc A-S-T-C</h4>
            <p class="mnemonic-phrase">(Ai Sợ Tính Cos)</p>
            <p>${rule.letter}: ${rule.text}</p>`;
    },

    draw() {
        const { width, height } = this.canvas;
        const scale = window.devicePixelRatio;
        this.ctx.clearRect(0, 0, width / scale, height / scale);
        
        this.drawGrid();
        this.drawAxes();
        this.drawCircle();
        this.drawQuadrantLetters(); // Draw A, S, T, C
        this.drawAngleLines();
        this.drawPoint();
        this.drawLabels();
        this.drawDirectionArrow(); // Draw the positive direction arrow
    },

    drawGrid() {
        const { width, height } = this.canvas;
        const scale = window.devicePixelRatio;
        const size = width / scale;
        this.ctx.strokeStyle = this.config.gridColor;
        this.ctx.lineWidth = 0.5;
        this.ctx.setLineDash([2, 2]);

        for (let x = 0; x <= size; x += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, size);
            this.ctx.stroke();
        }
        for (let y = 0; y <= size; y += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(size, y);
            this.ctx.stroke();
        }
        this.ctx.setLineDash([]);
    },

    drawAxes() {
        const { width, height } = this.canvas;
        const size = width / window.devicePixelRatio;
        this.ctx.strokeStyle = this.config.axisColor;
        this.ctx.lineWidth = this.config.lineWidth;

        this.ctx.beginPath();
        this.ctx.moveTo(0, this.centerY);
        this.ctx.lineTo(size, this.centerY);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, 0);
        this.ctx.lineTo(this.centerX, size);
        this.ctx.stroke();
    },

    drawCircle() {
        this.ctx.strokeStyle = this.config.circleColor;
        this.ctx.lineWidth = this.config.lineWidth;
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    },

    drawAngleLines() {
        const angleRad = Utils.degToRad(this.currentAngle);
        const x = this.centerX + this.radius * Math.cos(angleRad);
        const y = this.centerY - this.radius * Math.sin(angleRad);

        this.ctx.strokeStyle = this.config.lineColor;
        this.ctx.lineWidth = this.config.lineWidth;

        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();

        if (this.config.showTrigLines) {
            this.ctx.strokeStyle = this.config.highlightColor;
            this.ctx.setLineDash([3, 3]);
            this.ctx.beginPath();
            this.ctx.moveTo(x, this.centerY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX, y);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        }
    },

    drawPoint() {
        const angleRad = Utils.degToRad(this.currentAngle);
        const x = this.centerX + this.radius * Math.cos(angleRad);
        const y = this.centerY - this.radius * Math.sin(angleRad);

        this.ctx.fillStyle = this.config.pointColor;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.config.pointRadius, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    },

    drawLabels() {
        this.ctx.fillStyle = this.config.textColor;
        this.ctx.font = `${this.config.fontSize}px Arial`;

        // For 0 and 180 degrees, place them just above the axis line
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'bottom';
        this.ctx.fillText('0°', this.centerX + this.radius + 15, this.centerY - 2);
        this.ctx.fillText('180°', this.centerX - this.radius - 20, this.centerY - 2);

        // For 90 and 270 degrees, place them to the left of the vertical axis
        this.ctx.textAlign = 'right';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('90°', this.centerX - 5, this.centerY - this.radius - 15);
        this.ctx.fillText('270°', this.centerX - 5, this.centerY + this.radius + 15);
    },

    drawQuadrantLetters() {
        this.ctx.fillStyle = 'red';
        this.ctx.font = `bold ${this.radius * 0.3}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        const offset = this.radius * 0.5;
        this.ctx.fillText('A', this.centerX + offset, this.centerY - offset); // Quadrant I
        this.ctx.fillText('S', this.centerX - offset, this.centerY - offset); // Quadrant II
        this.ctx.fillText('T', this.centerX - offset, this.centerY + offset); // Quadrant III
        this.ctx.fillText('C', this.centerX + offset, this.centerY + offset); // Quadrant IV
    },

    drawDirectionArrow() {
        const arrowRadius = this.radius + 20; // Move arrow outside the circle
        const startAngle = Utils.degToRad(60);
        const endAngle = Utils.degToRad(10);

        this.ctx.strokeStyle = this.config.axisColor;
        this.ctx.lineWidth = 1.5;
        
        // Draw the arc
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, arrowRadius, startAngle, endAngle, true); // true for counter-clockwise
        this.ctx.stroke();

        // Draw the arrowhead
        const arrowTipX = this.centerX + arrowRadius * Math.cos(endAngle);
        const arrowTipY = this.centerY + arrowRadius * Math.sin(endAngle);
        const arrowAngle = endAngle - Math.PI / 2; // Perpendicular to the radius
        const arrowLength = 8;

        this.ctx.beginPath();
        this.ctx.moveTo(arrowTipX, arrowTipY);
        this.ctx.lineTo(
            arrowTipX - arrowLength * Math.cos(arrowAngle - Math.PI / 6),
            arrowTipY - arrowLength * Math.sin(arrowAngle - Math.PI / 6)
        );
        this.ctx.moveTo(arrowTipX, arrowTipY);
        this.ctx.lineTo(
            arrowTipX - arrowLength * Math.cos(arrowAngle + Math.PI / 6),
            arrowTipY - arrowLength * Math.sin(arrowAngle + Math.PI / 6)
        );
        this.ctx.stroke();

        // Draw the '+' sign
        const plusX = this.centerX + (arrowRadius + 10) * Math.cos(startAngle);
        const plusY = this.centerY + (arrowRadius + 10) * Math.sin(startAngle);
        this.ctx.font = `bold ${this.config.fontSize * 1.5}px Arial`;
        this.ctx.fillStyle = this.config.axisColor;
        this.ctx.fillText('+', plusX, plusY);
    },

    getQuadrant(angle) {
        const normalized = ((angle % 360) + 360) % 360;
        if (normalized >= 0 && normalized < 90) return 'I';
        if (normalized >= 90 && normalized < 180) return 'II';
        if (normalized >= 180 && normalized < 270) return 'III';
        return 'IV';
    },

    getQuadrantSigns(quadrant) {
        const signs = {
            'I': { sin: '+', cos: '+', tan: '+' },
            'II': { sin: '+', cos: '-', tan: '-' },
            'III': { sin: '-', cos: '-', tan: '+' },
            'IV': { sin: '-', cos: '+', tan: '-' }
        };
        return signs[quadrant];
    },

    getQuadrantRule(quadrant) {
        const rules = {
            'I': { letter: 'A', text: 'All (Tất cả đều dương)' },
            'II': { letter: 'S', text: 'Sine (Chỉ Sin dương)' },
            'III': { letter: 'T', text: 'Tangent (Chỉ Tan & Cot dương)' },
            'IV': { letter: 'C', text: 'Cosine (Chỉ Cos dương)' }
        };
        return rules[quadrant];
    },
    
    handleMouseDown(e) {
        this.isDragging = true;
        this.updateAngleFromEvent(e);
    },

    handleMouseMove(e) {
        if (this.isDragging) {
            this.updateAngleFromEvent(e);
        }
    },

    handleMouseUp() {
        this.isDragging = false;
    },

    updateAngleFromEvent(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const dx = x - this.centerX;
        const dy = y - this.centerY;
        let angleRad = Math.atan2(-dy, dx);
        this.setAngle(Utils.radToDeg(angleRad));
    },

    toggleAnimation(speed) {
        // If animation is already running with the same speed, stop it.
        if (this.animation.isRunning && this.animation.speed === speed) {
            this.animation.isRunning = false;
        } else {
            this.animation.isRunning = true;
            this.animation.speed = speed;
        }
        this.updateAnimationButtons();
        if (this.animation.isRunning) this.animate();
    },

    updateAnimationButtons() {
        if (!this.animation.isRunning) {
            this.elements.animationToggle.textContent = '▶️ Chạy';
            this.elements.animationSlowToggle.textContent = '🐢 Chạy chậm';
        } else {
            if (this.animation.speed === 1) {
                this.elements.animationToggle.textContent = '⏸️ Dừng';
                this.elements.animationSlowToggle.textContent = '🐢 Chạy chậm';
            } else {
                this.elements.animationToggle.textContent = '▶️ Chạy';
                this.elements.animationSlowToggle.textContent = '⏸️ Dừng';
            }
        }
    },

    animate() {
        if (!this.animation.isRunning) return;
        this.setAngle((this.currentAngle + this.animation.speed) % 360);
        this.animationFrame = requestAnimationFrame(() => this.animate());
    },

    resetCircle() {
        this.setAngle(0);
        if(this.animation.isRunning) {
            this.animation.isRunning = false;
            this.updateAnimationButtons();
        }
    },

    activate() {
        setTimeout(() => {
            this.setupCanvas();
            this.draw();
        }, 50);
    }
};
