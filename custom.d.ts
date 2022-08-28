//Declaration Merging... Attaching a user property to the Request interface
declare namespace Express {
  export interface Request {
    user: any;
  }
}
