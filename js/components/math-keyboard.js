/**
 * Math Keyboard Component - Project V2
 * Author: NQQ
 * Created: 24/07/2024
 */

const MathKeyboard = {
    isInitialized: false,
    isVisible: false,
    elements: {
        keyboard: null,
    },
    currentTarget: null,

    layouts: {
        default: [
            ['1', '2', '3', '+', '(', ')'],
            ['4', '5', '6', '-', 'π', '√'],
            ['7', '8', '9', '×', '°', '⌫'],
            ['.', '0', '/', '=', 'C', '▼ Close']
        ]
    },

    init() {
        if (this.isInitialized) return;
        console.log('MathKeyboard component initialized');
        this.render();
        this.cacheElements();
        this.addEventListeners();
        this.isInitialized = true;
    },

    render() {
        const keyboardHTML = `
            <div id="math-keyboard" class="math-keyboard" style="display: none;">
                <div class="keyboard-layout">
                    ${this.layouts.default.map(row => `
                        <div class="keyboard-row">
                            ${row.map(key => `<button class="keyboard-key" data-key="${key}">${key}</button>`).join('')}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(document.createRange().createContextualFragment(keyboardHTML));
    },

    cacheElements() {
        this.elements.keyboard = document.getElementById('math-keyboard');
    },

    addEventListeners() {
        // Handle clicks on keyboard keys
        this.elements.keyboard.addEventListener('mousedown', (e) => {
            // Prevent the mousedown from blurring the input
            e.preventDefault(); 
            if (e.target.matches('.keyboard-key')) {
                this.handleKeyPress(e.target.dataset.key);
            }
        });

        // Show keyboard on input focus
        document.addEventListener('focusin', (e) => {
            if (e.target.matches('input[data-math-keyboard]')) {
                this.show(e.target);
            }
        });

        // Hide keyboard when clicking outside
        document.addEventListener('mousedown', (e) => {
            if (!this.isVisible) return;

            const isClickInsideKeyboard = this.elements.keyboard.contains(e.target);
            const isClickOnTargetInput = this.currentTarget && this.currentTarget === e.target;

            if (!isClickInsideKeyboard && !isClickOnTargetInput) {
                this.hide();
            }
        });
    },

    show(inputElement) {
        this.currentTarget = inputElement;
        this.elements.keyboard.style.display = 'block';
        this.isVisible = true;
    },

    hide() {
        this.elements.keyboard.style.display = 'none';
        this.isVisible = false;
        this.currentTarget = null;
    },

    handleKeyPress(key) {
        if (!this.currentTarget) return;

        const input = this.currentTarget;
        const value = input.value;

        switch (key) {
            case '⌫': // Backspace
                // Always remove the last character from the string
                input.value = value.slice(0, -1);
                break;
            case 'C': // Clear
                input.value = '';
                break;
            case '▼ Close': // Hide keyboard
                this.hide();
                return; // Important: return early
            default:
                // Always append the new character to the end of the string
                input.value += key;
                break;
        }
        
        // Dispatch input event to trigger any listeners on the input
        input.dispatchEvent(new Event('input', { bubbles: true }));
        
        // After the operation, ensure the input is focused so the user can see the result
        // and the cursor is at the end, ready for the next input.
        input.focus();
    }
};

// Initialize the keyboard globally
document.addEventListener('DOMContentLoaded', () => {
    MathKeyboard.init();
});
