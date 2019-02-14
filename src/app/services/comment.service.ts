import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Socket} from 'ngx-socket-io';
import {Hosts} from "../models/Hosts";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private socket: Socket) {
  }

  token = localStorage.getItem('token');

  showComments() {
    return this.socket.fromEvent('comments')
  }

  createComment(comment, bookId) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', localStorage.getItem('token'));
    this.http.post(`${Hosts.API_HOST}/comment`, {comment, bookId}, {headers}).subscribe(value => {
      console.log(value);
    });
  }

  getNewestCommentsComments(bookId, limit) {
    this.socket.emit('getComments', {bookId, limit});
  }

  deleteComment(id) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', localStorage.getItem('token'));
    this.http.delete(`${Hosts.API_HOST}/comment/${id}`, {headers}).subscribe(value => {
      console.log(value);
    });
  }

  updateComment(commentId: number, newComment: any) {
    this.socket.emit('updateComment', {commentId, newComment, token: this.token});
  }
}
