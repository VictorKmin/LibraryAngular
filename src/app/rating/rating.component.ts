import {Component, OnInit} from '@angular/core';
import {RatingService} from "../services/rating.service";
import {ActivatedRoute} from "@angular/router";
import {RatingInfo} from "../models/RatingInfo";


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  id: any;
  private avgStar: string;
  private countOfVotes: string;
  private isUserCanVote = false;
  private votedStar: number;


  constructor(private ratingService: RatingService, private activatedRouter: ActivatedRoute,) {
  }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.paramMap.get("id");
    const token = localStorage.getItem('token');

    (token) ? this.getBookRating(this.id, token) : this.getBookRating(this.id);
    this.bookRating();
  }

  getBookRating(bookId, token?) {
    this.ratingService.getBookRating(bookId, token)
  }

  bookRating() {
    this.ratingService.bookRating()
      .subscribe((info: RatingInfo) => {
      this.avgStar = info.avgStar;
      this.countOfVotes = info.countOfVotes;
      this.isUserCanVote = info.isUserCanVote;
      this.votedStar = info.votedStar;
    })
  }

  rateBook(star) {
    this.ratingService.rateBook(this.id, star)
  }

  deleteVote() {
    this.ratingService.deleteVote(this.id)
  }
}
