import { fadeIn } from './../animations';
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
    this.titleService.setTitle('Not Found | Crud Operations');
   }

  ngOnInit() {
  }

}
