import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  incorrectCredentials: boolean = false;
  errorDisplay: String;
  isSignup: Boolean = false;

  constructor(
    private service: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.router.url === "/signup") 
      this.isSignup = true;
  }

  Submit(f) {
    let credentials = {
      username: f.value.username,
      password: f.value.password
    }

    if (this.isSignup === false) {
      // this.service.login(credentials)
      // .subscribe(data => {
      //   this.incorrectCredentials = false;
        
      //   localStorage.setItem("token", data["token"]);
      //   f.reset();

      //   this.router.navigateByUrl('/home');  
      // },
      // (error) => {
      //   this.incorrectCredentials = true;
      //   this.errorDisplay = error;
      // })
      this.router.navigateByUrl('/dashboard/twitter');  
      localStorage.setItem("token", "Pocket T.A.N.K.S."); 
    }
    else {
      credentials["firstname"] = f.value.firstname
      credentials["lastname"] = f.value.lastname
      
      // this.service.signup(credentials)
      // .subscribe(data => {
      //   f.reset();
      //   this.router.navigateByUrl('/login');  

      // },
      // (error) => {
      //   this.incorrectCredentials = true;
      //   this.errorDisplay = error;
      // })
    }
    console.log(credentials);
    
  }
}
