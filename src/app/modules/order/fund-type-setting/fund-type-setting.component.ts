import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-fund-type-setting',
  templateUrl: './fund-type-setting.component.html',
  styleUrls: ['./fund-type-setting.component.scss']
})
export class FundTypeSettingComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private modal: NzModalService,
    private message: NzMessageService,
    private common: CommonService,
  ) { }
  data: any[] = [];
  loading = false;
  newData = {
    name: '',
    rate: ''
  }
  getData = () => {
    this.loading = true;
    this.http.get<any[]>('/admin/conf/funds').subscribe({
      next: (res) => {
        this.data = res.map(item => {
          item.attr2 = Number(item.attr2);
          return item;
        });
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    })
  }
  edit = (value: string, key: string, item: any) => {
    this.loading = true;
    this.http.post('/admin/conf/fund-edit', {
      id: item.id,
      name: item.attr1,
      rate: item.attr2
    }).subscribe({
      next: (res) => {
        this.message.success('修改成功');
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;

      }
    })
  }
  del = (item: any) => {
    this.modal.confirm({
      nzTitle: '确认删除吗?',
      nzContent: '确认后数据将被删除!',
      nzOnOk: () => {
        return new Promise((resolve, reject) => {
          this.http.post('/admin/conf/fund-delete', { id: item.id }).subscribe({
            next: (res) => {
              resolve(true);
              this.message.success('删除成功');
              this.getData()
            },
            error: (err) => {
              reject(false);
            }
          })
        })
      }
    })
  }
  add = (telContent: TemplateRef<{}>) => {
    this.modal.create({
      nzTitle: '新增资金类型',
      nzContent: telContent,
      nzOnOk: () => {
        if (this.newData.name.trim() == '' || this.newData.rate.trim() == '' || this.common.countDecimalPlaces(this.newData.rate) > 4) {
          this.message.error('请输入正确的内容');
          return false;
        } else {
          return new Promise((resolve, reject) => {
            this.http.post('/admin/conf/fund-add', this.newData).subscribe({
              next: (res) => {
                resolve(true);
                this.message.success('添加成功');
                this.getData()
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
