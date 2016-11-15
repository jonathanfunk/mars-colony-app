class Encounter{
  constructor(
    public id: number,
    public date: string,
    public colonist_id: number,
    public atype: string,
    public action: string
  ){}
}

class Colonist{
  constructor(
    public name: string,
    public job: Job,
    public id: number,
    public age: number
  ){}
}

class Job{
  constructor(
    public name: string,
    public id: number,
    public description: string
  ){}
}

class Alien{
  constructor(
    public type: string,
    public submitted_by: number,
    public id: number,
    public description: string
  ){}
}
