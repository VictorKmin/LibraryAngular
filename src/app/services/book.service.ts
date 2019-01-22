import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, ) {
  }

  getBookInfo(id) {
    return this.http.get(`http://192.168.0.131:3001/book/${id}`);
  }

  getTop5Books() {
    return this.http.get('http://192.168.0.131:3001/book/top/0/5');
  }
}
