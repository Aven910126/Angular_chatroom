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
import { USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';
import {firebaseConfig} from "../firebase/firebaseUtil"
import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';
import {AngularFireDatabase, AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireModule} from "@angular/fire/compat";
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    ChatroomComponent,
    FriendComponent,
    RoomComponent,
    MessageComponent,
    BarComponent,
    LoginComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,

        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        FormsModule,
    ],
  providers: [
    FriendService,
    AngularFireDatabase,
    { provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } },
    // { provide: USE_DEVICE_LANGUAGE, useValue: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
