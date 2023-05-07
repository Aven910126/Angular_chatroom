import { Component, OnInit } from '@angular/core';
import { FriendService } from '../friend.service';
import { ChangeroomService } from '../changeroom.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { get } from 'firebase/database';
@Component({
  selector: 'friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit  {
  name;
  img;
  friendState;
  private db: AngularFireDatabase
  userinfo: any;
  useremail: string | undefined | null;
  roomlist: any | undefined = [];
    constructor(friendService: FriendService, db: AngularFireDatabase, public auth: AngularFireAuth,private changeroomService:ChangeroomService){
  this.name = friendService.getfriendname();
  this.img = friendService.getimg();
  this.friendState = friendService.getState();
  this.db = db;
  this.auth = auth;
  this.auth.onAuthStateChanged((user) => {
    if (user) {
      this.useremail = user.email;
    } else {
      console.log("NO user");
    }
  });
}
ngOnInit(): void {
  // @ts-ignore
  this.db.list(`User`).valueChanges().subscribe(res => {
    const _res: any = res
    this.userinfo = _res;
    for(let i in _res){
      if(_res[i].useremail == this.useremail){
        this.userinfo = _res[i].Room;
        console.log(this.userinfo);
      }
    }
    if(this.userinfo != null){
      this.getroominfo();
    }
  });
}
getroominfo(){
  this.db.list(`Room`).valueChanges().subscribe(res => {
    const _res: any = res
    
    console.log("res" + _res);
    for(let i in _res){
      for(let j in this.userinfo){
        console.log("Room:" + _res[i].RoomId);
        console.log("userroom" + this.userinfo[j].RoomId);
        if(_res[i].RoomId == this.userinfo[j].RoomId){
          console.log("true");
          this.roomlist.push(_res[i]);
          if(this.roomlist != null){
            console.log("roomlisting:" + this.roomlist);
            let count:number = 0;
            for(let x in this.roomlist){   
              console.log("initcount:"+count);
              console.log("now:"+this.roomlist[x].RoomId);
              console.log("noww:"+ _res[i].RoomId);
              if(this.roomlist[x].RoomId == _res[i].RoomId){
                count++;
                console.log("count:"+count);
                console.log("X:"+x);
                if(count >= 2){
                  this.roomlist.splice(x,1);
                }
              }
            }
          }
        }
      }
    }
    console.log("roomlist:" + this.roomlist);
  });
}
openroom(roomid:string){
  console.log("open:"+roomid);
  this.changeroomService.setRoom(roomid);
}
title = 'chatroom'; 

}
