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
  pages = [];

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.bookService.getAllBooks(1).subscribe((books: Response) => {
      console.log(books.message);
      this.books = books.message.books;
      const pageCount = books.message.pageCount;

      for (let i = 1; i <= pageCount; i++) {
        this.pages.push(i)
      }
    })
  }

  changePage(page: number) {
    this.bookService.getAllBooks(page).subscribe((books: Response) => {
      this.books = books.message.books;
    })
  }
}
