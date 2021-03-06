import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TopBooksComponent} from './top-books/top-books.component';
import {BookComponent} from "./book/book.component";
import {TagSearchComponent} from "./tag-search/tag-search.component";
import {WordSearchComponent} from "./word-search/word-search.component";
import {AllBooksComponent} from "./all-books/all-books.component";
import {UploadBookComponent} from "./upload-book/upload-book.component";
import {BookStatisticComponent} from "./book-statistic/book-statistic.component";
import {StatisticComponent} from "./statistic/statistic.component";
import {SubjectsComponent} from "./subjects/subjects.component";
import {MyInfoComponent} from "./my-info/my-info.component";
import {InfoPageComponent} from "./info-page/info-page.component";

const routes: Routes = [
  {path: '', component: TopBooksComponent},
  {path: 'book/:id', component: BookComponent},
  {path: 'search/tag/:tag', component: TagSearchComponent},
  {path: 'search/:word', component: WordSearchComponent},
  {path: 'allbooks', component: AllBooksComponent},
  {path: 'upload', component: UploadBookComponent},
  {path: 'bookstat/:id', component: BookStatisticComponent},
  {path: 'statistic', component: StatisticComponent},
  {path: 'subjects', component: SubjectsComponent},
  {path: 'myinfo', component: MyInfoComponent},
  {path: 'info', component: InfoPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
