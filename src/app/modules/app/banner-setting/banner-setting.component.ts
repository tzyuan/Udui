import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { BannerFormComponent } from '../banner-form/banner-form.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-banner-setting',
  templateUrl: './banner-setting.component.html',
  styleUrls: ['./banner-setting.component.scss']
})
export class BannerSettingComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private drawer: NzDrawerService,
    private modal: NzModalService,
    private message: NzMessageService

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
    const drawer = this.drawer.create({
      nzTitle: '新建Banner公告',
      nzContent: BannerFormComponent,
      nzWidth: '80%',
      nzMaskClosable: false,
      nzKeyboard: false
    });

    drawer.afterClose.subscribe(res => {
      if (res) { this.getData() }
    })
  }

  edit = (i: any) => {
    const drawer = this.drawer.create({
      nzTitle: '编辑Banner公告',
      nzContent: BannerFormComponent,
      nzContentParams: { editData: i },
      nzWidth: '80%',
      nzMaskClosable: false,
      nzKeyboard: false
    });

    drawer.afterClose.subscribe(res => {
      if (res) { this.getData() }
    })
  }

  del = (i: any) => {
    this.modal.confirm({
      nzTitle: '确定删除吗?',
      nzContent: '删除后数据将无法恢复',
      nzOnOk: () => {
        return new Promise(resolve => {
          this.http.delete(`/admin/banners/${i.id}`).subscribe(res => {
            resolve(true);
            this.message.success('删除成功');
            this.getData();
          })
        })
      }
    })
  }

  detail = (i: any) => {
    this.drawer.create({
      nzTitle: '查看Banner公告',
      nzContent: BannerFormComponent,
      nzContentParams: { editData: i, showDetail: true },
      nzWidth: '80%',
    });
  }
  ngOnInit(): void {
    this.getData()
  }
}
