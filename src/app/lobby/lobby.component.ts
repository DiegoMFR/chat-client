import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  @Input() userId: number;
  @Output() sessionData = new EventEmitter<object>();
  chatRoom = 'general';
  userName = '';

  constructor(
    private signalRService: SignalRService
    ) { }

  ngOnInit(): void {
  }

  startSession = () => {
    if (!this.userName){
      this.userName = this.userId.toString();
    }

    const {userId, userName, chatRoom } = this;
    this.signalRService.createConnection(userName, chatRoom );
    this.sessionData.emit({userId, userName, chatRoom });
  }

}
