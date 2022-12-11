import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'chatroom',
  templateUrl: './chatroom.component.html'
})
export class ChatroomComponent {
  title = 'chatroom';
  constructor(public auth: AngularFireAuth) {
  }
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(r => console.log(r));
  }
  logout() {
    this.auth.signOut()
    .then(r => console.log(r));
  }
}
