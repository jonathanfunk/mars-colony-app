import { Component,
          OnInit,
          HostBinding,
         trigger,
         transition,
         animate,
         style,
         state
       } from '@angular/core';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
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
          transform: 'translateY(0)'
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


export class WelcomeComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'absolute';
  }

  constructor() { }

  ngOnInit() {
  }
}
