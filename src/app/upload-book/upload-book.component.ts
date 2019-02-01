import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.css']
})
export class UploadBookComponent implements OnInit {

  types = ['handbook','digital'];
  bookType: string;
  constructor() { }

  ngOnInit() {
  }

  changeBookType(type) {
    this.bookType = type.value;
  }

  addBook(value) {
    console.log(value.value);
  }
}
