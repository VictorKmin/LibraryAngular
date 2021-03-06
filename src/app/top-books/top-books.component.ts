import {Component, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';

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
      this.bookService.getTop(1, 'rating')
    }
    if (whatIsClicked === 'comment') {
      this.bookService.getTop(1, 'comment')
    }
    if (whatIsClicked === 'reading') {
      this.bookService.getTop(1, 'reading')
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
}
