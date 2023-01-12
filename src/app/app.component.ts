import { Component } from '@angular/core';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {firebaseConfig} from "../firebase/firebaseUtil";
import {AngularFireMessaging} from "@angular/fire/compat/messaging";
import {mergeMapTo} from "rxjs";
import * as url from "url";
import * as http from "http";
// @ts-ignore
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  // template: '<button (click)="requestPermission()">\n' +
  //   '    Hello this is a chat app. You should let us send you notifications for this reason.\n' +
  //   '  </button>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatroom';
  constructor(private afMessaging: AngularFireMessaging) { }
  requestPermission() {
    console.log("Press")
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => {
          console.log('Permission granted! Save to the server!', token); },
        (error) => { console.error(error); },
      );
  }
  // sendMsg(){
  //   var urlstr = 'https://fcm.googleapis.com/v1/projects/angularchatroom-8e896/messages:send';
  //   var urlData = url.parse(urlstr);
  //   var bodyQueryStr =  {
  //     "message": {
  //       "token": "dbPNlPmXYbp1ZCpwj082Td:APA91bFEYL6nBp6fzaBnt85BxSk0hyw3MpZsRxfL3R8UpqgGbq4W9OmA_KoquZYaRUXQxZ5ks7lIJl1MxCB_gWCXj8ignuFAM4chw9IRrlPPHGJVDE9cpDk9cEM0UXC-vbI7CRd4uapy",
  //       "data": {
  //         "body": "Body of Your Notification in data",
  //         "title": "Title of Your Notification in data",
  //         "key_1": "Value for key_1",
  //         "key_2": "Value for key_2"
  //       }
  //     }
  //   }
  //   var contentStr = JSON.stringify(bodyQueryStr);
  //   var contentLen = Buffer.byteLength(contentStr, 'utf8');
  //   let opt = {
  //     hostname: urlData.hostname,
  //     path: urlData.path,
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Content-Length': contentLen
  //     }
  //   };
  //   http.request("post",function(httpRes) {
  //     let buffers:any[]=[];
  //     httpRes.on('data', function(result) {
  //       buffers.push(result);
  //     });
  //
  //     httpRes.on('end', function() {
  //       var wholeData = Buffer.concat(buffers);
  //       var dataStr = wholeData.toString('utf8');
  //       console.log('content ' + dataStr);
  //     });
  //   }).on('error', function(err) {
  //     console.log('error ' + err);
  //   });
  // }

}
