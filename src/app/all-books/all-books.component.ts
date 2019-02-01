import {Component, OnInit} from '@angular/core';
import {BookService} from "../services/book.service";
import {Response} from "../models/Response";

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit {

  books: any;

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.bookService.getAllBooks().subscribe((books: Response) => {
      this.books = books.message;
    })
  }

}
