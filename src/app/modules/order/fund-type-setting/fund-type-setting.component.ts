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
  del_one_code = '';
  newData = {
    name: '',
    rate: '',
    one_code: ''
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
  edit = (item: any, telContent: TemplateRef<{}>) => {
    this.newData = {
      name: item.attr1,
      rate: `${item.attr2}`,
      one_code: ''
    }
    this.modal.create({
      nzTitle: '编辑资金类型',
      nzContent: telContent,
      nzOnOk: () => {
        if (this.newData.name.trim() == '' || this.newData.rate.trim() == '' || this.common.countDecimalPlaces(this.newData.rate) > 4 || this.newData.one_code.trim() == '') {
          this.message.error('请输入正确的内容');
          return false;
        } else {
          return new Promise((resolve, reject) => {
            this.http.post('/admin/conf/fund-edit', {
              id: item.id,
              name: this.newData.name,
              rate: this.newData.rate,
              one_code: this.newData.one_code
            }).subscribe({
              next: (res) => {
                resolve(true);
                this.message.success('修改成功');
                this.getData()
              },
              error: (err) => {
                resolve(false);
              }
            })
          })
        }
      }
    })
  }
  del = (item: any, telContent: TemplateRef<{}>) => {
    this.del_one_code = '';
    this.modal.confirm({
      nzTitle: '确认删除吗?',
      nzContent: telContent,
      nzOnOk: () => {
        return new Promise((resolve, reject) => {
          this.http.post('/admin/conf/fund-delete', { id: item.id, one_code: this.del_one_code }).subscribe({
            next: (res) => {
              resolve(true);
              this.message.success('删除成功');
              this.getData()
            },
            error: (err) => {
              resolve(false);
            }
          })
        })
      }
    })
  }
  add = (telContent: TemplateRef<{}>) => {
    this.newData = {
      name: '',
      rate: '',
      one_code: ''
    }
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
