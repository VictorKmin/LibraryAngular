import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../Comment";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;

  commentText;
  date;
  user;
  constructor() { }

  ngOnInit() {
    this.commentText = this.comment.comment;
    this.date = new Date(this.comment.created_at).toDateString();
    // this.date = new Date(this.comment.created_at).toUTCString();
    this.user = this.comment.User.name
  }

}
