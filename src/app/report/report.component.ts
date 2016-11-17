import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl  } from '@angular/forms';//This line imports form functionalities
import { Alien } from '../models';//This line will import classes which will be used in this component
import AliensService from '../services/aliens.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [AliensService]
})
export class ReportComponent implements OnInit {

  marsAliens: Alien[];
  reportForm: FormGroup;
  NO_ALIEN_SELECTED = '(none)';

  constructor(public alienService: AliensService,
              private formBuilder: FormBuilder) {

      alienService.getAliens().subscribe((aliens) => {
        this.marsAliens = aliens;
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

    //This is used to validate a form
    this.reportForm = new FormGroup({
      alien_id: new FormControl(this.NO_ALIEN_SELECTED, [this.cantBe(this.NO_ALIEN_SELECTED)]),
      action: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.reportForm.invalid) {
      // The form is invalid...
    } else {
      const alien_id = this.reportForm.get('alien_id').value;
      const action = this.reportForm.get('action').value;


      console.log("You saw an" + alien_id + " and you " + action);
    }
  }

}
