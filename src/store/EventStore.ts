import { Event } from "../types/Event";

export class EventStore <T extends string = 'click' | 'view' | 'purchase'> {

    //Create a private array to store events
    private events: Event<T>[] = [];
    
    //Method to add an event to the store
    addEvent(event: Event<T>): void{
        //Pushes the event into the events array
        this.events.push(event);
    }

    //Method to get statistics of events based on type and time range, with optional granularity
    getStats(type: T, from: number, to: number, granularity?: 'minute' | 'hour'): number | { [timestamp: number]: number }{
        //Filter events based on type and timestamp range
        const filteredEvents = this.events.filter(event => 
            event.type === type && 
            event.timestamp >= from && 
            event.timestamp <= to
        );
        //If granularity is specified, return stats grouped by the specified time unit
        if (granularity) {
            const stats: { [timestamp: number]: number } = {};
            filteredEvents.forEach(event => {
                const key = Math.floor(event.timestamp / (granularity === 'minute' ? 60000 : 3600000)) * (granularity === 'minute' ? 60000 : 3600000);
                stats[key] = (stats[key] || 0) + 1;
            });
            return stats;
        }

        //If no granularity is specified, return the count of filtered events
        return filteredEvents.length;
    }

    //Method to clear all events from the store
    clearEvents(): void {
        //Resets the events array to an empty array
        this.events = [];
    }
}