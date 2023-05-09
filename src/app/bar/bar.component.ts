import { Component, OnInit } from '@angular/core';
import { FriendService } from '../friend.service';
import { ChangeroomService } from '../changeroom.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  img;
  friendState;
  name;
  private db: AngularFireDatabase
  roomId : string = "";
  subscription!: Subscription;
  roomInfo : any;
  selected: boolean = false;
  roomphoto: string = "";
  constructor( db: AngularFireDatabase,friendService : FriendService,public auth: AngularFireAuth, private router : Router,private changeroomService:ChangeroomService) { 
    this.img = friendService.getimg();
    this.name = friendService.getfriendname();
    this.friendState = friendService.getState();
    this.db = db;
  }

  ngOnInit(): void {
    this.subscription = this.changeroomService.getRoom().subscribe(val => {
      this.roomId = val;
      console.log(this.roomId);
      this.db.list(`Room/${this.roomId}`).valueChanges().subscribe(res => {
        console.log(res);
        this.selected = true;
        this.roomInfo = res;
      });
      this.db.list(`uploads/${this.roomId}`).valueChanges().subscribe(res => {
        const _res: any = res
        console.log("res" + _res);
        this.roomphoto = _res[0].url;
      });
    });
    
  }
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(r => console.log(r));
  }
  logout() {
    this.auth.signOut()
    .then(r => {
          console.log(r)
          this.router.navigateByUrl('login'); 
          }
        );
  }
  callchatroomlist(){
    const  chatroomlist: HTMLElement|null = document.querySelector('.chatlist');
    if (chatroomlist != null) {
      chatroomlist.style.transform = 'translate(0px,0px)';
    }
  }
}
