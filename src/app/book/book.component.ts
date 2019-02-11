import {Component, OnInit} from '@angular/core';
import {BookService} from "../services/book.service";
import {CommentService} from "../services/comment.service";
import {ActivatedRoute} from "@angular/router";
import {Response} from "../models/Response";
import {BookInfo} from "../models/BookInfo";
import {Digital} from "../models/Digital";
import {Hosts} from "../models/Hosts";
import {UserService} from "../services/user.service";


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  links: Digital;
  book: BookInfo;
  //info about book
  is_digital: boolean;
  is_reading: boolean;
  userIdWhoRead;
  image: any;
  timeToEnd?: string;
  tags: any;
  isBookDigital = this.is_digital;
  id: any;
  title: string;
  author: string;
  publisher: string;
  summary: any;
  subject: string;
  countOfComments: number;
  isLogged = !!localStorage.getItem('token');

  userId;
  userRole;
  comments: Array<any>;
  isTokenPreset = localStorage.getItem('token');
  API_HOST = Hosts.API_HOST;
  photoOfBook: File = null;
  fileOfBook: File = null;

  isUpdateClicked = false;
  isDeleteClicked = false;
  isReadingClicked = false;

  constructor(
    private bookService: BookService,
    private commentService: CommentService,
    private userService: UserService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    // Get param from URL /book/:id
    this.id = this.route.snapshot.paramMap.get("id");

    if (this.isLogged) {
      this.userService.userDetail.subscribe(user => {
        if (user.success) {
          this.userId = user.message.id;
          this.userRole = user.message.role;
        }
      });
    }
    this.bookService.getBookInfo(this.id).subscribe((resp: Response) => {
      this.book = resp.message;
      console.log(this.book);
      this.image = this.API_HOST + this.book.image;
      this.timeToEnd = new Date(this.book.backTime).toLocaleDateString();
      this.tags = this.book.tags.split(' ');
      this.is_digital = this.book.is_digital;
      this.is_reading = this.book.is_reading;
      this.userIdWhoRead = this.book.userIdWhoRead;
      this.title = this.book.title;
      this.author = this.book.author;
      this.publisher = this.book.publisher;
      this.summary = this.book.summary;
      this.subject = this.book.subject;
      this.countOfComments = this.book.countOfComments;
      // Bad practice. TODO normal
      if (this.book.is_digital) {
        this.downloadBook();
      }
    });
  }

  allBookComments() {
    this.commentService.getAllComments(this.id).subscribe((resp: Response) => {
      this.comments = resp.message
    })
  }

  createComment(comment) {
    this.commentService.createComment(comment, this.id).subscribe(value => {
      console.log(value);
    })
  }

  readThisBook() {
    this.bookService.readBook(this.id).subscribe(value => {
      console.log(value);
    })
  }

  downloadBook() {
    this.bookService.download(this.id).subscribe((resp: Response) => {
      this.links = resp.message;
    })
  }

  sillRead(bookId) {
    this.bookService.stillReadingBook(bookId).subscribe((value: Response) => {
      console.log(value);
    })
  }

  returnBook(bookId) {
    this.bookService.returnBook(bookId).subscribe((value: Response) => {
      console.log(value);
    })
  }

  showNotReading() {
    this.isReadingClicked = !this.isReadingClicked
  }

  showDelete() {
    this.isDeleteClicked = !this.isDeleteClicked
  }

  deleteBook() {
    this.bookService.deleteBook(this.book.id).subscribe(value => {
      console.log(value);
    })
  }

  showUpdate() {
    this.isUpdateClicked = !this.isUpdateClicked;
  }

  updateBook(form) {
    console.log(form);
    if (!this.isBookDigital) {
      this.fileOfBook = null
    }
    this.bookService.updateBook(this.book.id, this.photoOfBook, this.fileOfBook, form).subscribe(value => {
      console.log(value);
    });
    this.isUpdateClicked = false;
  }

  changeBookType(target) {
    this.isBookDigital = target.value === 'digital';
  }

  photoInput(file) {
    this.photoOfBook = file.target.files[0];
  }

  fileInput(file) {
    this.fileOfBook = file.target.files[0];
  }

  bookReturned() {
    console.log('TODO')
    // TODO return book admin method
  }
}
