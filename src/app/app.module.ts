import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageBoardComponent } from './message-board/message-board.component';
import { LobbyComponent } from './lobby/lobby.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageBoardComponent,
    LobbyComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
