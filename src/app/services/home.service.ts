import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Hosts} from "../models/Hosts";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  mainClicked = new BehaviorSubject<string>('1');

  login(email, password) {
    return this.http.post(`${Hosts.API_HOST}/login`, {email, password})
  }

  logout() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', localStorage.getItem('token'));
    return this.http.delete(`${Hosts.API_HOST}/logout`, {headers})
  }
}
