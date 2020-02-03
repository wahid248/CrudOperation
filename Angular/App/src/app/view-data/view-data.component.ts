import { FileService } from './../common/services/file.service';
import { Plan } from './../common/models/plan';
import { fadeIn } from './../ui/animations';
import { Component, OnInit } from '@angular/core';
import { PlanService } from './../common/services/plan.service';
import { DataShareService } from './../common/services/data-share.service';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../environments/environment';

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
  protected baseUrl: string;

  constructor(
    private titleService: Title,
    private service: PlanService,
    private fileService: FileService,
    private snackBar: MatSnackBar,
    private dataShareService: DataShareService
  ) {
    this.isSubmitting = false;
    this.durationInSeconds = 5000;
    this.plans = null;
    this.baseUrl = environment.baseUrl;
  }

  ngOnInit() {
    this.titleService.setTitle('View Data | Crud Operations');
    this.dataShareService.changeHeaderTitle('View Data');

    this.service.getPlans(10, 1).subscribe(
      result => {
        this.plans = result;
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

  downloadFile(fileName: string) {
    if (fileName) {
      this.fileService.getFile(fileName).subscribe(
        result => {
        },
        error => {
          this.snackBar.open(error, '', {
            duration: this.durationInSeconds,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-error']
          });
          console.error(error);
        }
      );
    }
  }
}
