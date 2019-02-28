import {Component, OnInit} from '@angular/core';
import {BookService} from "../services/book.service";
import {Response} from "../models/Response";
import {Router} from '@angular/router';
import {SubjectService} from "../services/subject.service";
import {Subject} from "../models/Subject";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.css']
})
export class UploadBookComponent implements OnInit {

  types = ['handbook', 'digital'];
  subjects = [''];
  bookType: string;
  photoOfBook: File = null;
  fileOfBook: File = null;
  bookSubject: string;

  constructor(
    private bookService: BookService,
    private subjectService: SubjectService,
    private router: Router) {
  }

  ngOnInit() {
    this.subjectService.getAllSubject();
    this.subjectService.allSubject()
      .pipe(take(1))
      .subscribe((resp: Array<Subject>) => {
      resp.forEach(value => {
        this.subjects.push(value.subject)
      });
      console.log(this.subjects);
    });
  }

  changeBookType(type) {
    this.bookType = type.value;
  }
  changeSubject(subj) {
    this.bookSubject = subj
  }

  addBook(form) {
    if (this.bookType !== 'digital') {
      this.fileOfBook = null
    }
    this.bookService.postFile(this.photoOfBook, this.fileOfBook, form.value)
      .pipe(take(1))
      .subscribe((res: Response) => {
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
