import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-bank-card',
  templateUrl: './bank-card.component.html',
  styleUrls: ['./bank-card.component.scss']
})
export class BankCardComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private modal: NzModalService,
    private message: NzMessageService,
  ) { }
  loading = false;
  bankCardData: any[] = [];
  addForm = this.fb.group({
    account_name: [null, [Validators.required]],
    bank_name: [null, [Validators.required]],
    card_no: [null, [Validators.required]],
    bank_address: [null, [Validators.required]],
    memo: [null],
  });
  getList = () => {
    this.loading = true;
    this.http.get<any>('/admin/bank-cards').subscribe({
      next: (res) => {
        this.loading = false;
        this.bankCardData = res;
      },
      error: (err) => {
        this.loading = false;

      }
    })
  }
  // 创建银行卡
  createBankCard = (tplContent: TemplateRef<{}>) => {
    this.addForm.reset();
    this.modal.create({
      nzTitle: '添加银行卡',
      nzContent: tplContent,
      nzOnOk: () => {
        Object.values(this.addForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
        if (!this.addForm.valid) {
          return false;
        }
        return new Promise((resolve, reject) => {
          this.http.post('/admin/bank-card/create', this.addForm.value).subscribe({
            next: () => {
              this.message.success('添加成功');
              this.getList();
              resolve(true);
            },
            error: () => {
              reject(false);
            }
          })
        })
      }
    })
  }
  // 删除银行卡
  delBankCard = (bankCard: any, tplContent: TemplateRef<{}>) => {
    this.modal.confirm({
      nzTitle: '确认删除这张银行卡吗?',
      nzContent: tplContent,
      nzComponentParams: {
        bankCard
      },
      nzOnOk: () => {
        return new Promise((resolve, reject) => {
          this.http.delete(`/admin/bank-cards/${bankCard.id}`).subscribe({
            next: (res) => {
              this.message.success('删除成功');
              this.getList();
              resolve(true);
            },
            error: (err) => { reject(false) },
          })
        })
      }
    })
  }
  // 改变银行卡状态
  statusChange = (bankCard: any) => {
    bankCard.loading = true;
    const newStatus = bankCard.status === 1 ? 0 : 1;
    this.http.patch(`/admin/bank-cards/${bankCard.id}`, { status: newStatus }).subscribe({
      next: (res) => {
        bankCard.loading = false;
        bankCard.status = newStatus;
        this.message.success('修改成功');
        // this.getList();
      },
      error: (error) => {
        bankCard.loading = false;
      }
    })
  }
  ngOnInit(): void {
    this.getList();
  }
}
