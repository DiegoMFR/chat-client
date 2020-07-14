import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'chat-app';
  chatRoom = '';
  userId = new Date().getTime();
  isLobby = true;

  constructor() {
  }

  onSendData = (sessionData: { userId: number, userName: string, chatRoom: string }) => {
    const { chatRoom } = sessionData;
    this.chatRoom = chatRoom;
    this.isLobby = false;
  }
}



