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
  styleUrls: ['./encounters.component.scss'],
  providers: [EncountersService], //This injects from service to be used below
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
export class EncountersComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'absolute';
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
