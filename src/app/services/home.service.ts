import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  login(email, password) {
    return this.http.post('http://192.168.0.131:3001/login', {email, password})
  }

  logout() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', localStorage.getItem('token'));
    return this.http.delete('http://192.168.0.131:3001/logout', {headers})
  }
}
