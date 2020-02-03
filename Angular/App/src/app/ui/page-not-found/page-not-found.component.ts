import { fadeIn } from './../animations';
import { DataShareService } from './../../common/services/data-share.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  animations: [fadeIn]
})
export class PageNotFoundComponent implements OnInit {

  constructor(private titleService: Title) {
    //this.titleService.setTitle('Not Found | Interview Center');
   }

  ngOnInit() {
  }

}
