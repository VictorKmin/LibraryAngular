import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Hosts} from "../models/Hosts";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  headers = new HttpHeaders()
    .set('authorization', localStorage.getItem('token'));

  constructor(private http: HttpClient) {
  }

  getReadingActivity(bookId: number) {
    return this.http.get(`${Hosts.API_HOST}/activity/reading/${bookId}`, {headers: this.headers})
  }

  getCommentActivity(bookId: number) {
    return this.http.get(`${Hosts.API_HOST}/activity/comment/${bookId}`, {headers: this.headers})
  }

  getRatingActivity(bookId: number) {
    return this.http.get(`${Hosts.API_HOST}/activity/rating/${bookId}`, {headers: this.headers})
  }

  getTopReadedBooks(limit) {
    return this.http.get(`${Hosts.API_HOST}/activity/topbooks/${limit}`, {headers: this.headers})
  }

  getTopUsers(limit) {
    return this.http.get(`${Hosts.API_HOST}/activity/topusers/${limit}`, {headers: this.headers})
  }
}
