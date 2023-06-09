import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddSubAccountComponent } from '../../account/add-sub-account/add-sub-account.component';

@Component({
  selector: 'app-merchant-account',
  templateUrl: './merchant-account.component.html',
  styleUrls: ['./merchant-account.component.scss']
})
export class MerchantAccountComponent {
  subAccount = '';
  subAaccountData: any = [];
  permissionData: { label: string, value: string, checked: boolean }[] = [];
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
      nzOnOk: (data) => {
        Object.values(data.form.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
        if (data.form.valid) {
          // let roleData: number[] = [];
          // if (data.form.value.role) {
          //   roleData = data.form.value.role.filter(role => role.checked).map(role => Number(role.value));
          // }
          // if (roleData.length === 0) {
          //   this.message.error('请选择权限');
          //   return false;
          // }

          return new Promise((resolve, reject) => {
            this.http.post<any>('/admin/user/add', {
              username: data.form.value.username,
              password: data.form.value.password,
              role: data.form.value.role
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
