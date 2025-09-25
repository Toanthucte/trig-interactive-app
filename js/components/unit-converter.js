import { debounce, degToRad, radToDeg, formatNumber, playSound } from '../utils.js';

/**
 * Unit Converter Component - Project V2
 * Author: NQQ
 * Created: 24/07/2024
 */

export const UnitConverter = {
    isInitialized: false,
    elements: {},
    state: {
        currentUnit: 'degrees',
        history: [],
    },

    init(container) {
        if (this.isInitialized) return;
        console.log('UnitConverter component initialized');
        this.render(container);
        this.cacheElements();
        this.addEventListeners();
        this.loadHistory();
        this.isInitialized = true;
    },

    render(container) {
        container.innerHTML = `
            <div class="section-header">
                <h2>🔄 Đổi Đơn Vị Góc</h2>
                <p class="section-description">Chuyển đổi giữa độ (°), radian (rad) và grad.</p>
            </div>
            <div class="card">
                <div class="input-group">
                    <label for="angle-input">Nhập góc:</label>
                    <input type="text" inputmode="decimal" id="angle-input" data-math-keyboard placeholder="Ví dụ: 30, π/6, 2π/3">
                </div>
                <div class="unit-selector">
                    <button class="unit-btn active" data-unit="degrees">Độ (°)</button>
                    <button class="unit-btn" data-unit="radians">Radian (rad)</button>
                    <button class="unit-btn" data-unit="gradians">Grad (gon)</button>
                </div>
            </div>
            <div id="conversion-results" class="results-grid">
                <!-- Results will be rendered here -->
            </div>
            <div id="conversion-history" class="history-section">
                <h3>Lịch sử</h3>
                <div class="history-list"></div>
            </div>
        `;
    },

    cacheElements() {
        const section = document.getElementById('unit-converter');
        this.elements = {
            section,
            angleInput: section.querySelector('#angle-input'),
            unitSelector: section.querySelector('.unit-selector'),
            resultsContainer: section.querySelector('#conversion-results'),
            historyContainer: section.querySelector('.history-list'),
            unitButtons: section.querySelectorAll('.unit-btn'),
        };
    },

    addEventListeners() {
        this.elements.angleInput.addEventListener('input', debounce(() => this.convert(), 250));
        
        this.elements.unitButtons.forEach(button => {
            button.addEventListener('click', () => {
                playSound('ui-click');
                this.state.currentUnit = button.dataset.unit;
                this.updateActiveButton();
                this.convert();
            });
        });
    },

    updateActiveButton() {
        this.elements.unitButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.unit === this.state.currentUnit);
        });
    },

    convert() {
        const input = this.elements.angleInput.value.trim();
        if (!input) {
            this.elements.resultsContainer.innerHTML = '';
            return;
        }

        let valueInDegrees = this.parseInput(input);

        if (isNaN(valueInDegrees)) {
            this.elements.resultsContainer.innerHTML = '<p class="error">Giá trị nhập không hợp lệ.</p>';
            return;
        }

        const valueInRadians = degToRad(valueInDegrees);
        const valueInGradians = valueInDegrees * (10 / 9);

        this.renderResults(valueInDegrees, valueInRadians, valueInGradians);
        this.addToHistory({ input, degrees: valueInDegrees });
    },

    parseInput(input) {
        // Standardize input
        let processedInput = input.toLowerCase().trim()
            .replace(/π/g, 'pi')
            .replace(/pi/g, `(${Math.PI})`);

        // If the input is just 'pi' or '(pi)', it's already handled.
        // For expressions like '2pi', we need to insert a multiplication operator.
        // This regex finds a number followed by '(Math.PI)' and inserts a '*'
        processedInput = processedInput.replace(/(\d)\s*\(/g, '$1 * (');

        try {
            // Use Function constructor for safer evaluation than eval
            const evaluate = new Function(`return ${processedInput}`);
            let value = evaluate();

            // The value is always parsed as the current unit type
            if (this.state.currentUnit === 'radians') {
                return radToDeg(value);
            }
            if (this.state.currentUnit === 'gradians') {
                return value * (9 / 10);
            }
            // Default is degrees
            return value; 
        } catch (e) {
            console.error("Parsing error:", e);
            return NaN;
        }
    },

    renderResults(degrees, radians, gradians) {
        this.elements.resultsContainer.innerHTML = `
            <div class="result-card">
                <h4>Độ</h4>
                <p>${formatNumber(degrees, 4)}°</p>
            </div>
            <div class="result-card">
                <h4>Radian</h4>
                <p>${formatNumber(radians, 4)} rad</p>
            </div>
            <div class="result-card">
                <h4>Gradian</h4>
                <p>${formatNumber(gradians, 4)} gon</p>
            </div>
        `;
        // Add to history is now called from convert()
    },

    addToHistory(item) {
        this.state.history.unshift(item);
        if (this.state.history.length > 5) {
            this.state.history.pop();
        }
        this.saveHistory();
        this.renderHistory();
    },

    renderHistory() {
        this.elements.historyContainer.innerHTML = this.state.history.map(item => 
            `<div class="history-item" data-input="${item.input}">
                <span>${item.input}</span>
                <span>≈ ${formatNumber(item.degrees, 2)}°</span>
            </div>`
        ).join('');
        
        // Add click listeners to history items
        this.elements.historyContainer.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => {
                const input = item.getAttribute('data-input');
                this.elements.angleInput.value = input;
                this.convert();
            });
        });
    },

    saveHistory() {
        localStorage.setItem('unitConverterHistory', JSON.stringify(this.state.history));
    },

    loadHistory() {
        const history = localStorage.getItem('unitConverterHistory');
        if (history) {
            this.state.history = JSON.parse(history);
            this.renderHistory();
        }
    }
};
