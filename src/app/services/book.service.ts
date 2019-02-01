import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Hosts} from "../models/Hosts";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('authorization', localStorage.getItem('token'));

  constructor(private http: HttpClient) {
  }

  getBookInfo(id) {
    return this.http.get(`${Hosts.API_HOST}/book/${id}`);
  }

  getTop5Books() {
    // 0 is number of page, 5 is limit to search.
    // Maybe soon we will doing pagination
    return this.http.get(`${Hosts.API_HOST}/book/top/0/5`);
  }

  readBook(bookId) {
    return this.http.post(`${Hosts.API_HOST}/book/read/${bookId}`, {}, {headers: this.headers});
  }

  download(bookId) {
    return this.http.get(`${Hosts.API_HOST}/book/download/${bookId}`, {headers: this.headers});
  }

  getAllBooks() {
    return this.http.get(`${Hosts.API_HOST}/book`);
  }

  stillReadingBook(bookId, userId) {
    return this.http.patch(`${Hosts.API_HOST}/book`, {bookId, userId})
  }

  returnBook(bookId) {
    return this.http.delete(`${Hosts.API_HOST}/book/return/${bookId}`, {headers: this.headers})
  }
}
