import {Component, OnInit} from '@angular/core';
import {HomeService} from "../services/home.service";

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css']
})
export class InfoPageComponent implements OnInit {

  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
    this.homeService.mainClicked.next('0')
  }

}
