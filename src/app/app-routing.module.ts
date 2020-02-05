import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ImportComponent } from './import/import.component';
import { WelcomeComponent } from './welcome/welcome.component'
import { ReportComponent } from './report/report.component'

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: 'welcome', component: WelcomeComponent },
  { path: 'partner', component : PartnerListComponent},
  { path: 'items', component : ItemsListComponent},
  { path: 'import', component : ImportComponent},
  { path: 'report', component : ReportComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
