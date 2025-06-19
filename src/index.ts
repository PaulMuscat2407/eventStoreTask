import { EventStore } from "./store/EventStore";

// Create an instance of EventStore
const store = new EventStore();

// Add some events to the store
store.addEvent({ type: 'click', timestamp: 1720000000000 });
store.addEvent({ type: 'view', timestamp: 1720000001000 });
store.addEvent({ type: 'click', timestamp: 1720000002000 });

// Retrieve statistics for different event types
console.log(`Click Stats: ${store.getStats('click', 1720000000000, 1720000003000)}`); // => 2
console.log(`View Stats: ${store.getStats('view', 1720000000000, 1720000003000)}`); // => 1
console.log(`Purchase Stats: ${store.getStats('purchase', 1720000000000, 1720000003000)}`); // => 0

// Retrieve statistics with granularity
console.log(`Click Stats (Minute): `,store.getStats('click', 1720000000000, 1720000001000, 'minute')); // => {1720000000000: 1, 1720000001000: 1}
console.log(`Click Stats (Hourly): `,store.getStats('click', 1720000000000, 1720000003000, 'hour')); // => {1720000000000: 2}

// Clear all events from the store
store.clearEvents();
console.log(`Click Stats after clear: ${store.getStats('click', 1720000000000, 1720000003000)}`); // => 0