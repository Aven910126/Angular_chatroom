import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  msgContent= new Subject<string>();
  constructor() { }

  setMessage(value: string) {
    this.msgContent.next(value);
  }
  getMessage() {
    return this.msgContent.asObservable();
  }
}