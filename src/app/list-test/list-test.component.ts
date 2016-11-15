import { Component, OnInit } from '@angular/core';

//This will create the Apple class
class Apple {
  constructor(
    public name: string,
    public color: string
  ){}
}

@Component({
  selector: 'app-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.css']
})

export class ListTestComponent implements OnInit {
  apple:Apple = {name: '', color: ''};
  appleList:[Apple] =
    [{
      name: 'Granny Smith',
      color: 'Green'
    },
    {
      name: 'Red Delicious',
      color: 'Red'
    },
    {
      name: 'Crab',
      color: 'Crab'
    }];
    addApple() {
      this.appleList.push(this.apple);
      this.apple = {name: '', color: ''};
    }

  constructor() { }

  ngOnInit() {
  }

}
