import { Injectable } from '@angular/core';
import  { Http, Response } from '@angular/http';//Angular shortcode for AJAX request
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Encounter } from '../models';//This line imports a class from models

@Injectable()
export default class EncountersService {

  ENCOUNTERS_JSON = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';//This will create a class for JSON url

  constructor(private http: Http) { }

  getColonists(): Observable<Encounter[]> {
    return this.http.get(this.ENCOUNTERS_JSON)
                    .map((res: Response) => res.json().encounters);
  }

}
