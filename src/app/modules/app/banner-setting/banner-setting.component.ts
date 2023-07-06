import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { BannerFormComponent } from '../banner-form/banner-form.component';

@Component({
  selector: 'app-banner-setting',
  templateUrl: './banner-setting.component.html',
  styleUrls: ['./banner-setting.component.scss']
})
export class BannerSettingComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private drawer: NzDrawerService
  ) { }
  page = {
    index: 1,
    size: 20,
    total: 0
  }
  loading = false;
  bannerData: any[] = [];
  getData = () => {
    this.loading = true;
    let params = {
      page: this.page.index
    }
    this.http.get<any>('/admin/banners', { params }).subscribe(res => {
      this.bannerData = res.list;
      this.loading = false;
      this.page.index = res.page;
      this.page.total = parseInt(res.count);
    })
  }
  pageIndexChange = (e: any) => {
    this.page.index = e;
    this.getData();
  }
  add = () => {
    this.drawer.create({
      nzTitle: '新建Banner公告',
      nzContent: BannerFormComponent,
      nzWidth: '80%',
      nzMaskClosable: false,
      nzKeyboard: false
    });
  }
  ngOnInit(): void {
    this.getData()
  }
}
