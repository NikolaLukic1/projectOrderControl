import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogPartnerComponent } from '../dialog-partner/dialog-partner.component'
import { PartnerService } from '../services/partner.service';
import { Partner } from '../models/partner';
import { DialogPartnerInsertComponent } from '../dialog-partner-insert/dialog-partner-insert.component'
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.css']
})
export class PartnerListComponent implements OnInit {
  @Input()  disableRipple: boolean;
  partners : Partner[] = [];
  showAllItems : boolean;
  constructor(public dialog: MatDialog, private service: PartnerService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.service.getPartners()
       .subscribe(resp =>{this.partners = Object.assign([], resp); console.log(this.partners)});
  }

  openDialog(param): void {

    console.log('update');
    const dialogRef = this.dialog.open(DialogPartnerComponent, {
      width: '250px',
      data: new Partner(param.name,param.active, param.id, param.orders, param._id)
    });
    dialogRef.afterClosed().subscribe(async result => {
      if(result !== undefined ){
      await this.service.updatePartners(result)
      .subscribe(res => { this.openSnackBar('Uspešno izmenjen', 'Zatvori'); this.ngOnInit();})
      }
      else this.openSnackBar('Nema izmena', 'Zatvori')
    });
  } 

  
  openDialogInsert(): void 
   {
    console.log('insert')
    let lastId = this.partners[this.partners.length - 1].id;
    const dialogRef = this.dialog.open(DialogPartnerInsertComponent, {
      width: '250px',
      data: lastId
    });
    dialogRef.afterClosed().subscribe(async result => {
      if(result !== undefined){
        await this.service.insertPartners(result)
        .subscribe(res => { this.ngOnInit();
          console.log(res);  
          this.openSnackBar(`Uspešno dodat partner ${res[0].name}`, 'Zatvori');}
          )
        }
  
    });
   }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
 
  }




