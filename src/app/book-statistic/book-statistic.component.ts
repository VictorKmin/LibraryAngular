import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StatisticService} from "../services/statistic.service";
import {Response} from '../models/Response'
import {take} from "rxjs/operators";

@Component({
  selector: 'app-book-statistic',
  templateUrl: './book-statistic.component.html',
  styleUrls: ['./book-statistic.component.css']
})
export class BookStatisticComponent implements OnInit {
  bookId;
  readStatistic: any;
  commentStatistic: any;
  ratingStatistic: any;
  activityButton = '';

  constructor(
    private route: ActivatedRoute,
    private statisticService: StatisticService) {
  }

  ngOnInit() {
    // Get param from URL /bookstat/:id
    this.bookId = this.route.snapshot.paramMap.get("id");
  }

  showReadingActvt() {
    this.statisticService.getReadingActivityById(this.bookId)
      .pipe(take(1))
      .subscribe((resp: Response) => {
      console.log(resp.message);
      this.readStatistic = resp.message;
    })
  }

  showCommentActvt() {
    this.statisticService.getCommentActivityById(this.bookId)
      .pipe(take(1))
      .subscribe((resp: Response) => {
      console.log(resp.message);
      this.commentStatistic = resp.message;
    })
  }

  showRatingActvt() {
    this.statisticService.getRatingActivityById(this.bookId)
      .pipe(take(1))
      .subscribe((resp: Response) => {
      console.log(resp.message);
      this.ratingStatistic = resp.message;
    })
  }

  activityClicked(value) {
    // reading, comment, rating, null
    this.activityButton = value;

    if (value === 'reading') {
      this.showReadingActvt()
    }
    if (value === 'comment') {
      this.showCommentActvt()
    }
    if (value === 'rating') {
      this.showRatingActvt()
    }
  }
}
