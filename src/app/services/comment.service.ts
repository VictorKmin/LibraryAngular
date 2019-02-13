import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Hosts} from "../models/Hosts";
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  bookId: number;

  constructor(private http: HttpClient, private socket: Socket) {
  }

  createComment(comment, bookId) {
    this.bookId = bookId;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', localStorage.getItem('token'));
    this.http.post(`${Hosts.API_HOST}/comment`, {comment, bookId}, {headers}).subscribe(value => {
      console.log(value);
    });

    // const token = localStorage.getItem('token');
    // this.socket.emit('createComment', {comment, bookId: id, token});
    return this.socket.fromEvent('allComments');
  }

  getAllComments(bookId) {
    this.bookId = bookId;
    // socket.on('buildChart', async body => {
    //   socket.emit('charts', await getFullStat(body));
    //   socket.emit('timeLine', await getDaysCount(body.roomId));
    // });

    // const token = localStorage.getItem('token');
    this.socket.emit('allComments', {bookId});
  }


  deleteComment(id) {
    // const headers = new HttpHeaders()
    //   .set('Content-Type', 'application/json')
    //   .set('authorization', localStorage.getItem('token'));
    // return this.http.delete(`${Hosts.API_HOST}/comment/${id}`, {headers})

    const token = localStorage.getItem('token');
    this.socket.emit('deleteComment', {commentId: id, token, bookId: this.bookId});
    return this.socket.fromEvent('allComments');
  }

  updateComment(id: number, newComment: any) {
    // const headers = new HttpHeaders()
    //   .set('Content-Type', 'application/json')
    //   .set('authorization', localStorage.getItem('token'));
    // return this.http.patch(`${Hosts.API_HOST}/comment/${id}`, {comment: newComment},{headers})

    const token = localStorage.getItem('token');
    this.socket.emit('updateComment', {commentId: id, comment: newComment, token});
    return this.socket.fromEvent('allComments');
  }
}
