//Making model classes is 1st step

//Interface is description of object and they end in semi-colons and have no constructors

export class NewEncounter {
  constructor(
    public date: string,
    public atype: string,
    public action: string,
    public colonist_id: string
  ){}
}

export interface Encounter {
    id: number;
    date: string;
    atype: string;
    action: string;
    colonist_id: number;
}

export interface Job {//Linked to Colonist Class
    name: string;
    id: number;
    description: string;
}


export class NewColonist {
  constructor(
    public name: string,
    public age: string,
    public job_id: string
  ){}
}

export interface Colonist {
  name: string;
  id: number;
  age: number;
  job: Job;
}

export interface Alien {
  type: string;
  submitted_by: number;
  id: number;
  description: string;
}

export interface Blog {
  id: number;
  date: string;
  date_gmt: string;
  guid: {};
  modified: string;
  modified_gmt: string;
  slug: string;
  type: string;
  link: string;
  title: {};
  content: {};
  excerpt: {};
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  format: string;
  categories: {};
  tags: {};
  [_links: number]: {}
}
