import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { ChangeroomService } from '../changeroom.service';
import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  @ViewChild("joinwinodw") tplRef!: TemplateRef<string>;
  @ViewChild("createwinodw") tp2Ref!: TemplateRef<string>;
  private overlayRef!: OverlayRef;
  roomid: string | undefined;
  roompassword: string | undefined;
  private db: AngularFireDatabase
  roomname: string | undefined;
  createdroomid: any | undefined;
  createdroompassword: any | undefined;
  createdroomname: any | undefined;
  createduserid: any | undefined;
  lastcreateduserid!: number;
  userinfo: any | null | undefined;
  private useremail: string | null | undefined;
  constructor(db: AngularFireDatabase, public auth: AngularFireAuth, private router: Router, changeroomService: ChangeroomService, private overlay: Overlay, private viewContainerRef: ViewContainerRef) {
    this.db = db;
    this.auth = auth;
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.useremail = user.email;
      }
    });
  }
  ngOnInit(): void {
    // 設定彈窗出來時的定位
    const strategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const configs = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy: strategy,
    });

    this.overlayRef = this.overlay.create(configs);
    this.overlayRef.backdropClick().subscribe((res) => {
      this.overlayRef.detach();
    });
  }

  onClose() {
    this.overlayRef.detach();
  }
  openjoinwindow() {
    this.overlayRef.attach(
      new TemplatePortal(this.tplRef, this.viewContainerRef)
    );
  }

  opencreatewindow() {
    this.overlayRef.attach(
      new TemplatePortal(this.tp2Ref, this.viewContainerRef)
    );
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
  getroominfo(id: string) {
    this.db.list(`Room/${id}`).valueChanges().subscribe(res => {
      const _res: any = res
      console.log("getroominfo");
      console.log(_res);
      this.createdroomid = _res[0];
      this.createdroompassword = _res[3];
      this.createdroomname = _res[1];
       this.lastcreateduserid = _res[4][_res[4].length - 1].userid;
      
      console.log(_res[2]);
      console.log(this.lastcreateduserid);
    });
  }
  getuserinfo() {
    this.db.list(`User`).valueChanges().subscribe(res => {
      const _res: any = res
      this.userinfo = _res;
    });
  }
  createroom() {
    let RoomId: any = new Date().getTime().toString();
    let Roomname: any = this.roomname;
    let id: String = new Date().getTime().toString();
    let Roompassword: any = this.roompassword;
    let user: any = this.useremail;
    let userid: number = 1;
    if (Roomname != '' && Roompassword != '') {
      this.db.object(`Room/${id}`).set(
        {
          RoomId: RoomId,
          Roomname: Roomname,
          password: Roompassword,
        }
      )
      this.db.object(`Room/${id}/user/${userid}`).update(
        {
          userid: userid,
          useremail: user,
        }
      )
    }

    this.getuserinfo();
    setTimeout(() => {
      let usercreated;
      let usercreatednumber: any | undefined;
      for (let i in this.userinfo) {
        usercreated = (user == this.userinfo[i].useremail);
        if (usercreated) {
          usercreatednumber = i;
          break;
        }
        usercreatednumber = i;
      }
      if (usercreated) {
        this.db.object(`User/${this.userinfo[usercreatednumber].userid}/Room/${RoomId}`).update(
          {
            RoomId: RoomId,
          }
        )
      }
      else {
        this.db.object(`User/${this.userinfo[usercreatednumber].userid + 1}`).set(
          {
            useremail: this.useremail,
            userid: this.userinfo[usercreatednumber].userid + 1,
          }
        )
        this.db.object(`User/${this.userinfo[usercreatednumber].userid + 1}/Room/${RoomId}`).update(
          {
            RoomId: RoomId,
          }
        )
      }
    }, 1000);
    alert('已成功建立');
    this.overlayRef.detach();
  }
  joinroom() {
    let RoomId: any = this.roomid;
    this.getroominfo(RoomId)
    this.getuserinfo();
    let Roompassword: any = this.roompassword;
    let user: any = this.useremail;

    setTimeout(() => {
      let userid: number = this.lastcreateduserid + 1;
      console.log(userid);
      console.log("RoomId:"+RoomId);
      console.log("cRoomId:"+this.createdroomid);
      console.log("Roomp:"+Roompassword);
      console.log("cRoomp:"+this.createdroompassword);
      if (RoomId != '' && Roompassword != '' && RoomId == this.createdroomid && Roompassword == this.createdroompassword) {
        this.db.object(`Room/${RoomId}/user/${userid}`).update(
          {
            userid: userid,
            useremail: user,
          }
        )

        let usercreated;
        let usercreatednumber: any | undefined;
        for (let i in this.userinfo) {
          usercreated = (user == this.userinfo[i].useremail);
          if (usercreated) {
            usercreatednumber = i;
            break;
          }
          usercreatednumber = i;
        }
        if (usercreated) {
          this.db.object(`User/${this.userinfo[usercreatednumber].userid}/Room/${RoomId}`).update(
            {
              RoomId: RoomId,
            }
          )
        }
        else {
          this.db.object(`User/${this.userinfo[usercreatednumber].userid + 1}`).set(
            {
              useremail: this.useremail,
              userid: this.userinfo[usercreatednumber].userid + 1,
            }
          )
          this.db.object(`User/${this.userinfo[usercreatednumber].userid + 1}/Room/${RoomId}`).update(
            {
              RoomId: RoomId,
            }
          )
        }
        alert('已成功加入聊天室');
        this.overlayRef.detach();
      }
      else{
        alert('您輸入的聊天室ID或者密碼是錯誤的喔!');
      }
    }, 1000);
  }
}
