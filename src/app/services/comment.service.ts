import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  createComment(comment, id) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', localStorage.getItem('token'));
    return this.http.post(`http://192.168.0.131:3001/comment`, {comment, bookId: id}, {headers});
  }

  getAllComments(bookId) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', localStorage.getItem('token'));
    return this.http.get(`http://192.168.0.131:3001/comment?id=${bookId}`, {headers});
  }
}
