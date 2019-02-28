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
import {SubjectService} from "../services/subject.service";
import {Subject} from "../models/Subject";
import {take} from "rxjs/operators";
import {FormControl} from '@angular/forms';
import {HomeService} from "../services/home.service";

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
  isLogged;

  userId;
  isAdmin: boolean;
  comments: Array<any>;
  API_HOST = Hosts.API_HOST;
  photoOfBook: File = null;
  fileOfBook: File = null;

  private subjects = [''];
  name = new FormControl('');
  private adminButton: string;

  constructor(
    private bookService: BookService,
    private commentService: CommentService,
    private userService: UserService,
    private homeSevice: HomeService,
    private subjectService: SubjectService,
    private activatedRouter: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.homeSevice.mainClicked.next('0');
    this.isLogged = !!localStorage.getItem('token');
    // Get param from URL /book/:id
    this.id = this.activatedRouter.snapshot.paramMap.get("id");

    if (this.isLogged) {
      this.userService.userDetail.subscribe((user: Response) => {
        if (user.success) {
          this.userId = user.message.id;
          this.isAdmin = Roles.ADMIN_ROLES.includes(user.message.role);
        }
      });
    }
    this.bookService.getBookInfo(this.id);
    this.bookService.bookInfo()
      .subscribe((resp: any) => {
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
      });
    this.downloadBook();
    this.commentService.getNewestComments(this.id, this.commentLimit);
    this.getFirstComments();
    this.getSubjects();
  }

  getFirstComments() {
    this.commentService.showComments()
      .subscribe((comm: any) => {
        this.comments = comm;
      })
  }

  moreComments() {
    // new limit of comments
    this.commentLimit = this.commentLimit + this.commentPaginationCount;
    this.commentService.getNewestComments(this.book.id, this.commentLimit)
  }

  createComment() {
    this.commentService.createComment(this.name.value, this.book.id);
    //reset reactive form after submit
    this.name.setValue('')
  }

  downloadBook() {
    this.bookService.download(this.id)
      .pipe(take(1))
      .subscribe((resp: Response) => {
        this.links = resp.message;
      })
  }

  readThisBook() {
    this.bookService.bookEvent(this.book.id, "read");
  }

  sillRead(bookId) {
    this.bookService.bookEvent(bookId, "continue");
  }

  returnBook(bookId) {
    this.bookService.bookEvent(bookId, "return");
    this.adminButton = '';
  }

  deleteBook() {
    this.bookService.deleteBook(this.book.id)
      .pipe(take(1))
      .subscribe((value: Response) => {
        if (value.success) {
          this.router.navigateByUrl('/')
        }
      })
  }

  updateBook(form) {
    if (!this.isBookDigital) {
      this.fileOfBook = null
    }
    this.bookService.updateBook(this.book.id, this.photoOfBook, this.fileOfBook, form);
    this.adminButton = ''
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

  getSubjects() {
    this.subjectService.getAllSubject();
    this.subjectService.allSubject()
      .pipe(take(1))
      .subscribe((resp: Array<Subject>) => {
        this.subjects = [''];
        resp.forEach(value => {
          this.subjects.push(value.subject)
        });
        console.log(this.subjects);
      });
  }


  adminClick(value) {
  //  delete, update, stat, inOffice, null
    this.adminButton = value
  }
}
