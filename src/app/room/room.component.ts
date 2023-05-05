import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from "rxjs";
import { defaultAppCheckInstanceFactory } from '@angular/fire/app-check/app-check.module';
import {  } from "module";
import MessageObserver from '../observer/messageObserver';
import MessageSubject from '../observer/message';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  private messages: Observable<any[]>;
  private messagesRef: any;
  username: any | undefined;
  message: String | undefined;
  userphoto: any | undefined;
  private db: AngularFireDatabase
  private auth: AngularFireAuth

  edit = false

  constructor(db: AngularFireDatabase, auth: AngularFireAuth) {
    this.messages = db.list('message').valueChanges();
    // this.messagesRef = db.obje ct('message');
    this.db = db;
    this.auth = auth;
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        console.log(user.displayName);
        this.username = user.displayName;
        this.userphoto = user.photoURL;
      } else {
        console.log("NO user");
      }
    });

  }

  ngOnInit(): void {
      const ele = document.querySelector('.message') as HTMLElement;
      const observer = new MessageObserver(ele)
      MessageSubject.getInstance().addObserver(observer)


      // if (ele != null) {
      //   console.log('scroll');
      //   ele.scrollTop = ele.scrollHeight; // 使滚动条保持在底部
      // }
      // document.querySelector('.message')?.scrollTo(0, document.querySelector('.message')?.scrollHeight as number);
    

  }
  claermessage(): void {
    this.message = '';
  }
  sendMessage(): void {
    let username: any = this.username;
    let userphoto: any = this.userphoto;
    let id: String = new Date().getTime().toString();
    let message: String | undefined = this.message
    if(message != ''){
      this.db.object(`message/${id}`).set(
        {
          messageid:`${id}`,
          message: message,
          username: username,
          userphoto : userphoto,
        }
      )
      this.claermessage();
    }
  }
  editMessage(Message:Object): void {
    //this.message = Message.message;
  }
  sendEditMessage(): void {
    let username: any = this.username;
    let userphoto: any = this.userphoto;
    let id: String = new Date().getTime().toString();
    let message: String | undefined = this.message
    if(message != ''){
      this.db.object(`message/${id}`).update(
        {
          messageid:`${id}`,
          message: message,
          username: username,
          userphoto : userphoto,
        }
      )
      this.claermessage();
    }
  
  }
}


