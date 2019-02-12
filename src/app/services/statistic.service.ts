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

  getReadingActivityById(bookId: number) {
    return this.http.get(`${Hosts.API_HOST}/activity/reading/${bookId}`, {headers: this.headers})
  }

  getCommentActivityById(bookId: number) {
    return this.http.get(`${Hosts.API_HOST}/activity/comment/${bookId}`, {headers: this.headers})
  }

  getRatingActivityById(bookId: number) {
    return this.http.get(`${Hosts.API_HOST}/activity/rating/${bookId}`, {headers: this.headers})
  }

  getTopReadedBooks(limit) {
    return this.http.get(`${Hosts.API_HOST}/activity/topbooks/${limit}`, {headers: this.headers})
  }

  getTopUsers(limit) {
    return this.http.get(`${Hosts.API_HOST}/activity/topusers/${limit}`, {headers: this.headers})
  }

  getAllReadingInfo() {
    return this.http.get(`${Hosts.API_HOST}/activity/reading`, {headers: this.headers})
  }

  getAllCommentInfo() {
    return this.http.get(`${Hosts.API_HOST}/activity/comment`, {headers: this.headers})
  }

  getAllRatingInfo() {
    return this.http.get(`${Hosts.API_HOST}/activity/rating`, {headers: this.headers})
  }
}
