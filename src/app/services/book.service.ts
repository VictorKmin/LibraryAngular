import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Hosts} from "../models/Hosts";
import {Socket} from 'ngx-socket-io';
import {Response} from "../models/Response";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private socket: Socket) {
  }

  getBookInfo(id) {
    this.socket.emit('getBook', id);
  }

  bookInfo() {
    return this.socket.fromEvent('book')
  }

  topBooks() {
    return this.socket.fromEvent('topBooks')
  }


  getTop(page, topValue) {
    this.socket.emit('getTop', {page, limit: 5, topValue})
  }

  bookEvent(bookId, bookEv) {
    const token = localStorage.getItem('token');
    this.socket.emit('bookEvent', {bookId, token, bookEv})
  }

  download(bookId) {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('token'));
    return this.http.get(`${Hosts.API_HOST}/book/download/${bookId}`, {headers});
  }

  getAllBooks(page, limit) {
    return this.http.get(`${Hosts.API_HOST}/book/${page}/${limit}`);
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
    this.http.put(`${Hosts.API_HOST}/book/${bookId}`, formData, {headers})
      .subscribe((value: Response) => {
      if (value.success) {
        this.getBookInfo(bookId);
      }
    })
  }
}
