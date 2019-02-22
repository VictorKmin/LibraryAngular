import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Hosts} from "../models/Hosts";
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient, private socket: Socket) {
  }

  getReadingActivityById(bookId: number) {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('token'));
    return this.http.get(`${Hosts.API_HOST}/activity/reading/${bookId}`, {headers})
  }

  getCommentActivityById(bookId: number) {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('token'));
    return this.http.get(`${Hosts.API_HOST}/activity/comment/${bookId}`, {headers})
  }

  getRatingActivityById(bookId: number) {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('token'));
    return this.http.get(`${Hosts.API_HOST}/activity/rating/${bookId}`, {headers})
  }

  getTopReadedBooks(limit) {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('token'));
    return this.http.get(`${Hosts.API_HOST}/activity/topbooks/${limit}`, {headers})
  }

  getTopUsers(limit) {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('token'));
    return this.http.get(`${Hosts.API_HOST}/activity/topusers/${limit}`, {headers})
  }


  getReadingInfo() {
    return this.socket.fromEvent('readingInfo');
  }

  getMoreReadingInfo(limit) {
    const token = localStorage.getItem('token');
    this.socket.emit('getReadingInfo', {token, limit})
  }

  getCommentInfo() {
    return this.socket.fromEvent('commentInfo');
  }

  getMoreCommentInfo(limit) {
    const token = localStorage.getItem('token');
    this.socket.emit('getCommentInfo', {token, limit})
  }

  getRatingInfo() {
    return this.socket.fromEvent('ratingInfo');
  }

  getMoreRatingInfo(limit) {
    const token = localStorage.getItem('token');
    this.socket.emit('getRatingInfo', {token, limit})
  }
}
