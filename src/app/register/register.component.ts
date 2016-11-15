import { Component, OnInit } from '@angular/core';
import  { Colonist, Job } from '../models';//Step 3; Import classes from models folder;
import  JobsService from '../services/jobs.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [JobsService]
})
export class RegisterComponent implements OnInit {

  colonist: Colonist;
  marsJobs: Job[];

  constructor(jobService: JobsService) {
    this.colonist = new Colonist('', null, null, null) //Initial value is zero until user types in form
    jobService.getJobs().subscribe((jobs) => {
      this.marsJobs = jobs;
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
