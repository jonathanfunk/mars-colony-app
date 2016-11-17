import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl  } from '@angular/forms';
import { NewColonist, Job } from '../models';
import JobsService from '../services/jobs.service';




@Component({
 selector: 'app-register',
 templateUrl: './register.component.html',
 styleUrls: ['./register.component.css'],
 providers: [JobsService]
})
export class RegisterComponent implements OnInit {

 marsJobs: Job[];
 registerForm: FormGroup;

 NO_JOB_SELECTED = '(none)';

 constructor(public jobService: JobsService,
             /* private formBuilder: FormBuilder */) {

     jobService.getJobs().subscribe((jobs) => {
       this.marsJobs = jobs;
     }, (err) => {
       console.log(err);
     });

 }

 cantBe(value: string): ValidatorFn {
   return (control: AbstractControl): {[key: string]: any} => {
     return control.value === value ? {'cant be value': { value }} : null;
   };
 }

 ngOnInit() {

   this.registerForm = new FormGroup({
     name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
     age: new FormControl('', [Validators.required, Validators.minLength(1)]),
     job_id: new FormControl(this.NO_JOB_SELECTED, [this.cantBe(this.NO_JOB_SELECTED)])
   });

 }

   onSubmit(event) {
     event.preventDefault();
     if(this.registerForm.invalid){
       console.log("Not working!")
     } else {
       const name = this.registerForm.get('name').value;
       const age = this.registerForm.get('age').value;
       const job_id = this.registerForm.get('job_id').value;
       console.log("Okay, let's register this new colonist:", new NewColonist(name, age, job_id));
     }
   }
}
