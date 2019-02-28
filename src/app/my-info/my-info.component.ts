import { Component, OnInit } from '@angular/core';
import {MyInfoService} from "../services/my-info.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {

  books = [];

  constructor(private myInfoService: MyInfoService) { }

  ngOnInit() {
    this.myInfoService.getMyBookInfo();
    this.myInfoService.myBookInfo()
      .pipe(take(1))
      .subscribe((value: Array<object>) => {
      console.log(value);
      this.books = value
    })
  }

}
