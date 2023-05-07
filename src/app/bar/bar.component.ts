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

}
