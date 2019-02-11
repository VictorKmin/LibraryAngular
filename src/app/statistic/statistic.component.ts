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
  topBooks;
  topUsers;

  constructor(private statisticService: StatisticService) {
  }

  ngOnInit() {
  }

  showTopReadedBooks() {
    this.isTopReadedClicked = !this.isTopReadedClicked;
    // 10 is hardcoded limit of books from database
    this.statisticService.getTopReadedBooks(10).subscribe((resp: Response) => {
      if (resp.success) {
        this.topBooks = resp.message
      }
    })
  }

  showTopUsers() {
    this.isTopUsersClicked = !this.isTopUsersClicked;
    // 10 is hardcoded limit of users from database
    this.statisticService.getTopUsers(10).subscribe((resp: Response) => {
      if (resp.success) {
        this.topUsers = resp.message
      }
    })
  }

  hideTopReadedBooks() {
    this.isTopReadedClicked = false
  }

  hideTopUsers() {
    this.isTopUsersClicked = false
  }
}
