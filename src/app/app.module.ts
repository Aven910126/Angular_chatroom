import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { FriendComponent } from './friend/friend.component';
import { FriendService } from './friend.service';
import { RoomComponent } from './room/room.component';
import { MessageComponent } from './message/message.component';
import { BarComponent } from './bar/bar.component';
@NgModule({
  declarations: [
    AppComponent,
    ChatroomComponent,
    FriendComponent,
    RoomComponent,
    MessageComponent,
    BarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [FriendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
