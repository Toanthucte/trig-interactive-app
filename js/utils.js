/**
 * Utilities - Project V2
 * Author: NQQ
 * Created: 24/07/2024
 */

const Utils = {
    /**
     * Debounce function to limit the rate at which a function gets called.
     * @param {Function} func The function to debounce.
     * @param {number} wait The delay in milliseconds.
     * @returns {Function} The debounced function.
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Format a number to a specified number of decimal places.
     * @param {number} num The number to format.
     * @param {number} decimals The number of decimal places.
     * @returns {string} The formatted number as a string.
     */
    formatNumber(num, decimals = 4) {
        if (typeof num !== 'number' || isNaN(num)) return '0';
        return parseFloat(num.toFixed(decimals)).toString();
    },

    /**
     * Convert degrees to radians.
     * @param {number} degrees The angle in degrees.
     * @returns {number} The angle in radians.
     */
    degToRad(degrees) {
        return degrees * (Math.PI / 180);
    },

    /**
     * Convert radians to degrees.
     * @param {number} radians The angle in radians.
     * @returns {number} The angle in degrees.
     */
    radToDeg(radians) {
        return radians * (180 / Math.PI);
    },

    /**
     * Create a DOM element with given attributes and content.
     * @param {string} tag The HTML tag for the element.
     * @param {object} attributes An object of attributes to set on the element.
     * @param {string} content The text content of the element.
     * @returns {HTMLElement} The created element.
     */
    createElement(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        for (const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
        if (content) {
            element.textContent = content;
        }
        return element;
    },

    /**
     * Animate an element with a CSS animation.
     * @param {HTMLElement} element The element to animate.
     * @param {string} animationName The name of the CSS animation.
     * @param {number} duration The duration in milliseconds.
     */
    animate(element, animationName, duration = 300) {
        element.style.animation = `${animationName} ${duration}ms ease-out`;
        element.addEventListener('animationend', () => {
            element.style.animation = '';
        }, { once: true });
    }
};
