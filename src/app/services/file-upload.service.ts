import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Hosts} from "../models/Hosts";


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('authorization', localStorage.getItem('token'));

  constructor(private httpClient: HttpClient) {
  }


  postFile(fileToUpload: File): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(`${Hosts.API_HOST}/book`, formData, {headers: this.headers})
  }
}
