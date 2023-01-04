import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent {
  constructor(public auth: AngularFireAuth, private router : Router) {
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
