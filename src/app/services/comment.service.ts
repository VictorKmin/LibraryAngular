import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Hosts} from "../models/Hosts";

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
    return this.http.post(`${Hosts.API_HOST}/comment`, {comment, bookId: id}, {headers});
  }

  getAllComments(bookId) {
    return this.http.get(`${Hosts.API_HOST}/comment?id=${bookId}`);
  }


  deleteComment(id) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', localStorage.getItem('token'));
    return this.http.delete(`${Hosts.API_HOST}/comment/${id}`, {headers})
  }

  updateComment(id: number, newComment: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', localStorage.getItem('token'));
    return this.http.patch(`${Hosts.API_HOST}/comment/${id}`, {comment: newComment},{headers})
  }
}
