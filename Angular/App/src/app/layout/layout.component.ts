import { DataShareService } from './../common/services/data-share.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  headerTitle: string;
  isPageLoading: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private dataShareService: DataShareService) { }

  ngOnInit() {
    this.dataShareService.headerTitle.subscribe(title => this.headerTitle = title);
    this.dataShareService.isPageLoading.subscribe(isLoading => this.isPageLoading = isLoading);
  }

}
