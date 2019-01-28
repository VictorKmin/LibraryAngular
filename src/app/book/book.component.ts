import {Component, OnInit} from '@angular/core';
import {BookService} from "../services/book.service";
import {CommentService} from "../services/comment.service";
import {ActivatedRoute} from "@angular/router";
import {Response} from "../Response";
import {BookInfo} from "../BookInfo";
import {Digital} from "../Digital";
import {Hosts} from "../Hosts";


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  links: Digital;
  book: BookInfo;
  comments: Array<any>;
  id: any;
  image: any;
  timeToEnd?: string;
  isTokenPreset = localStorage.getItem('token');
  API_HOST = Hosts.API_HOST;
  tags: any;
  // allTagsBooks: Array<any> = [];
  // isAllBook = false;

  constructor(
    private bookService: BookService,
    private commentService: CommentService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    // Get param from URL /book/:id
    this.id = this.route.snapshot.paramMap.get("id");

    this.bookService.getBookInfo(this.id).subscribe((resp: Response) => {
      this.book = resp.message;
      console.log(this.book);
      this.image = this.API_HOST + this.book.image;
      this.timeToEnd = new Date(this.book.backTime).toLocaleDateString();
      this.tags = this.book.tags.split(' ');
      console.log(this.tags);
      if (this.book.is_digital) {
        this.downloadBook();
      }
    });
  }

  allBookComments() {
    this.commentService.getAllComments(this.id).subscribe((resp: Response) => {
      if (resp.success) {
        this.comments = resp.message
      } else {
        // TODO ERROR
      }
    })
  }

  createComment(comment) {
    if (comment === '') {
      throw new Error('OOOPS')
    } else {
      this.commentService.createComment(comment, this.id).subscribe(value => {
        console.log(value);
      })
    }
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
}
