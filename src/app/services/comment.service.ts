import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  commentLimit: number;

  constructor(private socket: Socket) {
  }

  showComments() {
    return this.socket.fromEvent('comments')
  }

  getNewestComments(bookId, limit) {
    this.commentLimit = limit;
    this.socket.emit('getComments', {bookId, limit});
  }

  createComment(comment, bookId) {
    const token = localStorage.getItem('token');
    this.socket.emit('createComment',
      {comment, bookId, token, limit: this.commentLimit});
  }

  deleteComment(commentId) {
    const token = localStorage.getItem('token');
    this.socket.emit('deleteComment',
      {commentId, token, limit: this.commentLimit})
  }

  updateComment(commentId: number, newComment: any) {
    const token = localStorage.getItem('token');
    this.socket.emit('updateComment',
      {commentId, token, newComment, limit: this.commentLimit})
  }
}
