import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl  } from '@angular/forms';//This line imports form functionalities
import { NewColonist, Job } from '../models';//This line will import classes which will be used in this component
import JobsService from '../services/jobs.service';
import { cantBe } from '../shared/validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [JobsService]
})

export class RegisterComponent implements OnInit {

  colonist: NewColonist;
  marsJobs: Job[];
  registerForm: FormGroup;

  NO_JOB_SELECTED = '(none)';

  constructor(private jobService: JobsService,
              private formBuilder: FormBuilder) {

      jobService.getJobs().subscribe((jobs) => {
        this.marsJobs = jobs;
      }, (err) => {
        console.log(err);
      });

  }

  tooOld(value: number): ValidatorFn {
     return (control: AbstractControl): {[key: string]: any} => {
        return control.value > 100 ? {'too old': { value }} : null;
    };
  }

  ngOnInit() {

    //This is used to validate a form
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      age: new FormControl('', [Validators.required, this.tooOld(100)]),
      job_id: new FormControl(this.NO_JOB_SELECTED, [cantBe(this.NO_JOB_SELECTED)])
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.registerForm.invalid) {
      // The form is invalid...
    } else {
      const name = this.registerForm.get('name').value;
      const age = this.registerForm.get('age').value;
      const job_id = this.registerForm.get('job_id').value;

      console.log('Ok, let\'s register this new colonist:', new NewColonist(name, age, job_id));
    }
  }
}
