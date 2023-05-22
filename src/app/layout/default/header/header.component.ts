
import { Component, OnInit } from '@angular/core';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/shared/services/layout/layout.service';

@Component({
  selector: 'app-layout-default-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class LayoutDefaultHeaderComponent implements OnInit {

  constructor(
    private cookies: CookiesService,
    private router: Router,
    public layout: LayoutService
  ) { }
  userName = this.cookies.getCookie('name');
  modules = [
    { title: 'module1' },
    { title: 'module2' },
    { title: 'module3' },
    { title: 'module4' }
  ];

  logout = () => {
    this.cookies.clearAll();
    window.sessionStorage.clear();
    this.router.navigate(['/passport/login']);
  }

  sidebarCollapsed = () => {
    this.layout.isCollapsedEventer.emit(!this.layout.isCollapsed);
  }

  ngOnInit() {
  }

}
