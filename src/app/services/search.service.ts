import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Hosts} from "../Hosts";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  searchByTag(tag) {
    return this.http.get(`${Hosts.API_HOST}/search/tag/${tag}`)
  }
}
