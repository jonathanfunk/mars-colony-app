import { Component, OnInit } from '@angular/core';
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
  providers: [AliensService, EncountersService]
})
export class ReportComponent implements OnInit {

  marsAliens: Alien[];
  reportForm: FormGroup;
  NO_ALIEN_SELECTED = '(none)';

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

  ngOnInit() {

    //This is used to validate a form
    this.reportForm = new FormGroup({
      atype: new FormControl(this.NO_ALIEN_SELECTED, [cantBe(this.NO_ALIEN_SELECTED)]),
      action: new FormControl('', [Validators.required, Validators.maxLength(450)])
    });
  }

  private getDate(){
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  }

  onSubmit(event) {
    event.preventDefault();
      const date = this.getDate();
      const atype = this.reportForm.get('atype').value;
      const action = this.reportForm.get('action').value;
      const encounter = new NewEncounter(date, atype, action, '10' );
      this.encountersService.submitEncounter(encounter).subscribe(() => {
        this.router.navigate(['/encounters']);
      }, (err) => {
        console.log("NOT WORKING!");
      });


  }
}
