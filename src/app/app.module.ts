import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { NotFoundError } from './common/not-found-error';
import { RouterModule, Routes } from '@angular/router';
import { GithubFollowersService } from './services/github-followers.service';
import { DataService } from './services/data.service';
import { PartnerListComponent } from './partner-list/partner-list.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DialogPartnerComponent } from './dialog-partner/dialog-partner.component';
import {  MatInputModule, MatExpansionModule, MatTable } from '@angular/material';
import { PartnerService } from './services/partner.service';
import { ItemsListComponent } from './items-list/items-list.component';
import {MatTableModule} from '@angular/material/table';




@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    GithubFollowersComponent,
    PartnerListComponent,
    DialogPartnerComponent,
    ItemsListComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatTableModule
  ],
  providers: [ GithubFollowersService, DataService, PartnerService ],
  bootstrap: [AppComponent],
  exports: [DialogPartnerComponent],
  entryComponents: [DialogPartnerComponent]
})
export class AppModule { }
