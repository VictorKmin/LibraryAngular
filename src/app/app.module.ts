import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {HomeService} from './services/home.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopBooksComponent } from './top-books/top-books.component';
import { BookComponent } from './book/book.component';

// const config: SocketIoConfig = {url: 'http://192.168.0.131:5000', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopBooksComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // SocketIoModule.forRoot(config)
  ],
  providers: [
    HomeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
