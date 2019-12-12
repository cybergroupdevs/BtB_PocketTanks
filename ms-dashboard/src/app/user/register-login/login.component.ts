import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'app/shared/Services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSignup: Boolean = false;

  loginFormGroup: FormGroup;

  constructor(
    private _userservice: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.router.url === "/signup") {
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
    else {
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
    this.markFormGroupTouched(this.loginFormGroup);

    if (this.loginFormGroup.valid) {
      if (this.isSignup === false) {
        //API Call for login
        let loginUserRequest = {
          email: this.loginFormGroup.get('username').value,
          password: this.loginFormGroup.get('password').value,
        }
        this._userservice.loginUser(loginUserRequest).subscribe(
          response => {
            if (response.success) {
              localStorage.setItem("userid", response.data.userId);
              localStorage.setItem("authToken", response.data.token);
              localStorage.setItem("email", this.loginFormGroup.get('username').value);
              this.router.navigateByUrl('/dashboard/twitter');
            } else {
              Swal.fire({
                title: 'Oops!',
                text: response.message,
                icon: 'error'
              });
            }
          },
          error => {
            Swal.fire({
              title: 'Oops!',
              text: error.message,
              icon: 'error'
            });
          }
        );

      }
      else {
        //API Call for register
        let createUserRequest = {
          email: this.loginFormGroup.get('username').value,
          fullName: this.loginFormGroup.get('firstname').value + this.loginFormGroup.get('lastname').value,
          password: this.loginFormGroup.get('password').value,
          emailVerified: false
        }
        
        this._userservice.createUser(createUserRequest).subscribe(
          response => {
            if (response.success) {
              if(!response.data.emailVerified)
              {
                Swal.fire({
                  title: 'Verify your email!',
                  text: 'Please open your mailbox and verify your account!',
                  icon: 'warning'
                });
                this.router.navigateByUrl('/login');
              }
              else
              {
                this.router.navigateByUrl('/login');
              }
            } else {
              Swal.fire({
                title: 'Oops!',
                text: response.message,
                icon: 'error'
              });
            }
          },
          error => {
            Swal.fire({
              title: 'Oops!',
              text: error.message,
              icon: 'error'
            });
          }
        );
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
      } catch (e) { }
    });
  }
}