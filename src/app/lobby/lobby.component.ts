import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  @Input() userId: number;
  @Output() selectChatRoom = new EventEmitter<string>();
  @Output() dismissLobby = new EventEmitter<boolean>();
  uId: number;
  chatRoom = 'general';
  userName;

  constructor(
    private signalRService: SignalRService
    ) { }

  ngOnInit(): void {
    this.userName = this.userId;
  }

  startSession = () => {
    this.signalRService.createConnection(this.userName, this.chatRoom );
    this.dismissLobby.emit(true);
    this.selectChatRoom.emit(this.chatRoom);
    console.log('selected room: ', this.chatRoom);
  }

}
