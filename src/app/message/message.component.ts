import { Component, OnInit } from '@angular/core';
import { FriendService } from '../friend.service';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  img;
  name = "local"
  constructor(friendService : FriendService) { 
      this.img = friendService.getimg();
  }

  ngOnInit(): void {
  }

}
