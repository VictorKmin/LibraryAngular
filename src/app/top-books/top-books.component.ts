import {Component, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {Response} from '../models/Response';
import {take} from "rxjs/operators";

@Component({
  selector: 'app-top-books',
  templateUrl: './top-books.component.html',
  styleUrls: ['./top-books.component.css']
})
export class TopBooksComponent implements OnInit {

  constructor(private bookService: BookService) {
  }

  books: any;
  pages = [];

  ngOnInit() {
    const whatIsClicked = localStorage.getItem('topClicked');

    // Check what button was clicked before i change page
    if (!whatIsClicked || whatIsClicked === 'rating') {
      this.bookService.getTopByRating(1)
    }
    if (whatIsClicked === 'comment') {
      this.bookService.getTopByComments(1)
    }
    if (whatIsClicked === 'reading') {
      this.bookService.getTopByReading(1)
    }

    this.bookService.topBooks()
      .subscribe((books: any) => {
        this.pages = [];
        console.log(books);
        this.books = books.books;
        const pageCount = books.pageCount;

        for (let i = 1; i <= pageCount; i++) {
          this.pages.push(i)
        }
      });
  }

  changePage(page: number) {
    const whatIsClicked = localStorage.getItem('topClicked');

    if (!whatIsClicked || whatIsClicked === 'rating') {
      this.bookService.getTopByRating(page)
    }
    if (whatIsClicked === 'comment') {
      this.bookService.getTopByComments(page)
    }
    if (whatIsClicked === 'reading') {
      this.bookService.getTopByReading(page)
    }
  }
}
