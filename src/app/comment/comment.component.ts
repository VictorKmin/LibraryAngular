import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  // book_id: 1
  // comment: "Good"
  // created_at: "2019-01-14T15:23:11.000Z"
  // id: 1
  // user_id: 1
  @Input() comment;

  commentText;
  date;
  user;
  constructor() { }

  ngOnInit() {
    this.commentText = this.comment.comment;
    this.date = this.comment.created_at;
    this.user = this.comment.user_id;
    console.log(this.comment);
  }

}
