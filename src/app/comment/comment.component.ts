import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../models/Comment";
import {UserService} from "../services/user.service";
import {CommentService} from "../services/comment.service";
import {Roles} from "../models/Roles";
import {take} from "rxjs/operators";

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
  isAdmin: boolean;

  isDeleteClicked = false;
  isUpdateClicked = false;

  constructor(
    private userService: UserService,
    private commentService: CommentService) {
  }

  ngOnInit() {

    if (this.isLogged) {
      this.userService.userDetail
        .pipe(take(1))
        .subscribe(user => {
        if (user.success) {
          this.userId = user.message.id;
          this.isAdmin = Roles.ADMIN_ROLES.includes(user.message.role);
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
    this.commentService.deleteComment(this.comment.id)
  }

  updateComment(newComment) {
    this.commentService.updateComment(this.comment.id, newComment.comment)
  }
}
