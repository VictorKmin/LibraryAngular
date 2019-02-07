import {Component, OnInit} from '@angular/core';
import {Response} from "./models/Response";
import {HomeService} from "./services/home.service";
import {Router} from '@angular/router';
import {BehaviorSubject} from "rxjs";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private isLoginClicked: boolean = false;
  private isErrorPresent: any;
  title = 'UkrInSofT library';
  isToken = !!localStorage.getItem('token');
  isAuth = new BehaviorSubject<boolean>(this.isToken);
  userInfo = {};

  constructor(
    private homeService: HomeService,
    private userService: UserService,
    private router: Router
  ) {
  }

  signOut() {
    this.homeService.logout().subscribe((value: Response) => {
      if (value.success) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        this.isAuth.next(false);
        this.userService.userDetail.next({});
        this.userInfo = {};
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

        const {accessToken, refreshToken} = value.message;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        this.isLoginClicked = false;
        this.isErrorPresent = false;
        this.isAuth.next(true);
      } else {
        this.isErrorPresent = value.message;
      }
    });
  }

  ngOnInit(): void {
    this.isAuth.subscribe(isLogged => {
      console.log(this.userInfo);
      if (isLogged) {
        this.userService.getUserInfo().subscribe(user => {
          this.userService.userDetail.next(user)
        });
      }
    });

    this.userService.userDetail.subscribe((res) => {
      if (res.success) {
        console.log(res);
        this.userInfo = res;
      }
    })
  }
}
