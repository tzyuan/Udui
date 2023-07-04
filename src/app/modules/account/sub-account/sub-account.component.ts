import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddSubAccountComponent } from '../add-sub-account/add-sub-account.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sub-account',
  templateUrl: './sub-account.component.html',
  styleUrls: ['./sub-account.component.scss']
})
export class SubAccountComponent implements OnInit {
  subAccount = '';
  subAaccountData: any = [];
  showSubAaccountData: any = [];
  permissionData: any[] = [];
  loading = true;
  constructor(
    private http: HttpClient,
    private modal: NzModalService,
    private message: NzMessageService
  ) { }

  addSubAccount = (googleQrCodeTmp: TemplateRef<{}>) => {
    this.modal.create({
      nzTitle: '添加账号',
      nzContent: AddSubAccountComponent,
      nzComponentParams: { permissionData: this.permissionData },
      nzWidth: 800,
      nzOnOk: (data) => {
        Object.values(data.form.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
        const permission = data.permissionData.filter(item => item.checked).map(item => item.value);
        if (permission.length == 0) {
          this.message.error('请选择权限');
          return false;
        }
        if (data.form.valid) {
          return new Promise((resolve, reject) => {
            this.http.post<any>('/admin/user/add', {
              username: data.form.value.username,
              password: data.form.value.password,
              role: data.form.value.role,
              permission: permission.join(',')
            }).subscribe({
              next: (res) => {
                this.modal.create({
                  nzTitle: '绑定谷歌验证器',
                  nzContent: googleQrCodeTmp,
                  nzComponentParams: {
                    code: res.secret_key,
                    src: res.qr_code_url
                  },
                  nzCancelText: null,
                  nzClosable: false,
                  nzKeyboard: false,
                  nzMaskClosable: false,
                  nzOkText: '已经绑定',
                  nzOkDanger: true,
                });
                resolve(true);
                // this.getList();
              },
              error: (error) => {
                reject(error);
              }
            })
          })
        }
        return false;
      }
    })
  }

  getList = () => {
    this.loading = true;
    this.http.get('/admin/users').subscribe(res => {
      this.subAaccountData = res;
      this.showSubAaccountData = this.subAaccountData;
      this.loading = false;
    })
  }

  edit = (item: any) => {
    const self = this;
    this.modal.create({
      nzTitle: '编辑权限',
      nzContent: AddSubAccountComponent,
      nzComponentParams: { permissionData: JSON.parse(JSON.stringify(this.permissionData)), isEdit: true, adminInfo: item },
      nzWidth: 800,
      nzOnOk: (data) => {
        const permission = data.permissionData.filter(item => item.checked).map(item => item.value);
        if (permission.length == 0) {
          this.message.error('请选择权限');
          return false;
        }
        return new Promise((resolve, reject) => {
          this.http.post<any>('/admin/user/edit-permission', {
            user_id: item.id,
            permission: permission.join(',')
          }).subscribe({
            next: (res) => {
              self.getList();
              resolve(true);
            },
            error: (error) => {
              reject(error);
            }
          })
        })
      }
    })
  }
  ngOnInit(): void {
    forkJoin([
      this.http.get('/admin/users'),
      this.http.get<any[]>('/admin/user/permission-list')
    ]).subscribe({
      next: (resArr) => {
        console.log(resArr);
        this.subAaccountData = resArr[0];
        this.showSubAaccountData = this.subAaccountData;
        this.permissionData = resArr[1].map(item => {
          return {
            label: item.title, value: item.id, url: item.url, checked: false
          }
        })
        this.loading = false;
      }
    })
  }
}
