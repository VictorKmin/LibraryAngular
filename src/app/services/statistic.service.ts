import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Hosts} from "../models/Hosts";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) {
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

  getAllReadingInfo() {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('token'));
    return this.http.get(`${Hosts.API_HOST}/activity/reading`, {headers})
  }

  getAllCommentInfo() {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('token'));
    return this.http.get(`${Hosts.API_HOST}/activity/comment`, {headers})
  }

  getAllRatingInfo() {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('token'));
    return this.http.get(`${Hosts.API_HOST}/activity/rating`, {headers})
  }
}
