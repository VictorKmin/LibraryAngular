import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Hosts} from "../models/Hosts";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  searchByTag(tag) {
    return this.http.get(`${Hosts.API_HOST}/search/tag/${tag}`)
  }

  searchByOneWord(word) {
    return this.http.get(`${Hosts.API_HOST}/search/?word=${word}`)
  }

}
