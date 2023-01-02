import { Component, OnInit } from '@angular/core';
import { FriendService } from '../friend.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  img;
  friendState;
  name;
  constructor( friendService : FriendService,public auth: AngularFireAuth, private router : Router) { 
    this.img = friendService.getimg();
    this.name = friendService.getfriendname();
    this.friendState = friendService.getState();
  }

  ngOnInit(): void {
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
