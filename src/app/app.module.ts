import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { FriendComponent } from './friend/friend.component';
import { ChangeroomService } from './changeroom.service';
import { EditService } from './edit.service';
import { FriendService } from './friend.service';
import { RoomComponent } from './room/room.component';
import { MessageComponent } from './message/message.component';
import { BarComponent } from './bar/bar.component';
import { USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';
import { firebaseConfig } from "../firebase/firebaseUtil"
import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { ServiceWorkerModule } from "@angular/service-worker";
import { OverlayModule } from "@angular/cdk/overlay";
import { AngularFireMessagingModule } from "@angular/fire/compat/messaging";
import { FileUploadService } from './file-upload.service';
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
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    OverlayModule,
    AngularFireMessagingModule,
    AngularFireStorageModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    FriendService,
    EditService,
    ChangeroomService, 
    FileUploadService,
    AngularFireDatabase,
    { provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } },
    // { provide: USE_DEVICE_LANGUAGE, useValue: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
