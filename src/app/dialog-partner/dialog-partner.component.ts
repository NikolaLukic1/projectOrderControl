import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-partner.component.html',
  styleUrls: ['./dialog-partner.component.css']
})
export class DialogPartnerComponent {

 
  constructor(
    public dialogRef: MatDialogRef<DialogPartnerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}



