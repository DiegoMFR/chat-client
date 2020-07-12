import { Component } from '@angular/core';
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'chat-app';
  userId = new Date().getTime();
  loginToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRpZWdvIE1vcmFsZXMiLCJpYXQiOjE1MTYyMzkwMjJ9.Qla3Ai6zMkZ7vjrrZQU4AfQKrmd4Wv0yLgE1l8Erj2w';
  tbMessage = '';
  chatRoom = '';
  closeLobby = false;

  constructor(
    private signalRService: SignalRService
    ) {
  }

  listenKeyUp = (e) => {
    if (e.key === 'Enter') {
      this.signalRService.sendMessage(this.userId, this.tbMessage);
      this.tbMessage = '';
    } else {
      this.signalRService.sendBusyTyping(this.userId);
    }
  }

  sendOnClick = () => {
    this.signalRService.sendMessage(this.userId, this.tbMessage);
    this.tbMessage = '';
  }

  onSelectChatRoom = (roomName: string) => {
    this.chatRoom = roomName;
  }

  onDismissLobby = (isDismissed: boolean) => {
    this.closeLobby = isDismissed;
  }
}



