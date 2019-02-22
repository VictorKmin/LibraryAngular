import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BookService} from "../services/book.service";
import {CommentService} from "../services/comment.service";
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";
import {Response} from "../models/Response";
import {BookInfo} from "../models/BookInfo";
import {Digital} from "../models/Digital";
import {Hosts} from "../models/Hosts";
import {Roles} from "../models/Roles";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Output() onSendMessage: EventEmitter<any> = new EventEmitter();

  links: Digital;
  book: BookInfo;
  //info about book
  is_digital: boolean;
  is_reading: boolean;
  is_delaying: boolean;
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
  commentLimit: number = 5;
  commentPaginationCount: number = 5;
  isLogged = !!localStorage.getItem('token');

  userId;
  isAdmin: boolean;
  comments: Array<any>;
  isTokenPreset = localStorage.getItem('token');
  API_HOST = Hosts.API_HOST;
  photoOfBook: File = null;
  fileOfBook: File = null;

  isUpdateClicked = false;
  isDeleteClicked = false;
  isReadingClicked = false;
  isShowStat = false;

  constructor(
    private bookService: BookService,
    private commentService: CommentService,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    // Get param from URL /book/:id
    this.id = this.activatedRouter.snapshot.paramMap.get("id");

    if (this.isLogged) {
      this.userService.userDetail.subscribe(user => {
        if (user.success) {
          this.userId = user.message.id;
          this.isAdmin = Roles.ADMIN_ROLES.includes(user.message.role);
        }
      });
    }
    this.bookService.getBookInfo(this.id);
    this.bookService.bookInfo().subscribe((resp: any) => {
      this.book = resp;
      console.log(this.book);
      this.image = this.API_HOST + this.book.image;
      this.timeToEnd = new Date(this.book.backTime).toLocaleDateString();
      this.tags = this.book.tags.split(' ');
      this.is_digital = this.book.is_digital;
      this.is_reading = this.book.is_reading;
      this.is_delaying = this.book.is_delaying;
      this.userIdWhoRead = this.book.userIdWhoRead;
      this.title = this.book.title;
      this.author = this.book.author;
      this.publisher = this.book.publisher;
      this.summary = this.book.summary;
      this.subject = this.book.subject;
      this.countOfComments = this.book.countOfComments;
      if (this.book.is_digital) {
        this.downloadBook();
      }
      this.commentService.getNewestComments(this.id, this.commentLimit);
      this.commentService.showComments()
        .subscribe((comm: any) => {
        this.comments = comm;
      })
    });
  }


  allBookComments() {
    // new limit of comments
    this.commentLimit = this.commentLimit + this.commentPaginationCount;
    this.commentService.getNewestComments(this.id, this.commentLimit)
  }

  createComment(comment) {
    this.commentService.createComment(comment, this.id)
  }

  downloadBook() {
    this.bookService.download(this.id).subscribe((resp: Response) => {
      this.links = resp.message;
    })
  }

  readThisBook() {
    this.bookService.readBook(this.id).subscribe(value => {
      console.log(value);
    })
  }

  sillRead(bookId) {
    this.bookService.stillReadingBook(bookId).subscribe((value: Response) => {
      console.log(value);
    })
  }

  returnBook(bookId) {
    this.isReadingClicked = false;

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
    this.bookService.deleteBook(this.book.id).subscribe((value: Response) => {
      if (value.success) {
        this.router.navigateByUrl('/')
      }
    })
  }

  showUpdate() {
    this.isUpdateClicked = !this.isUpdateClicked;
  }

  updateBook(form) {
    // console.log(form);
    if (!this.isBookDigital) {
      this.fileOfBook = null
    }
    this.bookService.updateBook(this.book.id, this.photoOfBook, this.fileOfBook, form);
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

  showStat() {
    this.isShowStat = !this.isShowStat
  }
}
