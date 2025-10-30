import { Injectable, signal } from '@angular/core';

// FIX: Added 'info' to allow for informational message types.
export type MessageType = 'success' | 'error' | 'info';

export interface Message {
  text: string;
  type: MessageType;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  message = signal<Message | null>(null);

  private timer: any;

  showMessage(text: string, type: MessageType, duration: number = 3000): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    // Briefly set to null to ensure the animation is re-triggered if a message is already showing
    this.message.set(null);

    // Use setTimeout to apply the new message in the next event loop tick, allowing the DOM to update
    setTimeout(() => {
      this.message.set({ text, type });
      this.timer = setTimeout(() => {
        this.message.set(null);
        this.timer = null;
      }, duration);
    }, 0);
  }
}