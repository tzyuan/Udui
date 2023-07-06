
import { Component, OnInit, TemplateRef } from '@angular/core';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/shared/services/layout/layout.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GoogleQrcodeComponent } from 'src/app/modules/account/google-qrcode/google-qrcode.component';

@Component({
  selector: 'app-layout-default-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class LayoutDefaultHeaderComponent implements OnInit {

  constructor(
    private cookies: CookiesService,
    private router: Router,
    private modal: NzModalService,
  ) { }
  userName = this.cookies.getCookie('username');
  one_code = '';
  modules = [
    { title: 'module1' },
    { title: 'module2' },
    { title: 'module3' },
    { title: 'module4' }
  ];

  logout = () => {
    this.modal.confirm({
      nzTitle: '退出登录',
      nzContent: '您确定要这么做吗?',
      nzOnOk: () => {
        this.cookies.clearAll();
        window.sessionStorage.clear();
        this.router.navigate(['/passport/login']);
      }
    })
  }
  googleCode = (telContent: TemplateRef<{}>) => {
    this.one_code = '';
    this.modal.create({
      nzTitle: '验证二维码',
      nzContent: telContent,
      nzOnOk: () => {
        this.modal.create({
          nzTitle: '谷歌验证二维码',
          nzContent: GoogleQrcodeComponent,
          nzComponentParams: { one_code: this.one_code },
          nzCancelText: null
        })
      }
    })

  }


  ngOnInit() {
  }

}
