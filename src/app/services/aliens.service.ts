import { Injectable } from '@angular/core';
import  { Http, Response } from '@angular/http';//Angular shortcode for AJAX request
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Alien } from '../models';//This line imports a class from models

@Injectable()
export default class AliensService {

  ALIENS_JSON = 'https://red-wdp-api.herokuapp.com/api/mars/aliens';//This will create a class for JSON url

  constructor(private http: Http) { }

  getColonists(): Observable<Alien[]> {
    return this.http.get(this.ALIENS_JSON)
                    .map((res: Response) => res.json().aliens);
  }

}
