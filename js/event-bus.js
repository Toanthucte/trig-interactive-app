/**
 * Event Bus - Project V2
 * Author: NQQ
 * Created: 24/07/2024
 * 
 * A simple event bus for inter-component communication.
 */

const EventBus = {
    events: {},

    /**
     * Subscribe to an event.
     * @param {string} eventName The name of the event.
     * @param {Function} callback The function to call when the event is fired.
     */
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    },

    /**
     * Unsubscribe from an event.
     * @param {string} eventName The name of the event.
     * @param {Function} callback The callback function to remove.
     */
    off(eventName, callback) {
        if (!this.events[eventName]) {
            return;
        }
        this.events[eventName] = this.events[eventName].filter(
            (eventCallback) => callback !== eventCallback
        );
    },

    /**
     * Emit an event.
     * @param {string} eventName The name of the event to emit.
     * @param {*} data The data to pass to the subscribers.
     */
    emit(eventName, data) {
        if (!this.events[eventName]) {
            return;
        }
        this.events[eventName].forEach((callback) => {
            callback(data);
        });
    },
};
