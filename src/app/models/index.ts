//Making model classes is 1st step

export class Encounter {//Found in encounters component
  constructor(
    public id: number,
    public date: string,
    public colonist_id: number,
    public atype: string,
    public action: string
  ){}
}

export class Job {//Linked to Colonist Class
  constructor(
    public name: string,
    public id: number,
    public description: string
  ){}
}


export class NewColonist {
  constructor(
    public name: string,
    public age: number,
    public job_id: string
  ){}
}

interface Colonist {
  name: string;
  id: number;
  age: number;
  job: Job;
}

export class Alien {
  constructor(
    public type: string,
    public submitted_by: number,
    public id: number,
    public description: string
  ){}
}
