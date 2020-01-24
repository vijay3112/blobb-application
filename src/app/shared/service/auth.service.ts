import { Injectable } from "@angular/core";
import { Storage } from "../utils/storage";
import { Router, CanActivate } from "@angular/router";

@Injectable()
export class AuthService implements CanActivate {
  constructor(public router: Router) {}

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(["auth/login"]);
      return false;
    }
    return true;
  }

  public isAuthenticated(): boolean {
    const token = Storage.getJWT();
    return token && token != null;
  }
}
