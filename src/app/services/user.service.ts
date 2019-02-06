import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Hosts} from "../models/Hosts";
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userDetail = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {
  }

  getUserInfo() {
   const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token'));
    return this.http.get(`${Hosts.API_HOST}/user/info`, {headers})
  }
}
