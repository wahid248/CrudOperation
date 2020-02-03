import { Plan } from './../models/plan';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanService extends BaseService {

  constructor(private client: HttpClient) {
    super();
  }

  savePlan(form: FormData): Observable<any> {
    return this.client.post<any>(`${this.baseUrl}/plans/save`, form)
      .pipe(catchError(this.handleError));
  }
}
