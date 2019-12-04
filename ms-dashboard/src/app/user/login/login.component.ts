import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'app/shared/Services/user.service';
import swal from 'sweetalert2';
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
            if (response.data_obj != undefined) {
              this.router.navigateByUrl('/dashboard/twitter');
              localStorage.setItem("token", "Pocket T.A.N.K.S.");
            } else {

            }
          },
          error => {

          }
        );

      }
      else {
        //API Call for register
        let createUserRequest = {
          email: this.loginFormGroup.get('username').value,
          fullName: this.loginFormGroup.get('firstname').value + ' ' + this.loginFormGroup.get('lastname').value,
          password: this.loginFormGroup.get('password').value,
          emailVerified: false
        }
        this._userservice.createUser(createUserRequest).subscribe(
          response => {
            console.log(response);
            if (response != undefined) {
              if(!response.emailVerified)
              {
                Swal.fire({
                  title: 'Are you sure?',
                  text: 'You will not be able to recover this imaginary file!',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, delete it!',
                  cancelButtonText: 'No, keep it'
                }).then((result) => {
                  if (result.value) {
                    Swal.fire(
                      'Deleted!',
                      'Your imaginary file has been deleted.',
                      'success'
                    )
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                      'Cancelled',
                      'Your imaginary file is safe :)',
                      'error'
                    )
                  }
                })
              }
              this.router.navigateByUrl('/login');
            } else {

            }
          },
          error => {

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