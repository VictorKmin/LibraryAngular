import {Component, OnInit} from '@angular/core';
import {BookService} from "../services/book.service";
import {Response} from "../models/Response";
import {take} from "rxjs/operators";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit {

  books: any;
  pages = [];
  booksOnPage = ["10", "20", "50", "100"];
  limitForm = new FormControl("10");
  limit = "10";

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.getAllBooks()
  }

  getAllBooks() {
    this.pages = [];
    this.bookService.getAllBooks(1, this.limit)
      .pipe(take(1))
      .subscribe((books: Response) => {
        console.log(books.message);
        this.books = books.message.books;
        const pageCount = books.message.pageCount;

        if (pageCount > 1) {
          for (let i = 1; i <= pageCount; i++) {
            this.pages.push(i)
          }
        }
      })
  }

  changePage(page: number) {
    console.log(this.limit);
    this.bookService.getAllBooks(page, this.limit)
      .pipe(take(1))
      .subscribe((books: Response) => {
        this.books = books.message.books;
      })
  }

  changeBookSCount(input) {
    console.log(input.value , typeof input.value);
    this.limitForm.setValue(input.value);
    this.limit = input.value
    this.getAllBooks()
  }
}
