import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageCreated = new EventEmitter();
  typing = new EventEmitter();

  constructor() { }

  createMessage = (userId, message) => {
    this.messageCreated.emit({userId, message});
  }
}
