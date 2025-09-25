import { playSound } from './utils.js';
import { UnitConverter } from './components/unit-converter.js';
import { InteractiveCircle } from './components/interactive-circle.js';
import { ValueTable } from './components/value-table.js';
import { PracticalApps } from './components/practical-apps.js';
import { QuizGame } from './components/quiz-game.js';
import { ShareWidget } from './components/share-widget.js';
// Note: utils.js and event-bus.js are not modules and are loaded globally in index.html
// Note: math-keyboard.js is also loaded globally

/**
 * Main Application Controller - Project V2
 * Author: NQQ
 * Created: 24/07/2024
 */

document.addEventListener('DOMContentLoaded', () => {
    const App = {
        state: {
            currentTab: 'unit-converter',
        },

        elements: {
            appContainer: document.getElementById('app-container'),
            header: document.getElementById('app-header'),
            main: document.getElementById('app-main'),
            footer: document.getElementById('app-footer'),
            tabNavigation: document.getElementById('tab-navigation'),
            shareWidgetContainer: document.getElementById('share-widget-container'),
        },

        components: {
            'unit-converter': UnitConverter,
            'interactive-circle': InteractiveCircle,
            'value-table': ValueTable,
            'practical-apps': PracticalApps,
            'quiz-game': QuizGame,
            // ShareWidget is not a tab, but we can list it for consistency
        },

        tabs: [
            { id: 'unit-converter', label: 'Chuyển đổi' },
            { id: 'interactive-circle', label: 'Vòng tròn' },
            { id: 'value-table', label: 'Bảng giá trị' },
            { id: 'practical-apps', label: 'Ứng dụng' },
            { id: 'quiz-game', label: 'Trò chơi' },
        ],

        init() {
            console.log('App Initializing...');
            this.setupTabButtons();
            this.setupTabContainers();
            this.setupEventListeners();
            
            // Activate the initial tab without playing sound on load
            this.handleTabClick(this.state.currentTab, { isInitialLoad: true });
            
            // Initialize the global share widget
            ShareWidget.init(this.elements.shareWidgetContainer);
        },

        setupTabButtons() {
            this.elements.tabNavigation.innerHTML = this.tabs.map(tab => `
                <button class="tab-btn" data-tab-id="${tab.id}">${tab.label}</button>
            `).join('');
        },

        setupTabContainers() {
            this.elements.main.innerHTML = ''; // Clear main content once
            this.tabs.forEach(tab => {
                const container = document.createElement('div');
                container.id = tab.id;
                container.className = 'tab-content'; // Not active by default
                this.elements.main.appendChild(container);
            });
        },

        setupEventListeners() {
            this.elements.tabNavigation.addEventListener('click', (e) => {
                if (e.target.matches('.tab-btn')) {
                    playSound('ui-click');
                    this.handleTabClick(e.target.dataset.tabId);
                }
            });

            // Add scroll event listener for shrinking the header
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    this.elements.header.classList.add('scrolled');
                } else {
                    this.elements.header.classList.remove('scrolled');
                }
            });
        },

        handleTabClick(tabId, options = {}) {
            const { isInitialLoad = false } = options;

            // Don't do anything if it's not the initial load and the tab is already active
            if (!isInitialLoad && tabId === this.state.currentTab) return;

            if (!isInitialLoad) {
                playSound('card-slide');
            }
            
            this.state.currentTab = tabId;

            // Update tab buttons
            this.elements.tabNavigation.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.tabId === tabId);
            });

            // Update tab content visibility
            this.elements.main.querySelectorAll('.tab-content').forEach(content => {
                content.classList.toggle('active', content.id === tabId);
            });
            
            const component = this.components[tabId];
            const container = document.getElementById(tabId);

            // Initialize component only if it hasn't been already
            if (component && typeof component.init === 'function' && !component.isInitialized) {
                component.init(container);
            } else if (!component) {
                container.innerHTML = `Component for ${tabId} not found or is invalid.`;
            }
        }
    };

    App.init();
});
