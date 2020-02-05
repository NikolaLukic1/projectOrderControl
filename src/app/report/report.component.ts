import { Component, ViewChild, OnInit } from '@angular/core';
import { Partner } from '../models/partner';
import { PartnerService } from '../services/partner.service';
import  jsFunctions  from '../js-scripts/js-functions2';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  @ViewChild(FormGroupDirective, { read : '', static: true})
  formGroupDirective: FormGroupDirective;

  displayedColumns: string[] = ['code', 'product', 'total'];
  partners : Partner[] = [];
  products;
  filteredData;
  finalData = [];
  filterParameters : any = {
    partner : null,
    product : null
  };

  aForm: FormGroup;

  constructor(private service: PartnerService, fb: FormBuilder) {
    this.aForm = fb.group({
      selectForm: [null],
      selectForm1: [null]
    })


    this.aForm.get('selectForm').valueChanges.subscribe(value => {
      if(value) this.filterParameters.partner = { id:  value.id };
    })
    this.aForm.get('selectForm1').valueChanges.subscribe(value => {
      if(value) this.filterParameters.product = { code : value };
    })
   }

  ngOnInit() {
    this.service.getPartners()
    .subscribe(resp =>{
      this.partners = Object.assign([], resp);
      this.products = jsFunctions.productOptions(this.partners);
    });


  }

  filter(){
    this.filteredData = jsFunctions.filterObj(this.partners, this.filterParameters)

    this.finalData = (jsFunctions.prepareReportSum(this.filteredData));
  }

  clearFilter(){
  this.finalData = [];
  this.filterParameters = {
    partner : null,
    product : null
  };

  this.aForm.reset();
  }

 

}
