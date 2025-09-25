/**
 * Utilities - Project V2 (ESM)
 * Author: NQQ
 * Created: 24/07/2024
 *
 * This file contains utility functions exported as an ES Module.
 */

/**
 * Debounce function to limit the rate at which a function gets called.
 * @param {Function} func The function to debounce.
 * @param {number} wait The delay in milliseconds.
 * @returns {Function} The debounced function.
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Format a number to a specified number of decimal places.
 * @param {number} num The number to format.
 * @param {number} decimals The number of decimal places.
 * @returns {string} The formatted number as a string.
 */
export function formatNumber(num, decimals = 4) {
    if (typeof num !== 'number' || isNaN(num)) return '0';
    return parseFloat(num.toFixed(decimals)).toString();
}

/**
 * Convert degrees to radians.
 * @param {number} degrees The angle in degrees.
 * @returns {number} The angle in radians.
 */
export function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees.
 * @param {number} radians The angle in radians.
 * @returns {number} The angle in degrees.
 */
export function radToDeg(radians) {
    return radians * (180 / Math.PI);
}

/**
 * Create a DOM element with given attributes and content.
 * @param {string} tag The HTML tag for the element.
 * @param {object} attributes An object of attributes to set on the element.
 * @param {string} content The text content of the element.
 * @returns {HTMLElement} The created element.
 */
export function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    if (content) {
        element.textContent = content;
    }
    return element;
}

/**
 * Animate an element with a CSS animation.
 * @param {HTMLElement} element The element to animate.
 * @param {string} animationName The name of the CSS animation.
 * @param {number} duration The duration in milliseconds.
 */
export function animate(element, animationName, duration = 300) {
    element.style.animation = `${animationName} ${duration}ms ease-out`;
    element.addEventListener('animationend', () => {
        element.style.animation = '';
    }, { once: true });
}

/**
 * Sound Manager - Project V2
 * A simple utility to play sound effects.
 * It includes a cache to avoid re-creating Audio objects.
 */
const soundCache = {};

export function playSound(name) {
    if (soundCache[name]) {
        soundCache[name].currentTime = 0;
        soundCache[name].play().catch(e => console.warn(`Could not play sound "${name}":`, e));
    } else {
        const audio = new Audio(`assets/sounds/${name}.mp3`);
        soundCache[name] = audio;
        audio.play().catch(e => console.warn(`Could not play sound "${name}":`, e));
    }
}

/**
 * Formats an angle for display, using degrees or radians (with π).
 * @param {number} angle The angle value.
 * @param {string} unit The unit ('degrees' or 'radians').
 * @returns {string} The formatted angle string.
 */
export function formatAngle(angle, unit) {
    if (unit === 'degrees') {
        return `${formatNumber(angle, 1)}°`;
    }
    
    // Handle radians with special π formatting
    const tolerance = 1e-4;
    if (Math.abs(angle) < tolerance) return '0';

    // Find common fractions of π
    const fractions = [
        { val: Math.PI, str: 'π' },
        { val: Math.PI / 2, str: 'π/2' },
        { val: Math.PI / 3, str: 'π/3' },
        { val: Math.PI / 4, str: 'π/4' },
        { val: Math.PI / 6, str: 'π/6' },
        { val: 2 * Math.PI / 3, str: '2π/3' },
        { val: 3 * Math.PI / 4, str: '3π/4' },
        { val: 5 * Math.PI / 6, str: '5π/6' },
        { val: 3 * Math.PI / 2, str: '3π/2' },
        { val: 5 * Math.PI / 3, str: '5π/3' },
        { val: 7 * Math.PI / 4, str: '7π/4' },
        { val: 11 * Math.PI / 6, str: '11π/6' },
        { val: 2 * Math.PI, str: '2π' },
    ];

    for (const frac of fractions) {
        if (Math.abs(angle - frac.val) < tolerance) {
            return frac.str;
        }
    }

    // Fallback for other radian values
    return `${formatNumber(angle, 3)} rad`;
}
