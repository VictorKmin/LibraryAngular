import { Component, OnInit } from '@angular/core';
import {Response} from "../models/Response";
import {SearchService} from "../services/search.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.component.html',
  styleUrls: ['./word-search.component.css']
})
export class WordSearchComponent implements OnInit {

  word;
  books;
  constructor(private searchService: SearchService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.word = this.route.snapshot.paramMap.get("word");

    this.searchService.searchByOneWord(this.word)
      .subscribe((books: Response) => {
        this.books = books.message;
      })
  }

}
