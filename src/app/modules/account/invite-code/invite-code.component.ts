import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

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
  ) { }
  data: any[] = [];
  loading = false;
  num = 10;
  tabIndex = 0;
  tabs = [
    { title: '未使用', value: 0 },
    { title: '已使用', value: 1 },
  ];
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
  ngOnInit(): void {
    this.getData();
  }

}
