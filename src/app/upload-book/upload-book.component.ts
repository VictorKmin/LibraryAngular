import {Component} from '@angular/core';
import {BookService} from "../services/book.service";
import {Response} from "../models/Response";
import {Router} from '@angular/router';

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

  constructor(
    private bookService: BookService,
    private router: Router) {
  }

  changeBookType(type) {
    this.bookType = type.value;
  }


  addBook(form) {
    if (this.bookType !== 'digital') {
      this.fileOfBook = null
    }
    this.bookService.postFile(this.photoOfBook, this.fileOfBook, form.value).subscribe((res: Response) => {
      if (res.success) {
        const bookId = res.message;
        this.router.navigateByUrl(`/book/${bookId}`);
      }
    })
  }

  photoInput(file) {
    this.photoOfBook = file.target.files[0];
  }

  fileInput(file) {
    this.fileOfBook = file.target.files[0];
  }
}
