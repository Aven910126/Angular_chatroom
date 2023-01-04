import { Component } from '@angular/core';
import { FriendService } from '../friend.service';
@Component({
  selector: 'friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent {
   name;
   img;
   friendState;
  constructor( friendService : FriendService){
      this.name = friendService.getfriendname();
      this.img = friendService.getimg();
      this.friendState = friendService.getState();
  }
  title = 'chatroom'; 
}
