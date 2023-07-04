import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-invite-code',
  templateUrl: './invite-code.component.html',
  styleUrls: ['./invite-code.component.scss']
})
export class InviteCodeComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private modal: NzModalService,
    private message: NzMessageService,
    private common: CommonService,
  ) { }
  data: any[] = [];
  loading = false;
  num = 10;
  tabIndex = 0;
  tabs = [
    { title: '未使用', value: 0 },
    { title: '已使用', value: 1 },
  ];
  donwLoadLoading = false;
  getData = () => {
    this.loading = true;
    const status = this.tabs[this.tabIndex].value;
    this.http.get<any[]>(`/admin/user-invite-codes?is_used=${status}`).subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    })
  }
  createCode = (telContent: TemplateRef<{}>) => {
    this.modal.create({
      nzTitle: '生成邀请码',
      nzContent: telContent,
      nzOnOk: () => {
        if (this.num <= 0) {
          this.message.error('至少创建1个邀请码');
          return false;
        } else {
          return new Promise((resolve, reject) => {
            this.http.post(`/admin/user-invite-codes`, {
              num: this.num
            }).subscribe({
              next: (res) => {
                this.getData();
                resolve(true);
              },
              error: (err) => {
                reject(false);
              }
            })
          })
        }
      }
    })
  }
  downloadCode = () => {
    this.donwLoadLoading = true;
    this.http.get('/admin/user-invite-code/export?is_used=0', {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    }).subscribe(res => {
      this.donwLoadLoading = false;
      // 下载类型 xls
      const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      // 下载类型：csv
      const blob = new Blob([res], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      // 打开新窗口方式进行下载
      window.open(url);
    })
  }
  ngOnInit(): void {
    this.getData();
  }

}
