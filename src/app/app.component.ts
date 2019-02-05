import {Component} from '@angular/core';
import {Response} from "./models/Response";
import {HomeService} from "./services/home.service";
import {Router} from '@angular/router';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private isLoginClicked: boolean = false;
  private isErrorPresent: any;
  title = 'UkrInSofT library';
  istoken = !!localStorage.getItem('token');
  isAuth = new BehaviorSubject<boolean>(this.istoken);

  constructor(
    private homeService: HomeService,
    private router: Router
  ) {
  }

  signOut() {
    this.homeService.logout().subscribe((value: Response) => {
      if (value.success) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userID');
        this.isAuth.next(false);
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
      if (value.success) {
        const {accessToken, refreshToken, id} = value.message;
        this.isLoginClicked = false;
        this.isErrorPresent = false;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        localStorage.setItem('userID', id);
        this.isAuth.next(true);
      } else {
        this.isErrorPresent = value.message;
      }
    });
  }
}
