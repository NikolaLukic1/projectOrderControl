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
import { NotFoundError } from './common/not-found-error';
import { RouterModule, Routes } from '@angular/router';
import { DataService } from './services/data.service';
import { PartnerListComponent } from './partner-list/partner-list.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DialogPartnerComponent } from './dialog-partner/dialog-partner.component';
import {  MatInputModule, MatExpansionModule, MatTable } from '@angular/material';
import { PartnerService } from './services/partner.service';
import { ItemsListComponent } from './items-list/items-list.component';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ImportComponent } from './import/import.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { DialogPartnerInsertComponent } from './dialog-partner-insert/dialog-partner-insert.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { WelcomeComponent } from './welcome/welcome.component';
import { ReportComponent } from './report/report.component';
import {  ReactiveFormsModule } from '@angular/forms';






@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    PartnerListComponent,
    DialogPartnerComponent,
    ItemsListComponent,
    ImportComponent,
    DialogPartnerInsertComponent,
    WelcomeComponent,
    ReportComponent    
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
    MatTableModule,
    FormsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  providers: [  DataService, PartnerService ],
  bootstrap: [AppComponent],
  exports: [DialogPartnerComponent, DialogPartnerInsertComponent],
  entryComponents: [DialogPartnerComponent, DialogPartnerInsertComponent]
})
export class AppModule { }
