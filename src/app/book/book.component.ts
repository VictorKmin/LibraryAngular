import {Component, OnInit} from '@angular/core';
import {BookService} from "../services/book.service";
import {CommentService} from "../services/comment.service";
import {ActivatedRoute} from "@angular/router";
import {Response} from "../Response";
import {BookInfo} from "../BookInfo";


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: BookInfo;
  comments: Array<any>;
  author: string;
  countOfComments: number;
  id: any;
  publisher: string;
  subject?: any;
  summary?: any;
  tags?: any;
  title: string;
  type_of_book: string;
  type_of_content?: any;
  type_of_file?: any;
  user_id: number;

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

      this.author = this.book.author;
      this.countOfComments = this.book.countOfComments;
      this.publisher = this.book.publisher;
      this.subject = this.book.subject;
      this.summary = this.book.summary;
      this.tags = this.book.tags;
      this.title = this.book.title;
      this.type_of_book = this.book.type_of_book;
      this.type_of_content = this.book.type_of_content;
      this.type_of_file = this.book.type_of_file;
      this.user_id = this.book.user_id;
    })
  }

  allBookComments() {
    this.commentService.getAllComments(this.id).subscribe((resp: Response) => {
      if (resp.success) {
        this.comments = resp.message
      }else {
        // TODO ERROR
      }
    })
  }

  createComment(comment) {
    this.commentService.createComment(comment, this.id).subscribe(value => {
      console.log(value);
    })
  }
}
