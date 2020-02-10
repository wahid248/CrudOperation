import { UpdateDataComponent } from './../update-data/update-data.component';
import { FileService } from './../common/services/file.service';
import { Plan } from './../common/models/plan';
import { fadeIn } from './../ui/animations';
import { Component, OnInit } from '@angular/core';
import { PlanService } from './../common/services/plan.service';
import { DataShareService } from './../common/services/data-share.service';
import { Title } from '@angular/platform-browser';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss'],
  animations: [fadeIn]
})
export class ViewDataComponent implements OnInit {

  isSubmitting: boolean;
  isLoading: boolean;
  durationInSeconds: number;
  plans: Plan[];
  rowsPerPage: number;
  pageNumber: number;

  constructor(
    private titleService: Title,
    private service: PlanService,
    private fileService: FileService,
    private snackBar: MatSnackBar,
    private dataShareService: DataShareService,
    private dialog: MatDialog
  ) {
    this.isSubmitting = false;
    this.durationInSeconds = 5000;
    this.plans = null;
    this.isLoading = false;
    this.rowsPerPage = 10;
    this.pageNumber = 1;
  }

  ngOnInit() {
    this.titleService.setTitle('View Data | Crud Operations');
    this.dataShareService.changeHeaderTitle('View Data');
    this.loadTable(this.rowsPerPage, this.pageNumber);
  }

  downloadFile(fileName: string) {
    if (fileName) {
      this.isLoading = true;
      this.fileService.getFile(fileName).subscribe(
        result => {
          this.isLoading = false;
        },
        error => {
          this.snackBar.open(error, '', {
            duration: this.durationInSeconds,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-error']
          });
          console.error(error);
          this.isLoading = false;
        }
      );
    }
  }

  loadTable(rowsPerPage: number, pageNumber: number){
    this.isLoading = true;
    this.service.getPlans(rowsPerPage, pageNumber).subscribe(
      result => {
        this.plans = result;
        this.isLoading = false;
      },
      error => {
        this.snackBar.open(error, '', {
          duration: this.durationInSeconds,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-error']
        });
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  onDelete(event){
    var planId = event.toElement.offsetParent.id;
    this.isLoading = true;
    this.service.deletePlan(planId).subscribe(
      result => {
        this.loadTable(this.rowsPerPage, this.pageNumber);
        this.isLoading = false;
      },
      error => {
        this.snackBar.open(error, '', {
          duration: this.durationInSeconds,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-error']
        });
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  openUpdatetDialog(event) {
    var planId = event.toElement.offsetParent.id;
    var plan = this.plans.find(x => x.Id == planId);
    const dialogRef = this.dialog.open(UpdateDataComponent, {
      panelClass: 'dialog-box',
      data: plan
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadTable(this.rowsPerPage, this.pageNumber);
    });
  }
}
