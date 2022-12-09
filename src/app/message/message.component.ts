import { Component, OnInit } from '@angular/core';
import { FriendService } from '../friend.service';
import {BehaviorSubject, Observable, switchMap} from 'rxjs';
import {child, Database, get, getDatabase} from "@angular/fire/database";
import {AngularFireAction, AngularFireDatabase} from "@angular/fire/compat/database";
import {DataSnapshot} from "@angular/fire/compat/database/interfaces";
import firebase from "firebase/compat";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  img;
  name = "local"
  messageList:Array<any>=[];
  private messagesRef:any;
  private db:AngularFireDatabase
  message: any;
  constructor(friendService : FriendService,db: AngularFireDatabase) {
      this.img = friendService.getimg();
      this.db =db;
      db.list('message').valueChanges().subscribe(res=>{
        console.log("Receive New Msg"+res[res.length-1])
        this.messageList.push(res[res.length-1]);
      });
      this.messagesRef = db.object('message');
  }

  ngOnInit(): void {
    // @ts-ignore
    this.db.list('message').valueChanges().subscribe(res=>{
      this.messageList=res;
      console.log(this.messageList)
    });
  }


}
