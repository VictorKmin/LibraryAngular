import {Component, OnInit} from '@angular/core';
import {StatisticService} from "../services/statistic.service";
import {Response} from "../models/Response";
import {BehaviorSubject} from "rxjs";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  whatClicked = localStorage.getItem('statisticClicked');
  whatStatClicked = new BehaviorSubject<string>(this.whatClicked);

  topBooks;
  topUsers;
  readStatistic;
  commentStatistic;
  ratingStatistic;
  readingLimit: number = 10;
  commentLimit: number = 10;
  ratingLimit: number = 10;
  isPaginationPresent: boolean = false;

  paginationLimit = 10;

  constructor(private statisticService: StatisticService) {
  }

  ngOnInit() {

    if (this.whatClicked === 'topBooks') {
      this.showTopReadedBooks()
    }
    if (this.whatClicked === 'topUsers') {
      this.showTopUsers()
    }
    if (this.whatClicked === 'reading') {
      this.showAllReadingInfo()
    }
    if (this.whatClicked === 'comment') {
      this.showAllCommentInfo()
    }
    if (this.whatClicked === 'rating') {
      this.showAllRatingInfo()
    }
  }

  showTopReadedBooks() {
    localStorage.setItem('statisticClicked', 'topBooks');
    this.whatStatClicked.next('topBooks');
    // 20 is hardcoded limit of books from database
    this.statisticService.getTopReadedBooks(20)
      .pipe(take(1))
      .subscribe((resp: Response) => {
      if (resp.success) {
        this.topBooks = resp.message
      }
    })
  }

  showTopUsers() {
    localStorage.setItem('statisticClicked', 'topUsers');
    this.whatStatClicked.next('topUsers');
    // 20 is hardcoded limit of users from database
    this.statisticService.getTopUsers(20)
      .pipe(take(1))
      .subscribe((resp: Response) => {
      if (resp.success) {
        this.topUsers = resp.message
      }
    })
  }

  showAllReadingInfo() {
    localStorage.setItem('statisticClicked', 'reading');
    this.whatStatClicked.next('reading');
    this.statisticService.getMoreReadingInfo(this.readingLimit);
    this.statisticService.getReadingInfo()
      .pipe(take(1))
      .subscribe((resp: Array<object>) => {
      this.isPaginationPresent = resp.length === this.readingLimit;
      this.readStatistic = resp
    })
  }

  showAllCommentInfo() {
    localStorage.setItem('statisticClicked', 'comment');
    this.whatStatClicked.next('comment');
    this.statisticService.getMoreCommentInfo(this.commentLimit);
    this.statisticService.getCommentInfo()
      .pipe(take(1))
      .subscribe((resp: Array<object>) => {
      this.isPaginationPresent = resp.length === this.commentLimit;
      this.commentStatistic = resp
    })
  }

  showAllRatingInfo() {
    localStorage.setItem('statisticClicked', 'rating');
    this.whatStatClicked.next('rating');
    console.log(this.readingLimit);

    this.statisticService.getMoreRatingInfo(this.ratingLimit);
    this.statisticService.getRatingInfo()
      .pipe(take(1))
      .subscribe((resp: Array<object>) => {
      this.isPaginationPresent = resp.length === this.ratingLimit;
      this.ratingStatistic = resp;
    })
  }

  moreInfo(param: string) {

    switch (param) {
      case 'reading':
        this.readingLimit = this.readingLimit + this.paginationLimit;
        console.log(this.readingLimit);
        this.showAllReadingInfo();
        break;
      case 'comment':
        this.commentLimit = this.commentLimit + this.paginationLimit;
        this.showAllCommentInfo();
        break;
      case 'rating':
        this.ratingLimit = this.ratingLimit + this.paginationLimit;
        console.log(this.ratingLimit);
        this.showAllRatingInfo();
        break;
    }
  }
}
