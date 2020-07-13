import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  messageReceived = new EventEmitter();
  userTyping = new EventEmitter();
  connectionIsEstablished = false;
  connection: signalR.HubConnection;

  constructor() {
  }

  sendMessage = (userId, message) => {
    this.connection.send('newMessage', userId, message)
        .then(() => {
          // notify delivered message
        });
  }

  sendBusyTyping = (userId) => {
    this.connection.send('busyTyping', userId);
  }

  createConnection = (userName, chatRoom ) => {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://diegosignalrchatapp.azurewebsites.net/hub?username=${userName}&room=${chatRoom}`)
      .build();
    this.connection
    .start()
    .then(() => {
      this.registerEvents();
      console.log('Hub connection started');
      this.connection.send('addToGroup', chatRoom);
    })
    .catch(err => document.write(err));

    this.connection.on('echo', (args: any) => {
      console.log('echo:', args);
    });
  }

  private registerEvents = () => {
    this.connection.on('messageReceived', (userId: number, userName: string, message: string) => {
      this.messageReceived.emit({userId, userName, message});
    });

    this.connection.on('userTyping', (userId: number, userName: string) => {
      this.userTyping.emit({userId, userName});
    });
  }
}
