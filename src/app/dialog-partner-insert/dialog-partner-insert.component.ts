import { Component, Inject, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Partner } from '../models/partner';
import { PartnerService } from '../services/partner.service';

@Component({
  selector: 'app-dialog-partner-insert',
  templateUrl: './dialog-partner-insert.component.html',
  styleUrls: ['./dialog-partner-insert.component.css']
})
export class DialogPartnerInsertComponent {

  constructor(public dialogRef: MatDialogRef<DialogPartnerInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _service: PartnerService,) { }
  
  
  onInsertClick(param){
     let active = param.active;
     let name = param.name;
     let id = this.createNewId(this.data);
     let orders = [];
     this.dialogRef.close(new Partner(name,active, id, orders));

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

  createNewId(id) {
    var text = id;
    var getPart = text.replace ( /[^\d.]/g, '' ); // returns id like 0023
    var num = parseInt(getPart); // returns int
    var newVal = num+1; // returns nextValue
    var reg = new RegExp(num.toString()); // create dynamic regexp
    var newstring = text.replace ( reg, newVal ); // returns 000id

    return newstring;
  }

}
