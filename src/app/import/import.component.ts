import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PartnerService } from '../services/partner.service';
import { Partner } from '../models/partner';



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

  displayedColumns: string[] = ['code', 'product', 'total'];
  partners : Partner[] = [];

  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;
  dataHelper : ProductElement[] = [];
  dataSource = new MatTableDataSource<ProductElement>();
  tableView = false;

  constructor(private service: PartnerService) {

   }
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(){
    this.service.getPartners()
    .subscribe(resp =>{this.partners = Object.assign([], resp); console.log(this.partners)});
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
      console.log( new MatTableDataSource<ProductElement>(JSON.parse(dataString).gc));
      this.dataHelper = JSON.parse(dataString).gc;
      this.dataSource = new MatTableDataSource<ProductElement>(this.dataHelper);
      console.log(this.dataSource);
      this.tableView = true;
    }
    reader.readAsBinaryString(file);
  }
}



