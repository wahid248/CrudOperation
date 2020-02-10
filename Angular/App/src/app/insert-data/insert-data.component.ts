import { PlanService } from './../common/services/plan.service';
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
  isLanguageInvalid: boolean;

  constructor(
    private builder: FormBuilder,
    private titleService: Title,
    private service: PlanService,
    private snackBar: MatSnackBar,
    private dataShareService: DataShareService) {

    this.isSubmitting = false;
    this.durationInSeconds = 5000;
    this.isLanguageInvalid = false;

    this.titleService.setTitle('Insert Data | Crud Operations');
    this.dataShareService.changeHeaderTitle('Insert Data');
  }

  ngOnInit() {
    this.form = this.builder.group({
      trade: ['Asphalt Concrete Paving', Validators.required],
      level: ['SATW', Validators.required],
      syllabusName: ['', Validators.required],
      devOfficer: ['', Validators.required],
      manager: ['', Validators.required],
      syllabusFile: [''],
      testPlanFile: [''],
      activeDate: ['', Validators.required],
      language: ['', Validators.required]
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

  onSubmit(): void {
    if (this.form.valid && !this.isSubmitting && !this.isLanguageInvalid) {
      this.isSubmitting = true;
      let formData = new FormData();

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
    else{
      this.form.markAllAsTouched();
    }
  }
}
