import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ImportComponent } from './import/import.component';


const routes: Routes = [
  { path: '', redirectTo: 'partner', pathMatch: 'full'},
  { path: 'followers', component: GithubFollowersComponent },
  { path: 'partner', component : PartnerListComponent},
  { path: 'items', component : ItemsListComponent},
  { path: 'import', component : ImportComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
