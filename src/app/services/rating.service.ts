import {Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private socket: Socket) {
  }

  getBookRating(bookId: any, token) {
    this.socket.emit('getRating', {bookId, token});
  }

  bookRating() {
    return this.socket.fromEvent('bookRating')
  }

  rateBook(bookId: any, star) {
    const token = localStorage.getItem('token');
    this.socket.emit("rateBook", {token, bookId, star})
  }

  deleteVote(bookId: any) {
    const token = localStorage.getItem('token');
    this.socket.emit("deleteVote", {token, bookId})
  }
}
