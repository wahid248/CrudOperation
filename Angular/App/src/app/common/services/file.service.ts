import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService extends BaseService {

  constructor(private client: HttpClient) {
    super();
  }

  getFile(fileName: string): Observable<any> {
    console.log(`${this.baseUrl}/files/get/${fileName}`);
    return this.client.get<any>(`${this.baseUrl}/files/get/${fileName}`)
      .pipe(catchError(this.handleError));
  }
}
