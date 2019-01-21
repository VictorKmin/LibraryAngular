import {Component, OnInit} from '@angular/core';
import {HomeService} from '../home.service';
import {Response} from '../Response';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) {
  }

  books: any;

  ngOnInit() {
    this.homeService.getTop5Books().subscribe((books: Response) => {
      console.log(books);
      this.books = books.message;
    });
  }

}
