import { Injectable, signal, WritableSignal } from '@angular/core';
import { GlobalEvent } from './models';
import { GLOBAL_EVENTS_DATA } from '../data/events.data';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventIndex = 0;
  private readonly _activeEvent: WritableSignal<GlobalEvent | null> = signal(null);
  public readonly activeEvent = this._activeEvent.asReadonly();

  private eventInterval: any;

  constructor() {}

  public init(): void {
    this.cycleEvent();
    this.eventInterval = setInterval(() => {
        this.cycleEvent();
    }, 5000); // Check every 5s to see if current event ended
  }

  private cycleEvent(): void {
    const currentEvent = this.activeEvent();
    if (currentEvent && currentEvent.endsAt && Date.now() < currentEvent.endsAt) {
      // Event is still active
      return;
    }

    const nextEventTemplate = GLOBAL_EVENTS_DATA[this.eventIndex];
    const newEvent: GlobalEvent = {
      ...nextEventTemplate,
      endsAt: Date.now() + nextEventTemplate.duration * 1000,
    };
    
    this._activeEvent.set(newEvent);
    this.eventIndex = (this.eventIndex + 1) % GLOBAL_EVENTS_DATA.length;
  }
}
