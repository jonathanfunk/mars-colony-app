import {  Component,
          OnInit,
          HostBinding,
          trigger,
          transition,
          animate,
          style,
          state
       } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl  } from '@angular/forms';//This line imports form functionalities
import { Alien, NewEncounter } from '../models';//This line will import classes which will be used in this component
import AliensService from '../services/aliens.service';
import EncountersService from '../services/encounter.service';
import { cantBe } from '../shared/validators';
import { Router } from '@angular/router';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [AliensService, EncountersService],
  animations: [
      trigger('routeAnimation', [
        state('*',
          style({
            opacity: 1,
            transform: 'translateX(0)'
          })
        ),
        transition(':enter', [
          style({
            opacity: 0,
            transform: 'translateX(-100%)'
          }),
          animate('0.2s ease-in')
        ]),
        transition(':leave', [
          animate('0.5s ease-out', style({
            opacity: 0,
            transform: 'translateY(100%)'
          }))
        ])
      ])
    ]
})
export class ReportComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  marsAliens: Alien[];
  reportForm: FormGroup;
  NO_ALIEN_SELECTED = '(none)';

//This is a default method of the class that is called and ensures proper initialization.
constructor(private router: Router,
  private alienService: AliensService,
  private encountersService: EncountersService,
  private formBuilder: FormBuilder) {

    alienService.getAliens().subscribe((aliens) => {
      this.marsAliens = aliens;
    }, (err) => {
      console.log(err);
    });

  }

  //This is for initializing content after component is created
  ngOnInit() {

    //This is used to validate a form
    this.reportForm = new FormGroup({
      atype: new FormControl(this.NO_ALIEN_SELECTED, [cantBe(this.NO_ALIEN_SELECTED)]),
      action: new FormControl('', [Validators.required, Validators.maxLength(450)])
    });
  }

  //This sets up YYYY-MM-DD date
  private getDate(){
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  }

  onSubmit(event) {
    event.preventDefault();
      const colonist = JSON.parse(localStorage.getItem("colonist"));
      const date = this.getDate();
      const atype = this.reportForm.get('atype').value;
      const action = this.reportForm.get('action').value;
      const encounter = new NewEncounter(date, atype, action, colonist.id );
      this.encountersService.submitEncounter(encounter).subscribe(() => {
        console.log(encounter);
        //console.log(localStorage.getItem("colonist"));
        this.router.navigate(['/encounters']);
      }, (err) => {
        console.log("NOT WORKING!");
      });


  }
}
