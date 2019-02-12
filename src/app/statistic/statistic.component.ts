import {Component, OnInit} from '@angular/core';
import {StatisticService} from "../services/statistic.service";
import {Response} from "../models/Response";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  isTopReadedClicked = false;
  isTopUsersClicked = false;
  isAllReadStatClicked = false;
  isAllCommentClicked = false;
  isAllRatingClicked = false;
  topBooks;
  topUsers;
  readStatistic;
  commentStatistic;
  ratingStatistic;

  constructor(private statisticService: StatisticService) {
  }

  ngOnInit() {
  }

  showTopReadedBooks() {
    this.isTopReadedClicked = true;
    // 10 is hardcoded limit of books from database
    this.statisticService.getTopReadedBooks(10).subscribe((resp: Response) => {
      if (resp.success) {
        this.topBooks = resp.message
      }
    })
  }

  showTopUsers() {
    this.isTopUsersClicked = true;
    // 10 is hardcoded limit of users from database
    this.statisticService.getTopUsers(10).subscribe((resp: Response) => {
      if (resp.success) {
        this.topUsers = resp.message
      }
    })
  }

  showAllReadingInfo() {
    this.isAllReadStatClicked = true;
    this.statisticService.getAllReadingInfo().subscribe((resp: Response) => {
      console.log(resp.message);
      this.readStatistic = resp.message
    })
  }

  showAllCommentInfo() {
    this.isAllCommentClicked = true;
    this.statisticService.getAllCommentInfo().subscribe((resp: Response) => {
      console.log(resp.message);
      this.commentStatistic = resp.message;
    })
  }

  showAllRatingInfo() {
    this.isAllRatingClicked = true;
    this.statisticService.getAllRatingInfo().subscribe((resp: Response) => {
      console.log(resp.message);
      this.ratingStatistic = resp.message;
    })
  }

  hideTopReadedBooks() {
    this.isTopReadedClicked = false
  }

  hideTopUsers() {
    this.isTopUsersClicked = false
  }

  hideReadingInfo() {
    this.isAllReadStatClicked = false;
  }

  hideCommentInfo() {
    this.isAllCommentClicked = false;
  }

  hideRatingInfo() {
    this.isAllRatingClicked = false;
  }
}
