import { Plan } from './../common/models/plan';
import { PlanService } from './../common/services/plan.service';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss']
})
export class UpdateDataComponent implements OnInit {

  form: FormGroup;
  isSubmitting: boolean;
  durationInSeconds: number;
  isLanguageInvalid: boolean;

  constructor(
    private builder: FormBuilder,
    private service: PlanService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Plan)
  {
    this.isSubmitting = false;
    this.durationInSeconds = 5000;
    this.isLanguageInvalid = false;
  }

  ngOnInit() {
    this.form = this.builder.group({
      trade: [this.data.Trade, Validators.required],
      level: [this.data.Level, Validators.required],
      syllabusName: [this.data.SyllabusName, Validators.required],
      devOfficer: [this.data.DevOfficer, Validators.required],
      manager: [this.data.Manager, Validators.required],
      syllabusFile: [''],
      testPlanFile: [''],
      activeDate: [this.data.ActiveDate.toString().split('T')[0], Validators.required],
      language: [this.data.Language, Validators.required]
    });
  }

  onLanguageChange(event){
    this.form.get('language').markAsTouched();
    if(event.checked){
      this.isLanguageInvalid = false;
      if(this.form.get('language').value == ''){
        this.form.get('language').patchValue(`${event.source.value}`);
      }
      else{
        this.form.get('language').patchValue(`${this.form.get('language').value}, ${event.source.value}`);
      }
    }
    else{
      this.form.get('language').patchValue(this.form.get('language').value.replace(`, ${event.source.value}`, '').replace(event.source.value, ''));
      if(this.form.get('language').value == '') this.isLanguageInvalid = true;
    }
  }

  onSubmit(){
    if (this.form.valid && !this.isSubmitting && !this.isLanguageInvalid) {
      this.isSubmitting = true;
      let formData = new FormData();

      formData.append('Id', this.data.Id.toString());
      formData.append('Trade', this.form.get('trade').value);
      formData.append('Level', this.form.get('level').value);
      formData.append('Language', this.form.get('language').value);
      formData.append('SyllabusName', this.form.get('syllabusName').value);
      formData.append('DevOfficer', this.form.get('devOfficer').value);
      formData.append('Manager', this.form.get('manager').value);
      formData.append('ActiveDate', this.form.get('activeDate').value);
      if((<HTMLInputElement>document.getElementById('syllabusFile')).files.length > 0){
        formData.append('SyllabusFile', (<HTMLInputElement>document.getElementById('syllabusFile')).files[0]);
      }
      if((<HTMLInputElement>document.getElementById('testPlanFile')).files.length > 0){
        formData.append('TestPlanFile', (<HTMLInputElement>document.getElementById('testPlanFile')).files[0]);
      }

      this.service.updatePlan(formData).subscribe(
        result => {
          // result is null because of cors
          this.snackBar.open("Data saved successfully", '', {
            duration: this.durationInSeconds,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-success']
          });
          this.isSubmitting = false;
          this.dialogRef.close();
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
    else{
      this.form.markAllAsTouched();
    }
  }
}
