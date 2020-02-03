import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class BaseService {

    protected baseUrl: string
    protected httpHeaders: HttpHeaders
  
    constructor() {
      this.baseUrl = environment.baseUrl;
      this.httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }

    protected handleError(errorResponse: HttpErrorResponse) {
      if (errorResponse.error instanceof ErrorEvent) {
        return throwError(`Error - ${errorResponse.error.message}`);
      } else {
        return throwError(`Server Error - ${errorResponse.status}`);
      }
    }
  }
  