import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {HomeService} from './services/home.service';
import {BookService} from "./services/book.service";
import {CommentService} from "./services/comment.service";
import {SearchService} from "./services/search.service";
import { AppComponent } from './app.component';
import { TopBooksComponent } from './top-books/top-books.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';
import { CommentComponent } from './comment/comment.component';
import { TagSearchComponent } from './tag-search/tag-search.component';
import { WordSearchComponent } from './word-search/word-search.component';
import { AllBooksComponent } from './all-books/all-books.component';
import { UploadBookComponent } from './upload-book/upload-book.component';

// const config: SocketIoConfig = {url: 'http://192.168.0.131:5000', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    TopBooksComponent,
    BooksComponent,
    BookComponent,
    CommentComponent,
    TagSearchComponent,
    WordSearchComponent,
    AllBooksComponent,
    UploadBookComponent
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
    BookService,
    CommentService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
