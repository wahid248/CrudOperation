import { Plan } from './../common/models/plan';
import { fadeIn } from './../ui/animations';
import { Component, OnInit } from '@angular/core';
import { PlanService } from './../common/services/plan.service';
import { DataShareService } from './../common/services/data-share.service';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss'],
  animations: [fadeIn]
})
export class ViewDataComponent implements OnInit {

  isSubmitting: boolean;
  durationInSeconds: number;
  plans: Plan[];

  constructor(
    private titleService: Title,
    private service: PlanService,
    private snackBar: MatSnackBar,
    private dataShareService: DataShareService
  ) {
    this.isSubmitting = false;
    this.durationInSeconds = 5000;
    this.plans = null;
   }

  ngOnInit() {
    this.titleService.setTitle('View Data | Crud Operations');
    this.dataShareService.changeHeaderTitle('View Data');

    this.service.getPlans(10, 1).subscribe(
      result => {
        this.plans = result;
        console.log(this.plans);
        this.isSubmitting = false;
      },
      error => {
        this.snackBar.open(error, '', {
          duration: this.durationInSeconds,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-error']
        });
        console.error(error);
        this.isSubmitting = false;
      }
    );
  }
}
