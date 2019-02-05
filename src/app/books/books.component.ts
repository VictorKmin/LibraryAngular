import {Component, Input, OnInit} from '@angular/core';
import {Hosts} from "../models/Hosts";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  title;
  avgStar;
  type_of_book;
  id;
  countOfVotes;
  image;

  constructor() {
  }

  @Input() book: any;

  ngOnInit() {
    console.log(this.book);
    this.title = this.book.title;
    this.id = this.book.id;
    this.type_of_book = this.book.type_of_book;
    this.avgStar = this.book.avgStar;
    this.countOfVotes = this.book.countOfVotes;
    this.image = Hosts.API_HOST + this.book.image;
  }

}
