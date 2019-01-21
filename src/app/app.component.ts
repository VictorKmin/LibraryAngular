import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
  }

  title = 'UkrInSofT library';
  token = localStorage.getItem('token');

  signOut() {
    console.log('OUT');
    localStorage.removeItem('token');
  }

  signIn() {
    console.log('IN');
  }

}
