import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Hosts} from "../models/Hosts";
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  headers = new HttpHeaders()
    .set('authorization', localStorage.getItem('token'));

  constructor(private http: HttpClient, private socket: Socket) {
  }

  getBookInfo(id) {
    // return this.http.get(`${Hosts.API_HOST}/book/${id}`);
    this.socket.emit('getBook', id);

  }

  bookInfo() {
    return this.socket.fromEvent('book')
  }

  topBooks() {
    return this.socket.fromEvent('topBooks')
  }

  // Top 5 By Rating
  getTopByRating(page) {
   this.http.get(`${Hosts.API_HOST}/book/topByRating/${page}/5`).subscribe(value => {
     // console.log(value);
   })
  }

  getTopByReading(page) {
    this.http.get(`${Hosts.API_HOST}/book/topByReading/${page}/5`).subscribe(value => {
      // console.log(value);
    })
  }

  getTopByComments(page) {
    this.http.get(`${Hosts.API_HOST}/book/topByComments/${page}/5`).subscribe(value => {
      // console.log(value);
    })
  }

  readBook(bookId) {
    return this.http.post(`${Hosts.API_HOST}/book/read/${bookId}`, {}, {headers: this.headers});
  }

  download(bookId) {
    return this.http.get(`${Hosts.API_HOST}/book/download/${bookId}`, {headers: this.headers});
  }

  getAllBooks(page) {
    // 10 - offset count
    return this.http.get(`${Hosts.API_HOST}/book/${page}/10`);
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
    this.http.put(`${Hosts.API_HOST}/book/${bookId}`, formData, {headers: this.headers}).subscribe(value => {
      console.log(value);
    })
  }
}
