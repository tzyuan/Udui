import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
  ) {

  }

  form = this.fb.group({
    oldPassword: [null, [Validators.required]],
    newPassword: [null, [Validators.required]],
    reNewPassword: [null, [Validators.required]],
    googleCode: [null, [Validators.required]],
  });
  loading = false;

  ngOnInit(): void {
  }
}
