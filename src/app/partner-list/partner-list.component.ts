import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogPartnerComponent } from '../dialog-partner/dialog-partner.component'
import { PartnerService } from '../services/partner.service';
import { Partner } from '../models/partner';
import {Pipe } from '@angular/core';  

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.css']
})
export class PartnerListComponent implements OnInit {
  @Input()  disableRipple: boolean;
  partners : Partner[] = [];
  showAllItems : boolean;
  constructor(public dialog: MatDialog, private service: PartnerService) { }

  ngOnInit() {
    this.service.getPartners()
       .subscribe(resp =>{this.partners = Object.assign([], resp); console.log(this.partners)});
  }

  openDialog(param): void {
    const dialogRef = this.dialog.open(DialogPartnerComponent, {
      width: '250px',
      data: new Partner(param.name,param.active, param.id, param.orders, param._id)
    });
    dialogRef.afterClosed().subscribe(async result => {
     //return false; 
      //console.log(result);
      //this.partners = []; 
      await this.service.updatePartners(result)
      //.subscribe(res =>{this.partners.push(res); console.log(res[0].active)});
      .subscribe(res => {this.ngOnInit(); console.log(res[0].active)})
      
      
      // await this.service.getPartners()
      // .subscribe(resp =>{this.partners = resp; console.log('get' , this.partners)});
      
  
    });
  }

  // get partners12() {
  //   console.log("pokrenuto")
  //   return 1;
  // }

  showAll(value){
    this.showAllItems = value;
  }
}


