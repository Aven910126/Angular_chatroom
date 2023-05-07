import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from "rxjs";
import { defaultAppCheckInstanceFactory } from '@angular/fire/app-check/app-check.module';
import { } from "module";
import MessageObserver from '../observer/messageObserver';
import MessageSubject from '../observer/message';
import { EditService } from '../edit.service';
import { ChangeroomService } from '../changeroom.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  private messages: Observable<any[]>;
  private messagesRef: any;
  messageId: string | undefined;
  editmessage: any;
  username: any | undefined;
  useremail: any | undefined;
  message: String | undefined;
  userphoto: any | undefined;
  private db: AngularFireDatabase
  private auth: AngularFireAuth
  subscription!: Subscription;
  edit: boolean = false;
  roomId: string = "";
  constructor(db: AngularFireDatabase, auth: AngularFireAuth, private mesData: EditService, private changeroomService: ChangeroomService) {
    this.messages = db.list('message').valueChanges();
    this.editmessage = "";
    // this.messagesRef = db.obje ct('message');
    this.db = db;
    this.auth = auth;
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        console.log(user.displayName);
        this.username = user.displayName;
        this.useremail = user.email;
        this.userphoto = user.photoURL;
      } else {
        console.log("NO user");
      }
    });

  }

  ngOnInit(): void {
    this.edit = false;
    const ele = document.querySelector('.message') as HTMLElement;
    const observer = new MessageObserver(ele)
    MessageSubject.getInstance().addObserver(observer)
    this.subscription = this.changeroomService.getRoom().subscribe(val => {
      this.roomId = val;
      this.subscription = this.mesData.getMessage().subscribe(val => {
        this.messageId = val;
        this.db.list(`Room/${this.roomId}/message/${this.messageId}`).valueChanges().subscribe(res => {
          this.editmessage = res[0];
          console.log(this.editmessage)
          if (this.messageId != "") {
            this.edit = true;
          }
          console.log(this.edit);
          console.log(this.messageId);
        });
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  clearmessage(): void {
    this.message = '';
    this.editmessage = '';
    this.messageId = '';
  }
  sendMessage(): void {
    let username: any = this.username;
    let userphoto: any = this.userphoto;
    let id: String = new Date().getTime().toString();
    let message: String | undefined = this.message
    if (message != '') {
      this.db.object(`Room/${this.roomId}/message/${id}`).set(
        {
          messageid: `${id}`,
          message: message,
          username: username,
          userphoto: userphoto,
          useremail: this.useremail,
        }
      )
      this.clearmessage();
    }
  }
  sendEditMessage(): void {
    let username: any = this.username;
    let userphoto: any = this.userphoto;
    let id: String = new Date().getTime().toString();
    let message: any | undefined = this.editmessage;
    console.log(this.messageId);
    if (message != '') {
      this.db.object(`Room/${this.roomId}/message/${this.messageId}`).update(
        {
          messageid: `${this.messageId}`,
          message: message,
          username: username,
          userphoto: userphoto,
          useremail: this.useremail,
        }
      )
      this.edit = false;
      this.clearmessage();
    }

  }
}


