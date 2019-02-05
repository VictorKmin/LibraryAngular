import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Hosts} from "../models/Hosts";


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  headers = new HttpHeaders()
  // .set('Content-Type', 'multipart/form-data')
  // .set('Accept', 'application/json',)
    .set('authorization', localStorage.getItem('token'));

  constructor(private httpClient: HttpClient) {
  }


}
