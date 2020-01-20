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
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { NotFoundError } from './common/not-found-error';
import { RouterModule, Routes } from '@angular/router';
import { GithubFollowersService } from './services/github-followers.service';
import { DataService } from './services/data.service';

const appRoutes: Routes = [
  { path: 'followers', component: GithubFollowersComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    GithubFollowersComponent
    
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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ GithubFollowersService, DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
