import { Component,
          OnInit,
          HostBinding,
         trigger,
         transition,
         animate,
         style,
         state
       } from '@angular/core';
import  { Encounter } from '../models';//Import classes from models folder;
import  EncountersService from '../services/encounter.service';//This calls from service

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.css'],
  providers: [EncountersService], //This injects from service to be used below
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
export class EncountersComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  marsEncounters: Encounter[];

  constructor(encounterService : EncountersService) {
    encounterService.getEncounters().subscribe((encounters) => {//Subscribe is an asyncronous method. Loop is done in service.
      this.marsEncounters = encounters;
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
