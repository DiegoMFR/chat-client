import { Component, OnInit, Input } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.scss']
})
export class MessageBoardComponent implements OnInit {
  @Input() userId: number;
  usersTyping = new Map();
  messages = [];

  constructor(
    private signalrService: SignalRService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.signalrService.messageReceived.subscribe((message: { userName: any; message: any; userId: any; }) => {
      if (message.userId === this.userId) {
        // TODO: mark as delivered
      } else {
        this.messages.push({ userId: message.userId, userName: message.userName, content: message.message });
      }
      if (this.usersTyping.has(message.userId)) {
        this.usersTyping.delete(message.userId);
      }
    });

    this.signalrService.userTyping.subscribe((user: { userId: number; userName: string; }) => {
      if (user.userId !== this.userId) {
        this.usersTyping.set(user.userId, user.userName);
        setTimeout(() => {
          if (this.usersTyping.has(user.userId)) {
            this.usersTyping.delete(user.userId);
          }
        }, 5000);

      }
    });

    this.messageService.messageCreated.subscribe((message) => {
      this.messages.push({ userId: message.userId, userName: message.userName, content: message.message });
    });
  }
}
