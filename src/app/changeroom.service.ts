import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeroomService {
  room= new Subject<string>();
  constructor() { }

  setRoom(value: string) {
    this.room.next(value);
  }
  getRoom() {
    return this.room.asObservable();
  }
}