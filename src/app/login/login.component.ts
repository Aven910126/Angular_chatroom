import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AngularFireAuth, private router : Router) {
    
  }
  
  ngOnInit(): void {
    
  }
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(r => {
        console.log(r)
        this.router.navigateByUrl('chatroom'); 
      });
  }
  logout() {
    this.auth.signOut()
    .then(r => console.log(r));
  }
  

}
