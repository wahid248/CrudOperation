import { DataShareService } from './common/services/data-share.service';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, Event, NavigationStart, NavigationEnd } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/insert', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router, private dataShareService: DataShareService) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.dataShareService.changePageLoadingStatus(true);
      }
      if (routerEvent instanceof NavigationEnd) {
        this.dataShareService.changePageLoadingStatus(false);
      }
    });
  }
}
