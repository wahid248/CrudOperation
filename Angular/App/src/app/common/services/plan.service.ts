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

  updatePlan(form: FormData): Observable<any> {
    return this.client.put<any>(`${this.baseUrl}/plans/update`, form)
      .pipe(catchError(this.handleError));
  }

  getPlans(rowsPerPage: number, pageNumber: number): Observable<Plan[]> {
    return this.client.get<Plan[]>(`${this.baseUrl}/plans/get?rowsPerPage=${rowsPerPage}&pageNumber=${pageNumber}`)
      .pipe(catchError(this.handleError));
  }

  deletePlan(id: number): Observable<any[]> {
    return this.client.delete<any>(`${this.baseUrl}/plans/delete/${id}`)
      .pipe(catchError(this.handleError));
  }
}
