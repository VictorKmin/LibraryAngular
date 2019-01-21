import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {HomeService} from './home.service';
import {HttpClientModule} from '@angular/common/http';
import { TopBooksComponent } from './top-books/top-books.component';

const config: SocketIoConfig = {url: 'http://192.168.0.131:5000', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    HomeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
