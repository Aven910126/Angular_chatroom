import { Component, OnInit } from '@angular/core';
import { FriendService } from '../friend.service';
@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  img;
  friendState;
  name;
  constructor( friendService : FriendService) { 
    this.img = friendService.getimg();
    this.name = friendService.getfriendname();
    this.friendState = friendService.getState();
  }

  ngOnInit(): void {
  }

}
