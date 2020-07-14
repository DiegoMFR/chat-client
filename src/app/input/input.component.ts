import { Component, OnInit, Input } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() userId: number;
  message = '';

  constructor(
    private signalRService: SignalRService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  listenKeyUp = (e) => {
    if (e.key === 'Enter') {
      this.messageService.createMessage(this.userId, this.message);
      this.signalRService.sendMessage(this.userId, this.message);
      this.message = '';
    } else {
      this.signalRService.sendBusyTyping(this.userId);
    }
  }

  sendOnClick = () => {
    this.signalRService.sendMessage(this.userId, this.message);
    this.message = '';
  }

}
