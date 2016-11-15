import { Injectable } from '@angular/core';
import  { Http, Response } from '@angular/http';//Angular shortcode for AJAX request
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Job } from '../models';//This line imports a class from models

@Injectable()
export default class JobsService {

  JOBS_JSON = 'https://red-wdp-api.herokuapp.com/api/mars/jobs';//This will create a class for JSON url

  constructor(private http: Http) { }

  getJobs(): Observable<Job[]> {
    return this.http.get(this.JOBS_JSON)
                    .map((res: Response) => res.json());
  }

}
