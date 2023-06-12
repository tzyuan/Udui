
import { Component, OnInit } from '@angular/core';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/shared/services/layout/layout.service';
import { NzModalService } from 'ng-zorro-antd/modal';

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


  ngOnInit() {
  }

}
