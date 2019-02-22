import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Hosts} from "../models/Hosts";
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class BookService {

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
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('token'));
    return this.http.post(`${Hosts.API_HOST}/book/read/${bookId}`, {}, {headers});
  }

  download(bookId) {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('token'));
    return this.http.get(`${Hosts.API_HOST}/book/download/${bookId}`, {headers});
  }

  getAllBooks(page, limit) {
    return this.http.get(`${Hosts.API_HOST}/book/${page}/${limit}`);
  }

  stillReadingBook(bookId) {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('token'));
    return this.http.patch(`${Hosts.API_HOST}/book`, {bookId}, {headers})
  }

  returnBook(bookId) {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('token'));
    return this.http.delete(`${Hosts.API_HOST}/book/return/${bookId}`, {headers})
  }

  postFile(photoOfBook: File, fileOfBook: File, body) {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('token'));

    const formData: FormData = new FormData();
    formData.append('photo', photoOfBook);
    formData.append('file', fileOfBook);
    formData.append('info', JSON.stringify(body));
    return this.http
      .post(`${Hosts.API_HOST}/book`, formData, {headers})
  }

  //ADMIN METHODS
  deleteBook(bookId) {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('token'));
    return this.http.delete(`${Hosts.API_HOST}/book/${bookId}`, {headers})
  }

  updateBook(bookId, photoOfBook: File, fileOfBook: File, bookInfo) {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('token'));

    const formData: FormData = new FormData();
    formData.append('photo', photoOfBook);
    formData.append('file', fileOfBook);
    formData.append('info', JSON.stringify(bookInfo));
    this.http.put(`${Hosts.API_HOST}/book/${bookId}`, formData, {headers}).subscribe(value => {
      console.log(value);
    })
  }
}
