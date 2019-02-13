import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Hosts} from "../models/Hosts";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  headers = new HttpHeaders()
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

  stillReadingBook(bookId) {
    return this.http.patch(`${Hosts.API_HOST}/book`, {bookId}, {headers: this.headers})
  }

  returnBook(bookId) {
    return this.http.delete(`${Hosts.API_HOST}/book/return/${bookId}`, {headers: this.headers})
  }

  postFile(photoOfBook: File, fileOfBook: File, body) {
    const formData: FormData = new FormData();
    formData.append('photo', photoOfBook);
    formData.append('file', fileOfBook);
    formData.append('info', JSON.stringify(body));
    return this.http
      .post(`${Hosts.API_HOST}/book`, formData, {headers: this.headers})
  }

  //ADMIN METHODS
  deleteBook(bookId) {
    return this.http.delete(`${Hosts.API_HOST}/book/${bookId}`, {headers: this.headers})
  }

  updateBook(bookId, photoOfBook: File, fileOfBook: File, bookInfo) {
    const formData: FormData = new FormData();
    formData.append('photo', photoOfBook);
    formData.append('file', fileOfBook);
    formData.append('info', JSON.stringify(bookInfo));
    return this.http.put(`${Hosts.API_HOST}/book/${bookId}`, formData, {headers: this.headers})
  }
}
