import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-reset-pay-password',
  templateUrl: './reset-pay-password.component.html',
  styleUrls: ['./reset-pay-password.component.scss']
})
export class ResetPayPasswordComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private message: NzMessageService
  ) {

  }

  form = this.fb.group({
    newPassword: [null, [Validators.required]],
    reNewPassword: [null, [Validators.required]],
    googleCode: [null, [Validators.required]],
  });
  loading = false;

  doRepwd = () => {
    if (this.form.value.newPassword !== this.form.value.reNewPassword) {
      this.message.error('两次输入的密码不相等,请检查');
      return;
    }
    this.loading = true;
    this.http.post('/admin/user/change-login-pwd', {
      new_password: this.form.value.newPassword,
      one_code: this.form.value.googleCode
    }).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => { this.loading = false; },
      complete: () => { this.loading = false; }
    })
  }
  ngOnInit(): void {
  }
}
