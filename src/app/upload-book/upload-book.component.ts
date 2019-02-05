import {Component} from '@angular/core';
import {BookService} from "../services/book.service";

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.css']
})
export class UploadBookComponent {

  types = ['handbook', 'digital'];
  bookType: string;
  photoOfBook: File = null;
  fileOfBook: File = null;

  constructor(private bookService: BookService) {
  }

  changeBookType(type) {
    this.bookType = type.value;
  }


  addBook(form) {
    if (this.bookType !== 'digital') {
      this.fileOfBook = null
    }
    this.bookService.postFile(this.photoOfBook, this.fileOfBook, form.value).subscribe(res => {
      console.log(res);
    })
  }

  photoInput(file) {
    this.photoOfBook = file.target.files[0];
  }

  fileInput(file) {
    this.fileOfBook = file.target.files[0];
  }
}
