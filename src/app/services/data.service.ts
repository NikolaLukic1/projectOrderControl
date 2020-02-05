import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {throwError} from 'rxjs';
import {catchError,map} from 'rxjs/operators';
import { Partner } from '../models/partner'
@Injectable()
export class DataService {
  constructor(private url: string, private http: HttpClient) { }

  public getPartners() : Observable<Partner[]> {
    return this.http.get(this.url).pipe(
      map((data: any[]) => data.map((item: any) => this._createPartnerFromObject(item))),
      catchError(this.handleError)
    );
  }

  public insertPartners(partner: Partner) : Observable<Partner> {
    return this.http.post<Partner>(this.url, partner ).pipe(
        catchError(this.handleError)
    );
  }


  public updatePartners(partner: Partner) : Observable<Partner> {
    return this.http.put<Partner>(this.url + '/updatedata', partner ).pipe(
        catchError(this.handleError)
    );
  }


  _createPartnerFromObject(item:any){
    return new Partner(item.name, item.active, item.id, item.orders, item._id);
  }

  private handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw(new BadInput(error.json()));
  
    if (error.status === 404)
      return Observable.throw(new NotFoundError());
    
    return Observable.throw(new AppError(error));
  }
}
