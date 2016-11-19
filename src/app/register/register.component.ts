import { Component,
          OnInit,
          HostBinding,
         trigger,
         transition,
         animate,
         style,
         state
       } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl  } from '@angular/forms';//This line imports form functionalities
import { NewColonist, Job } from '../models';//This line will import classes which will be used in this component
import JobsService from '../services/jobs.service';
import ColonistsService from '../services/colonist.service';
import { cantBe } from '../shared/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [JobsService, ColonistsService],
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          width: '100%',
          opacity: 1,
          transform: 'translateY(0)'
        })
      ),
      transition('void => *', [
        style({
          width: '100%',
          opacity: 0,
          transform: 'translateY(-100%)'
        }),
        animate('1s ease-in')
      ]),
      transition('* => void', [
        animate('1s ease-out', style({
          width: '100%',
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})

export class RegisterComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'absolute';
  }

  colonist: NewColonist;
  marsJobs: Job[];
  registerForm: FormGroup;

  NO_JOB_SELECTED = '(none)';

  constructor(private router: Router,
              private jobService: JobsService,
              private colonistsService: ColonistsService,
              private formBuilder: FormBuilder) {

      jobService.getJobs().subscribe((jobs) => {
        this.marsJobs = jobs;
      }, (err) => {
        console.log(err);
      });

  }

  ngOnInit() {

    //This is used to validate a form
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      age: new FormControl('', [Validators.required]),
      job_id: new FormControl(this.NO_JOB_SELECTED, [cantBe(this.NO_JOB_SELECTED)])
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.registerForm.invalid) {
      // The form is invalid...
    } else {
      const name = this.registerForm.get('name').value;
      const age = this.registerForm.get('age').value.toString();
      const job_id = this.registerForm.get('job_id').value;
      const colonist = new NewColonist(name, age, job_id);
      //console.log('Ok, let\'s register this new colonist:', new NewColonist(name, age, job_id));
      this.colonistsService.submitColonist(colonist).subscribe((colonist) => {
        localStorage.setItem("colonist", JSON.stringify(colonist));
        this.router.navigate(['/encounters']);
      }, (err) => {
        console.log("NOT WORKING!");
      });
    }
  }
}
