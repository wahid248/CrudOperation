import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private headerTitleSource = new BehaviorSubject<string>('');
  private isPageLoadingSource = new BehaviorSubject<boolean>(true);

  headerTitle = this.headerTitleSource.asObservable();
  isPageLoading = this.isPageLoadingSource.asObservable();


  constructor() { }

  changeHeaderTitle(title: string) {
    this.headerTitleSource.next(title);
  }

  changePageLoadingStatus(isLoading: boolean) {
    this.isPageLoadingSource.next(isLoading);
  }
}
