export class Auth {
  mobile: string;
  email: string;
  countryCode: string;
  userid: string = "admin@dfftech.com";
  password: string = "Test!234";
  token: any;
  vid: string;
  username: string = this.vid + "-" + this.userid;
  img: string;
  provider: string = "email";
}
