import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password-verification',
  templateUrl: './reset-password-verification.component.html',
  styleUrls: ['./reset-password-verification.component.scss']
})
export class ResetPasswordVerificationComponent implements OnInit {
  
  constructor(private _fb: FormBuilder, private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }
  ngOnInit() {
  }
}