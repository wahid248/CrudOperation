import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FileService extends BaseService {

  constructor(private client: HttpClient) {
    super();
  }
  

  getFile(fileName: string): Observable<any> {
    return this.client.get<any>(`${this.baseUrl}/files/get/${fileName}`)
      .pipe(catchError(this.handleError));
  }
}
