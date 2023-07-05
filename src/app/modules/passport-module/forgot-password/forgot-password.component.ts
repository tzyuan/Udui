import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private cookies: CookiesService,
    private http: HttpClient,
    private common: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService
  ) { }
  form = this.fb.group({
    username: ['', Validators.required],
    new_password: ['', Validators.required],
    re_new_password: ['', Validators.required],
    one_code: ['', Validators.required],
  });

  loading = false;
  submit = () => {
    this.common.formValid(this.form);
    if (this.form.value.new_password !== this.form.value.re_new_password) {
      this.message.error('两次输入密码不一致,请检查');
      return;
    }

    if (this.form.valid) {
      this.loading = true;
      this.http.post<any>(`/admin/reset/do`, this.form.value)
        .subscribe({
          next: (res) => {
            this.message.success('密码修改成功');
            this.router.navigateByUrl('/');
          },
          error: (e) => {
            console.log('login error');
            this.loading = false;
          }
        })
    }
  }
  ngOnInit() {
  }
}
