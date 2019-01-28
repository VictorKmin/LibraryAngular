import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BookComponent} from "./book/book.component";
import {TagSearchComponent} from "./tag-search/tag-search.component";
// @ts-ignore
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'book/:id', component: BookComponent},
  {path: 'search/tag/:tag', component: TagSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
