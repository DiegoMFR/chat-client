import { Component } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'chat-app';
  connection: signalR.HubConnection;
  username = 'Diego';
  userId = new Date().getTime();
  loginToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRpZWdvIE1vcmFsZXMiLCJpYXQiOjE1MTYyMzkwMjJ9.Qla3Ai6zMkZ7vjrrZQU4AfQKrmd4Wv0yLgE1l8Erj2w';
  messages = [];
  usersTyping = new Set();
  tbMessage = '';
  typingTimeout;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:5001/hub?username=${this.username}`, { accessTokenFactory: () => this.loginToken })
      .build();

    this.connection.on('messageReceived', (username: string, message: string) => {
      this.messages.push({author: username, content: message });
      if (this.usersTyping.has(username)) {
        this.usersTyping.delete(username);
      }
    });

    this.connection.on('userTyping', (username: string) => {
      this.usersTyping.add(username);
      setTimeout(() => {
        if (this.usersTyping.has(username)) {
          this.usersTyping.delete(username);
        }
      }, 5000);
    });

    this.connection.on('echo', (args: any) => {
      console.log('echo:', args);
    });

    this.connection
    .start()
    .then(() => {
      console.log('Hub connection started');
      this.connection.send('addToGroup', 'General');
    })
    .catch(err => document.write(err));
  }

  listenKeyUp = (e) => {
    if (e.key === 'Enter') {
      this.connection.send('newMessage', this.userId, this.tbMessage)
        .then(() => {
          this.tbMessage = '';
        });
    } else {
      this.connection.send('busyTyping', this.userId);
    }
  }

  sendOnClick = () => {
    this.connection.send('newMessage', this.userId, this.tbMessage)
      .then(() => {
        this.tbMessage = '';
      });
  }
}



