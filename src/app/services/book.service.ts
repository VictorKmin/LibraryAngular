import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Hosts} from "../models/Hosts";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  getBookInfo(id) {
    return this.http.get(`${Hosts.API_HOST}/book/${id}`);
  }

  getTop5Books() {
    return this.http.get(`${Hosts.API_HOST}/book/top/0/5`);
  }

  readBook(bookId) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', localStorage.getItem('token'));
    return this.http.post(`${Hosts.API_HOST}/book/read/${bookId}`, {}, {headers});
  }

  download(bookId) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', localStorage.getItem('token'));
    return this.http.get(`${Hosts.API_HOST}/book/download/${bookId}`, {headers});
  }
}
