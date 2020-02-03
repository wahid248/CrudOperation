import { DataShareService } from './../common/services/data-share.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fadeIn } from './../ui/animations';

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
      testPlanFile: ['']
    });
  }

  onSubmit(): void {
    if (this.form.valid && !this.isSubmitting) {
      //this.isSubmitting = true;
      
    }
  }
}
