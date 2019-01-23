import {Component} from '@angular/core';
import {HomeService} from "./services/home.service";
import {Response} from "./Response";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private isLoginClicked: boolean = false;
  private isErrorPresent: any;

  constructor(private homeService: HomeService) {
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
