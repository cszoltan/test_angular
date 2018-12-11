import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: Object[] = [];

  add(message: string) {
    let item = {time: Date.now(), message}
    this.messages.push(item);
    if (this.messages.length > 3) {
      this.messages = this.messages.slice(this.messages.length - 3, this.messages.length);
    }
  }

  clear() {
    this.messages = [];
  }
}
