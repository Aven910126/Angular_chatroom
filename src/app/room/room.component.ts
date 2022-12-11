import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable} from "rxjs";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  private messages: Observable<any[]>;
  private messagesRef:any;
  username: String | undefined;
  message: String | undefined;
  private db:AngularFireDatabase
  constructor(db: AngularFireDatabase) {
    this.messages = db.list('message').valueChanges();
    // this.messagesRef = db.object('message');
    this.db =db;
  }

  ngOnInit(): void {
  }

  sendMessage():void{
    let username:String = "FKT";
    let id:String =new Date().getTime().toString();
    let message:String | undefined= this.message
      this.db.object(`message/${id}`).set(
        {
          message:message,
          username:username
        }

    )
  }
}
