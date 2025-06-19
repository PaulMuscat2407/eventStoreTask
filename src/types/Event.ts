export interface Event<T extends string = 'click' | 'view' | 'purchase'>{
  type: T;
  timestamp: number; // UNIX timestamp in milliseconds
}