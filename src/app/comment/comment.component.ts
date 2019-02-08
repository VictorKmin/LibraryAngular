import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../models/Comment";
import {UserService} from "../services/user.service";
import {CommentService} from "../services/comment.service";

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
  isLogged = !!localStorage.getItem('token');
  userId;
  userRole;

  isDeleteClicked = false;
  isUpdateClicked = false;

  constructor(
    private userService: UserService,
    private commentService: CommentService) {
  }

  ngOnInit() {

    if (this.isLogged) {
      this.userService.userDetail.subscribe(user => {
        if (user.success) {
          this.userId = user.message.id;
          this.userRole = user.message.role;
        }
      });
    }

    this.commentText = this.comment.comment;
    this.date = new Date(this.comment.created_at).toDateString();
    this.user = this.comment.User.name
  }

  showDelete() {
    this.isDeleteClicked = !this.isDeleteClicked;
  }

  showUpdate() {
    this.isUpdateClicked = !this.isUpdateClicked
  }

  deleteComment() {
    this.commentService.deleteComment(this.comment.id).subscribe(value => {
      console.log(value);
    });
  }

  updateComment(newComment) {
    this.commentService.updateComment(this.comment.id, newComment.comment).subscribe(value => {
      console.log(value);
    });
    console.log(newComment);
  }
}
