import { Component,
          OnInit,
          HostBinding,
         trigger,
         transition,
         animate,
         style,
         state
       } from '@angular/core';
import  { Blog } from '../models';//Import classes from models folder;
import  BlogsService from '../services/blog.service';//This calls from service

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  providers: [BlogsService],
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
export class BlogComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'absolute';
  }

  marsBlog: Blog[];

  constructor(blogService : BlogsService) {
    blogService.getBlogs().subscribe((blog) => {
      this.marsBlog = blog;
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
