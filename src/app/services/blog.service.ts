import { Injectable } from '@angular/core';
import  { Http, Response } from '@angular/http';//Angular shortcode for AJAX request
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Blog } from '../models';//This line imports a class from models

@Injectable()
export default class BlogsService {

  BLOG_JSON = 'http://fourth.academy.red/wp-json/wp/v2/posts';//This will create a class for JSON url

  constructor(private http: Http) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get(this.BLOG_JSON)
                    .map((res: Response) => res.json());
  }

}
