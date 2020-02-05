import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PartnerService } from '../services/partner.service';
import { Partner } from '../models/partner';
import {MatSnackBar} from '@angular/material/snack-bar';


export interface ProductElement {
  code: string;
  product : string;
  total : number;
}

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css'],
})



export class ImportComponent implements OnInit{
  selected = '';
  displayedColumns: string[] = ['code', 'product', 'total'];
  partners : Partner[] = [];

  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;
  dataHelper : ProductElement[] = [];
  dataSource = new MatTableDataSource<ProductElement>();
  tableView = false;

  constructor(private service: PartnerService,private _snackBar: MatSnackBar) {

   }
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(){
    this.service.getPartners()
    .subscribe(resp =>{this.partners = Object.assign([], resp); console.log(this.partners)});
  }

  dodajPorudzbinu(param, newOrderDate){
    let id = param.id;
    let _id = param._id;
    let active = param.active;
    let name = param.name;
    
    let orders = this.addNewOrder(param.orders, newOrderDate, this.dataHelper);
    this.service.updatePartners(new Partner(name,active,id,orders,_id))
      .subscribe(res => {this.ngOnInit(); this.openSnackBar("Uspesno dodata porudzbina!", 'Zatvori');})
    this.tableView = false;
  }

  addNewOrder(oldOrderArray , newOrderDate, newOrder){
    let newId;

    if(oldOrderArray.length > 0){
    newId = oldOrderArray[oldOrderArray.length -1].id_ord + 1;
    }
    else newId = 1;
    
    let finalObject = {
      id_ord : newId,
      date : newOrderDate,
      data : newOrder
    }
    oldOrderArray.push(finalObject);

    return oldOrderArray;
  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      this.dataHelper = JSON.parse(dataString).gc;
      this.dataSource = new MatTableDataSource<ProductElement>(this.dataHelper);
      console.log(this.dataHelper);
      this.tableView = true;
    }
    reader.readAsBinaryString(file);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}



