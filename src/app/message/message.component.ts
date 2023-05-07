import { AfterViewChecked, Component, Output , OnChanges, OnInit, SimpleChanges, EventEmitter } from '@angular/core';
import { FriendService } from '../friend.service';
import { ChangeroomService } from '../changeroom.service';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { child, Database, get, getDatabase } from "@angular/fire/database";
import { AngularFireAction, AngularFireDatabase } from "@angular/fire/compat/database";
import { DataSnapshot } from "@angular/fire/compat/database/interfaces";
import firebase from "firebase/compat";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import MessageSubject from '../observer/message';
import { RoomComponent } from '../room/room.component';
import { EditService } from '../edit.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewChecked {
  @Output() editEvent = new EventEmitter<String>();
  img;
  messageList: Array<any> = [];
  private messagesRef: any;
  private db: AngularFireDatabase
  message: any;
  editmessage : any;
  localuseremail: any;
  private auth: AngularFireAuth;
  room : RoomComponent | undefined;
  subscription!: Subscription;
  roomId : string = "";
  constructor(friendService: FriendService, db: AngularFireDatabase, auth: AngularFireAuth, room: RoomComponent, private mesData: EditService , private changeroomService:ChangeroomService) {
    this.img = friendService.getimg();
    this.db = db;
    this.room = room;
    this.messagesRef = db.object('message');
    this.auth = auth;
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.displayName);
        this.localuseremail = user.email;
      } else {
        console.log("NO user");
      }
    });
  }


  ngOnInit(): void {
    // @ts-ignore

    this.subscription = this.changeroomService.getRoom().subscribe(val => {
      this.roomId = val;
      console.log(this.roomId);
      this.db.list(`Room/${this.roomId}/message`).valueChanges().subscribe(res => {
        this.messageList = res;
      });
    });
  }

  ngAfterViewChecked(): void {
    MessageSubject.getInstance().notify()
  }
  dropmessage(messageId:String): void {
    console.log(messageId)
      this.db.object(`Room/${this.roomId}/message/${messageId}`).remove();
  }
  
  edit(messageId:string): void {
    this.editmessage = this.db.object(`Room/${this.roomId}/message/${messageId}`);
    console.log(messageId);
    this.mesData.setMessage(messageId);
  }
  
}





