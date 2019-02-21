import {Component, OnInit} from '@angular/core';
import {Response} from "./models/Response";
import {HomeService} from "./services/home.service";
import {Router} from '@angular/router';
import {BehaviorSubject} from "rxjs";
import {UserService} from "./services/user.service";
import {BookService} from "./services/book.service";
import {Roles} from "./models/Roles";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoginClicked: boolean = false;
  isErrorPresent: any;
  isToken = !!localStorage.getItem('token');
  isAuth = new BehaviorSubject<boolean>(this.isToken);
  clickedButtonNumber: any = localStorage.getItem('mainClicked');
  mainClicked = new BehaviorSubject<string>(this.clickedButtonNumber);
  whatClicked = localStorage.getItem('topClicked');
  whatTopClicked = new BehaviorSubject<string>(this.whatClicked);

  userInfo = {};
  isBlocked = new BehaviorSubject<boolean>(false);
  isAdmin = new BehaviorSubject<boolean>(false);

  constructor(
    private homeService: HomeService,
    private userService: UserService,
    private bookService: BookService,
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

    if (!this.clickedButtonNumber) {
      this.mainClicked.next('1');
      this.clickedButtonNumber = 1;
    }
    this.isAuth.subscribe(isLogged => {
      console.log(this.userInfo);
      if (isLogged) {
        this.userService.getUserInfo().subscribe(user => {
          this.userService.userDetail.next(user)
        });
      }
    });

    this.userService.userDetail.subscribe((res: Response) => {
      if (res.success) {
        this.isAdmin.next(Roles.ADMIN_ROLES.includes(res.message.role));
        this.isBlocked.next(Roles.BLOCKED_ROLES.includes(res.message.role));
        this.userInfo = res.message;
      }
    })
  }

  mainButtonClick(buttonNumber) {
    localStorage.setItem('mainClicked', buttonNumber);
    this.mainClicked.next(buttonNumber);

  }

  topByComments() {
    localStorage.setItem('topClicked', 'comment');
    this.whatTopClicked.next('comment');
    this.bookService.getTopByComments(1);
  }

  topByReading() {
    localStorage.setItem('topClicked', 'reading');
    this.whatTopClicked.next('reading');
    this.bookService.getTopByReading(1);
  }

  topByRating() {
    localStorage.setItem('topClicked', 'rating');
    this.whatTopClicked.next('rating');
    this.bookService.getTopByRating(1);
  }
}
