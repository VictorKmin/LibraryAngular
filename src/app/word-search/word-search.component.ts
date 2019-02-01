import {Component, OnInit} from '@angular/core';
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

  constructor(private searchService: SearchService, private route: ActivatedRoute) {
  }


  /**
   * this.route.params return BehaviorSubject. We can subscribe on this Subject.
   * When route is change - we subscribe on this. We have params from route
   * When we have param "word" - we call method search book with search word
   */
  ngOnInit() {
    console.log(this.route.params);
    this.route.params.subscribe(params => {
      console.log(params);
      if (params.word) {
        this.searchBook(params.word)
      }
    });
  }

  searchBook(word) {
    this.searchService.searchByOneWord(word)
      .subscribe((books: Response) => {
        this.books = books.message;
        this.word = word;
      })
  }

}
