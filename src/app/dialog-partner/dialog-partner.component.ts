import { Component, Inject, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Partner } from '../models/partner';
import { PartnerService } from '../services/partner.service';


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-partner.component.html',
  styleUrls: ['./dialog-partner.component.css']
})
export class DialogPartnerComponent {


  constructor(
    public dialogRef: MatDialogRef<DialogPartnerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partner,
    public _service: PartnerService,
    ) {}
  
  onUpdateClick(param){
     let active = param.active;
     let name = param.name;
     let id = this.data.id;
     let _id = this.data._id;
     let orders = this.data.orders;
     //console.log(active,name);
     //console.log();
     if(this.data.active == active && this.data.name == name){
     this.dialogRef.close();
     } else {
     this.dialogRef.close(new Partner(name,active, id, orders, _id));
    }
   }  

  onNoClick(): void {
    console.log('close')
    this.dialogRef.close();
  }
}



