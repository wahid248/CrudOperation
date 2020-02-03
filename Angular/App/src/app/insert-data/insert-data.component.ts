import { PlanService } from './../common/services/plan.service';
import { Plan } from './../common/models/plan';
import { DataShareService } from './../common/services/data-share.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fadeIn } from './../ui/animations';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-insert-data',
  templateUrl: './insert-data.component.html',
  styleUrls: ['./insert-data.component.scss'],
  animations: [fadeIn]
})
export class InsertDataComponent implements OnInit {

  form: FormGroup;
  isSubmitting: boolean;
  durationInSeconds: number;

  constructor(
    private builder: FormBuilder,
    private titleService: Title,
    private service: PlanService,
    private snackBar: MatSnackBar,
    private dataShareService: DataShareService) {

    this.isSubmitting = false;
    this.durationInSeconds = 5000;
  }

  ngOnInit() {
    this.titleService.setTitle('Insert Data | Crud Operations');
    this.dataShareService.changeHeaderTitle('Insert Data');
    this.form = this.builder.group({
      trade: ['Asphalt Concrete Paving', Validators.required],
      level: ['SATW', Validators.required],
      syllabusName: ['', Validators.required],
      devOfficer: ['', Validators.required],
      manager: ['', Validators.required],
      syllabusFile: [''],
      testPlanFile: [''],
      activeDate: ['', Validators.required],
      language: ['']
    });
  }

  onLanguageChange(event){
    if(event.checked){
      if(this.form.get('language').value == ''){
        this.form.get('language').patchValue(`${event.source.value}`);
      }
      else{
        this.form.get('language').patchValue(`${this.form.get('language').value}, ${event.source.value}`);
      }
    }
    else{
      this.form.get('language').patchValue(this.form.get('language').value.replace(`, ${event.source.value}`, '').replace(event.source.value, ''));
    }
  }

  onSubmit(): void {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      let formData = new FormData();
      
      formData.append('Trade', this.form.get('trade').value);
      formData.append('Level', this.form.get('level').value);
      formData.append('Language', this.form.get('language').value);
      formData.append('SyllabusName', this.form.get('syllabusName').value);
      formData.append('DevOfficer', this.form.get('devOfficer').value);
      formData.append('Manager', this.form.get('manager').value);
      formData.append('ActiveDate', this.form.get('activeDate').value);

      this.service.savePlan(formData).subscribe(
        result => {
          // result is null because of cors
          this.snackBar.open("Data saved successfully", '', {
            duration: this.durationInSeconds,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-success']
          });
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
}
