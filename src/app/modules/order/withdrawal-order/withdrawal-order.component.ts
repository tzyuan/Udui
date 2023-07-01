import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-withdrawal-order',
  templateUrl: './withdrawal-order.component.html',
  styleUrls: ['./withdrawal-order.component.scss']
})
export class WithdrawalOrderComponent implements OnInit {

  orderData: any[] = [];
  showOrderData: any[] = [];
  loading = false;
  one_code = '';
  constructor(
    private http: HttpClient,
    private modal: NzModalService,
    private message: NzMessageService,
  ) {

  }

  getData = () => {
    this.loading = true;
    this.http.get<any>('/admin/cash-orders').subscribe({
      next: (res) => {
        this.loading = false;
        this.orderData = res;
        this.showOrderData = this.orderData;
      }
    })
  }
  deal = (order: any, telContent: TemplateRef<{}>) => {
    this.one_code = '';
    this.modal.create({
      nzTitle: '请输入谷歌验证码',
      nzContent: telContent,
      nzOkText: '确定',
      nzOnOk: () => {
        if (this.one_code.trim() == '') {
          this.message.warning('请输入谷歌验证码')
          return false;
        }
        return new Promise((resolve, reject) => {
          this.http.post('/admin/cash-order/deal', {
            status: 1,
            cash_order_no: order.cash_order_no,
            one_code: this.one_code
          }).subscribe({
            next: (res) => {
              this.message.success('确认成功');
              resolve(true)
            },
            error: (err) => {
              reject(false)
            }
          })
        })
      }
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}
