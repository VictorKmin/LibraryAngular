import {Component, OnInit} from '@angular/core';
import {SearchService} from "../services/search.service";
import {ActivatedRoute} from "@angular/router";
import {Response} from "../models/Response";

@Component({
  selector: 'app-tag-search',
  templateUrl: './tag-search.component.html',
  styleUrls: ['./tag-search.component.css']
})
export class TagSearchComponent implements OnInit {

  tag;
  books;

  constructor(private searchService: SearchService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.tag = this.route.snapshot.paramMap.get("tag");

    this.searchService.searchByTag(this.tag)
      .subscribe((books: Response) => {
        this.books = books.message;
      })
  }

}
