//User model
export interface IUser {
  name: string;
  email: string;
  password: string;
  active: boolean;
}

//For company model
export interface ILocation {
  country: string;
  city: string;
}

export interface ICompany {
  name: string;
  location: ILocation;
  companySize: number;
  email: string;
  about: string;
  website: string;
  userID: any;
}

//JOb model
type seniorityTypes = "entry" | "junior" | "intermediate" | "senior";
type jobTypes = "office" | "remote" | "hybrid";

export interface ISalaryRange {
  min: number;
  max: number;
}

export interface IJob {
  title: string;
  description: string;
  seniority: seniorityTypes;
  type: jobTypes;
  salaryRange: ISalaryRange;
  link: string;
  openingDate: Date;
  closingDate: Date;
  companyID: any;
}
