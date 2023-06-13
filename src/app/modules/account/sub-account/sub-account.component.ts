import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddSubAccountComponent } from '../add-sub-account/add-sub-account.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-sub-account',
  templateUrl: './sub-account.component.html',
  styleUrls: ['./sub-account.component.scss']
})
export class SubAccountComponent implements OnInit {
  subAccount='';
  subAaccountData: any = [];
  permissionData: { label: string, value: string, checked: boolean }[] = [];
  loading = true;
  constructor(
    private http: HttpClient,
    private modal: NzModalService,
    private message: NzMessageService
  ) { }

  addSubAccount = () => {
    this.modal.create({
      nzTitle: '添加账号',
      nzContent: AddSubAccountComponent,
      nzComponentParams: { permissionData: this.permissionData },
      nzOnOk: (data) => {
        Object.values(data.form.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
        if (data.form.valid) {
          let roleData: number[] = [];
          if (data.form.value.role) {
            roleData = data.form.value.role.filter(role => role.checked).map(role => Number(role.value));
          }
          if (roleData.length === 0) {

            this.message.error('请选择权限');
            return false;
          }

          return new Promise((resolve, reject) => {
            this.http.post<any>('/admin/user/add', {
              username: data.form.value.username,
              password: data.form.value.password,
              role: roleData,
              merchant_id: data.form.value.merchant_id,
            }).subscribe({
              next: (res) => {
                resolve(true);
                this.getList();
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
    this.http.get('/admin/users').subscribe({
      next: (res) => {
        this.subAaccountData = res;
        this.loading = false;
      }
    })
  }
  ngOnInit(): void {
    this.getList();
    this.http.get<any>('/admin/user/permission-list').subscribe({
      next: (res) => {
        for (const i in res) {
          if (Object.prototype.hasOwnProperty.call(res, i)) {
            this.permissionData = [...this.permissionData, {
              label: res[i], value: i, checked: false
            }]
          }
        }
      }
    })
  }
}
