import { AfterViewChecked, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FriendService } from '../friend.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { child, Database, get, getDatabase } from "@angular/fire/database";
import { AngularFireAction, AngularFireDatabase } from "@angular/fire/compat/database";
import { DataSnapshot } from "@angular/fire/compat/database/interfaces";
import firebase from "firebase/compat";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import MessageSubject from '../observer/message';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewChecked {
  img;
  messageList: Array<any> = [];
  private messagesRef: any;
  private db: AngularFireDatabase
  message: any;
  editmessage : any;
  localusername: any;
  private auth: AngularFireAuth;
  room : RoomComponent | undefined;
  constructor(friendService: FriendService, db: AngularFireDatabase, auth: AngularFireAuth, room: RoomComponent) {
    this.img = friendService.getimg();
    this.db = db;
    // db.list('message').valueChanges().subscribe(res=>{
    //   console.log("Receive New Msg"+res[res.length-1])
    //   this.messageList.push(res[res.length-1]);
    // });
    this.room = room;
    this.messagesRef = db.object('message');
    this.auth = auth;
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.displayName);
        this.localusername = user.displayName;
      } else {
        console.log("NO user");
      }
    });
  }


  ngOnInit(): void {
    // @ts-ignore

    this.db.list('message').valueChanges().subscribe(res => {
      this.messageList = res;
      console.log(this.messageList)
    });
  }

  ngAfterViewChecked(): void {
    MessageSubject.getInstance().notify()
  }
  dropmessage(messageId:String): void {
    console.log(messageId)
      this.db.object(`message/${messageId}`).remove()
  }
  
  edit(messageId:String): void {
    this.editmessage = this.db.object(`message/${messageId}`);
    console.log("edit:"+this.message);
    this.room?.editMessage(this.editmessage);
      // this.db.object(`message/${messageId}`).remove()
  }
  
}





