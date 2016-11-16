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
    jobService.getJobs().subscribe((jobs) => {
      this.marsJobs = jobs;
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

  get jobSelected (){
    return this.colonist.job_id === this.NO_JOB_SELECTED;
  }

}
