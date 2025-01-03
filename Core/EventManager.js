class EventManager {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event, listener) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(l => l !== listener);
    }

    emit(event, data) {
        if (!this.events[event]) return;

        const listeners = [...this.events[event]];
        listeners.forEach(listener => {
            try {
                listener(data);
            } catch (error) {
                console.error(`Error executing listener for event "${event}":`, error);
            }
        });
    }

    clear() {
        this.events = {};
    }
}

export default EventManager;
