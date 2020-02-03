import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';



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
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['code', 'product', 'total'];

  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;
  dataHelper : ProductElement[] = [];
  dataSource = new MatTableDataSource<ProductElement>(this.dataHelper);

  constructor() {

   }

  ngOnInit(){
    this.dataSource.paginator = this.paginator;
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
      this.dataSource.data = this.dataHelper;
    }
    reader.readAsBinaryString(file);
  }
}



