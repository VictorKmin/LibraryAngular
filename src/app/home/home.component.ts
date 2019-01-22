import {Component, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {Response} from '../Response';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
