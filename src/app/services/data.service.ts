import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {throwError} from 'rxjs';
import {catchError,map} from 'rxjs/operators';

@Injectable()
export class DataService {
  constructor(private url: string, private http: HttpClient) { }

  getAll() {

    return this.http.get(this.url, { observe: 'response' }).pipe(
      map(res => res.body || []),
      catchError(this.handleError)
   );
      
  }

  get(id) { 
    return this.http.get(this.url + '/' + id, {observe : 'response'}).pipe(
      map(res => res.body || []),
      catchError(this.handleError)
   );
  }

  create(resource) {
      return this.http.post(this.url, JSON.stringify(resource), {observe : 'response'}).pipe(
        map(res => res.body || []),
        catchError(this.handleError)
     );
  }


  // delete(id) {
  //   return this.http.delete(this.url + '/' + id)
  //     .map(response => response.json())
  //     .toPromise()
  //     .catch(this.handleError);
  // }

  private handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw(new BadInput(error.json()));
  
    if (error.status === 404)
      return Observable.throw(new NotFoundError());
    
    return Observable.throw(new AppError(error));
  }
}