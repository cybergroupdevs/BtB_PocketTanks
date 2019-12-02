import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSignup: Boolean = false;

  loginFormGroup: FormGroup;

  constructor(
    private service: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.router.url === "/signup")
    {
      this.isSignup = true;
      this.loginFormGroup = this._fb.group({
        firstname: [
          "",
          [
            <any>Validators.required
          ]
        ],
        lastname: [
          "",
          [
            <any>Validators.required
          ]
        ],
        username: [
          "",
          [
            <any>Validators.required
          ]
        ],
        password: [
          "",
          [
            <any>Validators.required
          ]
        ]
      });
    }
    else
    {
      this.loginFormGroup = this._fb.group({
        username: [
          "",
          [
            <any>Validators.required
          ]
        ],
        password: [
          "",
          [
            <any>Validators.required
          ]
        ]
      });
    }
  }

  submitForm() {
    debugger;

    this.markFormGroupTouched(this.loginFormGroup);

    if(this.loginFormGroup.valid)
    {
      debugger;
      if (this.isSignup === false) {
          this.router.navigateByUrl('/dashboard/twitter');
          localStorage.setItem("token", "Pocket T.A.N.K.S.");
        }
        else {  
          this.router.navigateByUrl('/login');
        }
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      try {
        control.markAsTouched();

        if (control.controls) {
          this.markFormGroupTouched(control);
        }
      } catch (e) {}
    });
  }
}
