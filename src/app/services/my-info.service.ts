import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class MyInfoService {

  constructor(private socket: Socket) {
  }


  getMyBookInfo() {
    const token = localStorage.getItem('token');
    this.socket.emit('getReadingInfo', {token})
  }

  myBookInfo() {
    return this.socket.fromEvent('myReadingInfo')
  }

}
