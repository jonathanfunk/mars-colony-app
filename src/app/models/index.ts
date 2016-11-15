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


export class Colonist {
  constructor(
    public name: string,
    public job: Job,
    public id: number,
    public age: number
  ){}
}

export class Alien {
  constructor(
    public type: string,
    public submitted_by: number,
    public id: number,
    public description: string
  ){}
}
