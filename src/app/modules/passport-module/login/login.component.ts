
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(
    private cookies: CookiesService,
    private http: HttpClient,
    private common: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService
  ) { }
  loginForm = this.fb.group({
    name: ['zhang', Validators.required],
    pwd: ['aaa', Validators.required],
    code: ['xxx', Validators.required],
    remember: [true]
  });

  loading = false;
  doLogin = () => {
    this.common.formValid(this.loginForm);
    if (this.loginForm.valid) {
      this.cookies.clearAll();
      window.localStorage.clear();
      window.sessionStorage.clear();
      // this.cookies.setCookie('name', '测试用户', 12);
      // this.router.navigateByUrl('');
      this.loading = true;
      this.http.get<any>(`/admin/user/login?username=${this.loginForm.value.name}&password=${this.loginForm.value.pwd}&one_code=${this.loginForm.value.code}`)
        .subscribe({
          next: (res) => {
            console.log(res);
            let rememberTime = this.loginForm.value.remember ? 7 * 24 : 24;
            this.cookies.setCookie('id', res.id, rememberTime);
            this.cookies.setCookie('merchant_id', res.merchant_id, rememberTime);
            this.cookies.setCookie('username', res.username, rememberTime);
            this.cookies.setCookie('role', res.role, rememberTime);
            this.cookies.setCookie('token', res.token.token, rememberTime);
            if(res.permission){
              const permission = res.permission.map((item: any) => item.url);
              this.cookies.setCookie('permission', JSON.stringify(permission), rememberTime);
            }
            this.message.success(`${res.username},欢迎登录!`)
            this.router.navigateByUrl('/');
          },
          error: (e) => {
            console.log('login error');
            this.loading = false;
          },
          complete: () => {
            console.log('login complete');
            this.loading = false;
          }
        })
    }
  }
  ngOnInit() {
    console.log(111);
    // this.cookies.clearAll();
    // window.localStorage.clear();
    // window.sessionStorage.clear();
  }

}
