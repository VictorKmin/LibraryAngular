import {Component} from '@angular/core';
import {Response} from "./models/Response";
import {HomeService} from "./services/home.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private isLoginClicked: boolean = false;
  private isErrorPresent: any;

  constructor(
    private homeService: HomeService,
    private router: Router
  ) {
  }

  title = 'UkrInSofT library';
  token = localStorage.getItem('token');

  signOut() {
    this.homeService.logout().subscribe((value: Response) => {
      if (value.message) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
      } else {
        this.isErrorPresent = value.message;
      }
    });
  }

  signIn() {
    this.isLoginClicked = true;
  }

  search(word: string) {
    this.router.navigateByUrl(`/search/${word}`)
  }

  loginUser(email, password) {
    this.homeService.login(email, password).subscribe((value: Response) => {
      const {accessToken, refreshToken} = value.message;
      console.log(value.message);
      if (value.success) {
        this.isLoginClicked = false;
        this.isErrorPresent = false;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
      } else {
        this.isErrorPresent = value.message;
      }
    })
  }
}
