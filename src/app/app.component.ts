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
  token = localStorage.getItem('token');
  subject = new BehaviorSubject<string>(this.token);

  constructor(
    private homeService: HomeService,
    private router: Router
  ) {
  }

  signOut() {
    this.subject.asObservable().subscribe(data => {
      console.log(data);
      this.homeService.logout().subscribe((value: Response) => {
        if (value.message) {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('userID')
        } else {
          this.isErrorPresent = value.message;
        }
      });
    });
  }

  signIn() {
    this.isLoginClicked = true;
  }

  search(word: string) {
    this.router.navigateByUrl(`/search/${word}`)
  }

  loginUser(email, password) {
    this.subject.asObservable().subscribe(data => {
      console.log(data);
      this.homeService.login(email, password).subscribe((value: Response) => {
        const {accessToken, refreshToken, id} = value.message;
        console.log(value.message);
        if (value.success) {
          this.isLoginClicked = false;
          this.isErrorPresent = false;
          localStorage.setItem('token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);
          localStorage.setItem('userID', id);
        } else {
          this.isErrorPresent = value.message;
        }
      })
    });
  }
}
