import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StatisticService} from "../services/statistic.service";
import {Response} from '../models/Response'

@Component({
  selector: 'app-book-statistic',
  templateUrl: './book-statistic.component.html',
  styleUrls: ['./book-statistic.component.css']
})
export class BookStatisticComponent implements OnInit {
  bookId;
  isReadingClicked = false;
  isCommentClicked = false;
  isRatingClicked = false;
  readStatistic: any;
  commentStatistic: any;
  ratingStatistic: any;

  constructor(
    private route: ActivatedRoute,
    private statisticService: StatisticService) {
  }

  ngOnInit() {
    // Get param from URL /bookstat/:id
    this.bookId = this.route.snapshot.paramMap.get("id");
  }

  showReadingActvt() {
    this.isReadingClicked = true;
    this.statisticService.getReadingActivity(this.bookId).subscribe((resp: Response) => {
      console.log(resp.message);
      this.readStatistic = resp.message;
    })
  }

  showCommentActvt() {
    this.isCommentClicked = true;
    this.statisticService.getCommentActivity(this.bookId).subscribe((resp: Response) => {
      console.log(resp.message);
      this.commentStatistic = resp.message;
    })
  }

  showRatingActvt() {
    this.isRatingClicked = true;

    this.statisticService.getRatingActivity(this.bookId).subscribe((resp: Response) => {
      console.log(resp.message);
      this.ratingStatistic = resp.message;
    })
  }

  hideCommentInfo() {
    this.isCommentClicked = false;
  }

  hideReadingInfo() {
    this.isReadingClicked = false;
  }

  hideRatingInfo() {
    this.isRatingClicked = false;
  }
}
