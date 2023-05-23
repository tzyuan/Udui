import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-pay-password',
  templateUrl: './reset-pay-password.component.html',
  styleUrls: ['./reset-pay-password.component.scss']
})
export class ResetPayPasswordComponent {
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
