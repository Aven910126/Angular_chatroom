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
import { getDatabase, provideDatabase } from '@angular/fire/database';
import {firebaseConfig} from "../firebase/firebaseUtil"
import {initializeApp, getApp, provideFirebaseApp} from "@angular/fire/app";
import {AngularFireDatabase, AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireModule} from "@angular/fire/compat";
import {FormsModule} from "@angular/forms";
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
        AppRoutingModule,

        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        FormsModule,
    ],
  providers: [FriendService,AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
