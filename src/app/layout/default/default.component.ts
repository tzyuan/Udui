
import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout/layout.service';
import { HttpClient } from '@angular/common/http';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class LayoutDefaultComponent implements OnInit {
  previewVisible = false;
  width = [900, 1055, 797];
  seeIndex = 0;
  iKnowLoading = false;
  constructor(
    private layout: LayoutService,
    private http: HttpClient,
    private cookies: CookiesService
  ) { }
  ngOnInit() {
    if (this.cookies.getCookie('isRead') === '0') {
      this.previewVisible = true;
    }
  }
  sidebarCollapsed = () => {
    this.layout.isCollapsedEventer.emit(!this.layout.isCollapsed);
  }
  iKnow = () => {
    if (this.seeIndex !== 2) {
      this.seeIndex++;
      return;
    }
    this.iKnowLoading = true;
    this.http.post(`/login/is_read`, { userId: this.cookies.getCookie('userId') }).subscribe(res => {
      this.previewVisible = false;
      this.cookies.setCookie('isRead', '1');
    });
  }

}
