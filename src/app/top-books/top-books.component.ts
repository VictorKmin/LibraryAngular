import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-top-books',
  templateUrl: './top-books.component.html',
  styleUrls: ['./top-books.component.css']
})
export class TopBooksComponent implements OnInit {

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
    this.title = this.book.bookInfo.title;
    this.id = this.book.id;
    this.type_of_book = this.book.bookInfo.type_of_book;
    this.avgStar = this.book.avgStar;
    this.countOfVotes = this.book.countOfVotes;
    this.image = this.book.bookInfo.image
  }

}
