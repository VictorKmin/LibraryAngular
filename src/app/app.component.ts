import {Component, OnInit} from '@angular/core';
import {Response} from "./models/Response";
import {HomeService} from "./services/home.service";
import {Router} from '@angular/router';
import {BehaviorSubject} from "rxjs";
import {UserService} from "./services/user.service";
import {BookService} from "./services/book.service";
import {Roles} from "./models/Roles";
import {FormControl} from "@angular/forms";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoginClicked: boolean = false;
  isErrorPresent: any;
  isToken = !!localStorage.getItem('token');
  clickedButtonNumber;
  whatClicked = localStorage.getItem('topClicked');

  userInfo = {};
  isBlocked = new BehaviorSubject<boolean>(false);
  isAdmin = new BehaviorSubject<boolean>(false);
  isAuth = new BehaviorSubject<boolean>(this.isToken);
  mainClicked;
  whatTopClicked = new BehaviorSubject<string>(this.whatClicked);

  word = new FormControl('');


  constructor(
    private homeService: HomeService,
    private userService: UserService,
    private bookService: BookService,
    private router: Router,
    private cdRef:ChangeDetectorRef
  ) {
  }

  signOut() {
    this.homeService.logout()
      .subscribe((value: Response) => {
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
    this.word.setValue('')
  }

  signIn() {
    this.isLoginClicked = true;
    this.word.setValue('')
  }

  search() {
    this.router.navigateByUrl(`/search/${this.word.value}`);
    this.word.setValue('');
    this.homeService.mainClicked.next('0')
  }

  loginUser(email, password) {
    this.homeService.login(email, password)
      .subscribe((value: Response) => {
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

  mainButtonClick(buttonNumber) {
    console.log(buttonNumber);
    localStorage.setItem('mainClicked', buttonNumber);
    this.homeService.mainClicked.next(buttonNumber);
    this.word.setValue('')
  }

  getTopBy(value: string) {
    localStorage.setItem('topClicked', value);
    this.whatTopClicked.next(value);
    this.bookService.getTop(1, value);
    this.word.setValue('')
  }

  ngOnInit(): void {
    this.word.setValue('');

    this.homeService.mainClicked.subscribe(value => {
      this.clickedButtonNumber = value;
      this.cdRef.detectChanges();
    });

    this.isAuth.subscribe(isLogged => {
      console.log(this.userInfo);
      if (isLogged) {
        this.userService.getUserInfo()
          .subscribe(user => {
            this.userService.userDetail.next(user)
          });
      }
    });

    this.userService.userDetail
      .subscribe((res: Response) => {
        if (res.success) {
          this.isAdmin.next(Roles.ADMIN_ROLES.includes(res.message.role));
          this.isBlocked.next(Roles.BLOCKED_ROLES.includes(res.message.role));
          this.userInfo = res.message;
        }
      })
  }
}
