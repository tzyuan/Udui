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
  memo = '';
  tabIndex = 0;
  tabs = [
    { title: '待转账', value: 0 },
    { title: '已转账', value: 1 },
    { title: '已驳回', value: 2 },
  ];
  constructor(
    private http: HttpClient,
    private modal: NzModalService,
    private message: NzMessageService,
  ) {

  }

  getData = () => {
    this.loading = true;
    const status=this.tabs[this.tabIndex].value
    this.http.get<any>(`/admin/cash-orders`).subscribe({
      next: (res) => {
        this.loading = false;
        this.orderData = res;
        this.showOrderData = this.orderData;
      }
    })
  }
  deal = (order: any) => {
    order.loading = true;
    this.message.loading('确认中...');
    this.http.post('/admin/cash-order/deal', {
      status: 1,
      cash_order_no: order.cash_order_no,
    }).subscribe({
      next: (res) => {
        order.loading = false;
        this.message.success('确认成功');
      },
      error: (err) => {
        order.loading = false;
      }
    })
  }
  dealFail = (order: any, telContent: TemplateRef<{}>) => {
    this.memo = '';
    this.modal.create({
      nzTitle: '请输入驳回原因',
      nzContent: telContent,
      nzOkText: '驳回',
      nzOnOk: () => {
        if (this.memo.trim() == '') {
          this.message.warning('请输入驳回原因')
          return false;
        }
        return new Promise((resolve, reject) => {
          this.http.post('/admin/cash-order/deal', {
            status: 2,
            memo: this.memo,
            cash_order_no: order.cash_order_no
          }).subscribe({
            next: (res) => {
              this.message.success('驳回成功');
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
