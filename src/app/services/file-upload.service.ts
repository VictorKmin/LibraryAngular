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


  postFile(fileToUpload: File) {

    const formData: FormData = new FormData();
    formData.append('photo', fileToUpload);
    formData.append('title', 'helloTitle');
    return this.httpClient
      .post(`${Hosts.API_HOST}/book`, formData, {headers: this.headers})
  }
}
