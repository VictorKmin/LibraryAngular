import {Component, OnInit} from '@angular/core';
import {StatisticService} from "../services/statistic.service";
import {Response} from "../models/Response";
import {BehaviorSubject} from "rxjs";

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
    // 10 is hardcoded limit of books from database
    this.statisticService.getTopReadedBooks(10).subscribe((resp: Response) => {
      if (resp.success) {
        this.topBooks = resp.message
      }
    })
  }

  showTopUsers() {
    localStorage.setItem('statisticClicked', 'topUsers');
    this.whatStatClicked.next('topUsers');
    // 10 is hardcoded limit of users from database
    this.statisticService.getTopUsers(10).subscribe((resp: Response) => {
      if (resp.success) {
        this.topUsers = resp.message
      }
    })
  }

  showAllReadingInfo() {
    localStorage.setItem('statisticClicked', 'reading');
    this.whatStatClicked.next('reading');
    this.statisticService.getAllReadingInfo().subscribe((resp: Response) => {
      console.log(resp.message);
      this.readStatistic = resp.message
    })
  }

  showAllCommentInfo() {
    localStorage.setItem('statisticClicked', 'comment');
    this.whatStatClicked.next('comment');
    this.statisticService.getAllCommentInfo().subscribe((resp: Response) => {
      console.log(resp.message);
      this.commentStatistic = resp.message;
    })
  }

  showAllRatingInfo() {
    localStorage.setItem('statisticClicked', 'rating');
    this.whatStatClicked.next('rating');
    this.statisticService.getAllRatingInfo().subscribe((resp: Response) => {
      console.log(resp.message);
      this.ratingStatistic = resp.message;
    })
  }
}
