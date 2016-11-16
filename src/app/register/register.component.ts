import { Component, OnInit } from '@angular/core';
import  { NewColonist, Job } from '../models';//Import classes from models folder;
import  JobsService from '../services/jobs.service';//This calls from service

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [JobsService] //This injects from service to be used below
})
export class RegisterComponent implements OnInit {

  colonist: NewColonist;
  marsJobs: Job[];

  NO_JOB_SELECTED = '(none)';

  constructor(jobService: JobsService) {
    this.colonist = new NewColonist(null, null, this.NO_JOB_SELECTED) //Initial value is zero until user types in form
    jobService.getJobs().subscribe((jobs) => {//Subscribe is an asyncronous method. Loop is done in service.
      this.marsJobs = jobs;
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {
    setTimeout(() => {
      console.log("I'm late!");
    }, 2000);

    console.log("I'm on time!");


  }

  onSubmit(event, registerForm){
    event.preventDefault();
    console.log(registerForm.form.controls.name.invalid);
  }

  get jobSelected (){
    return this.colonist.job_id === this.NO_JOB_SELECTED;
  }



}
