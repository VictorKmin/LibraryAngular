import {Component, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {Response} from '../models/Response';


@Component({
  selector: 'app-top-books',
  templateUrl: './top-books.component.html',
  styleUrls: ['./top-books.component.css']
})
export class TopBooksComponent implements OnInit {

  constructor(private bookService: BookService) {
  }

  books: any;

  ngOnInit() {
    this.bookService.getTop5Books().subscribe((books: Response) => {
      console.log(books);
      this.books = books.message;
    });
  }

}
