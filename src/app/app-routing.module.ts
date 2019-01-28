import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TopBooksComponent} from './top-books/top-books.component';
import {BookComponent} from "./book/book.component";
import {TagSearchComponent} from "./tag-search/tag-search.component";
import {WordSearchComponent} from "./word-search/word-search.component";
// @ts-ignore
const routes: Routes = [
  {path: '', component: TopBooksComponent},
  {path: 'book/:id', component: BookComponent},
  {path: 'search/tag/:tag', component: TagSearchComponent},
  {path: 'search/:word', component: WordSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
