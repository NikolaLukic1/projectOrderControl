import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PartnerService extends DataService {

  constructor(http: HttpClient) {
    super('http://localhost:5000/api/partnerorder/', http);
  }
}
