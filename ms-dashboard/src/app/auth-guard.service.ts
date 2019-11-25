import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(){
    // if(this.authService.isLoggedIn()) return true;
    if(localStorage.getItem("token")) return true;
    else{
      this.router.navigateByUrl("/login")
      return false;
    }
  }
}
