import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogPartnerComponent } from '../dialog-partner/dialog-partner.component'
import { PartnerService } from '../services/partner.service';

 

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.css']
})
export class PartnerListComponent implements OnInit {
  partners;
  constructor(public dialog: MatDialog, private service: PartnerService) { }

  ngOnInit() {
    this.service.getAll()
       .subscribe(resp =>{this.partners = resp; console.log(this.partners)});
  }


  animal: string;
  name: string;

  openDialog(param): void {
    const dialogRef = this.dialog.open(DialogPartnerComponent, {
      width: '250px',
      data: {name: param}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}


