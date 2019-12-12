import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'app/shared/Services/user/user.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  constructor(private _userservice: UserService,
    private router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this._activatedRoute.params.forEach((urlParams) => {
      let emailVerificationRequest = {
        'token':urlParams.token
      }

      this._userservice.verifyEmail(emailVerificationRequest).subscribe(
        response => {
          if (response.success) {
            window.close();
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
    });
  }
}
