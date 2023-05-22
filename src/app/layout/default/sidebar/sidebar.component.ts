/*
 * @Date: 2019-06-20 13:59:49
 * @LastAuthor: 曹雪原
 * @lastTime: 2020-12-14 15:19:16
 */
import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout/layout.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';
import { NzIconService } from 'ng-zorro-antd/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-layout-default-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class LayoutDefaultSidebarComponent implements OnInit {
  isCollapsed = this.layout.isCollapsed;
  sidebarData = [
    {
      level: 1,
      title: '账号管理',
      icon: 'bars',
      open: true,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: '修改密码',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          level: 2,
          title: '修改出款密码',
          selected: true,
          disabled: false
        },
        {
          level: 2,
          title: '子账号',
          selected: false,
          disabled: false
        }
      ]
    },{
      level: 1,
      title: '订单管理',
      icon: 'bars',
      open: true,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: '银行卡订单',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          level: 2,
          title: '提现订单',
          selected: true,
          disabled: false
        }
      ]
    },{
      level: 1,
      title: '商户管理',
      icon: 'bars',
      open: true,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: '商户账号',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          level: 2,
          title: '商户订单',
          selected: true,
          disabled: false
        }
      ]
    },
  ];
  constructor(
    private layout: LayoutService,
    private iconService: NzIconService
  ) {
    this.iconService.fetchFromIconfont({
      scriptUrl: `https://at.alicdn.com/t/font_1508701_agl1n5twy1i.js`
    });
  }

  ngOnInit() {
    // 菜单收起展开
    this.layout.isCollapsedEventer.subscribe(res => { this.isCollapsed = this.layout.isCollapsed = res; });
  }

}
