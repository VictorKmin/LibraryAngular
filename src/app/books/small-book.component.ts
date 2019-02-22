import {Component, Input, OnInit} from '@angular/core';
import {Hosts} from "../models/Hosts";

@Component({
  selector: 'app-small-book',
  templateUrl: './small-book.component.html',
  styleUrls: ['./small-book.component.css']
})
export class SmallBookComponent implements OnInit {

  title;
  hoveredTitle;
  avgStar;
  type_of_book;
  is_digital;
  id;
  countOfVotes;
  image;

  constructor() {
  }

  @Input() book: any;

  ngOnInit() {
    this.hoveredTitle = this.book.title;
    if (this.book.title.length > 15) {
      this.title = this.book.title.slice(0, 12) + '...';
    } else {
      this.title = this.book.title
    }
    this.id = this.book.id;
    this.type_of_book = this.book.type_of_book;
    this.avgStar = this.book.avgStar;
    this.is_digital = this.book.is_digital;
    this.countOfVotes = this.book.countOfVotes;
    this.image = Hosts.API_HOST + this.book.image;
  }

  ckc() {
    localStorage.setItem('mainClicked', "0");
  }
}
