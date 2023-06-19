import { Component, OnInit, TemplateRef } from '@angular/core';
import * as moment from 'moment';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { BankOrderBatchComponent } from '../bank-order-batch/bank-order-batch.component';
import { HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-bank-order',
  templateUrl: './bank-order.component.html',
  styleUrls: ['./bank-order.component.scss']
})
export class BankOrderComponent implements OnInit {

  orderData: any = [];
  loading = false;
  detailLoading = false;
  min = '';
  max = '';
  msgId = '';
  constructor(
    private drawer: NzDrawerService,
    private http: HttpClient,
    private modal: NzModalService,
    private message: NzMessageService,
  ) { }
  createOrder = () => {
    const createDrawer = this.drawer.create({
      nzTitle: '创建银行卡订单',
      nzContent: BankOrderBatchComponent,
      nzWidth: '90%',
      nzMaskClosable: false,
      nzKeyboard: false,
      nzClosable: false
    });
    createDrawer.afterClose.subscribe(res => {
      if (res === 'submit') {
        this.getList();
      }
    })
  }

  getList = () => {
    this.loading = true;
    this.http.get('/admin/bank-card-orders').subscribe({
      next: (res) => {
        this.loading = false;
        this.orderData = res;
      },
      error: (err) => {
        this.loading = false;
      },
    })
  }
  showDetail = (tplContent: TemplateRef<{}>, order: any) => {
    this.detailLoading = true;
    this.message.remove(this.msgId);
    this.msgId = this.message.loading('详情加载中', { nzDuration: 0 }).messageId;
    forkJoin([
      this.http.get<any>(`/admin/bank-cards/${order.bank_card_id}`),
      this.http.get<any>(`/admin/users/${order.operator}`)
    ]).subscribe(res => {
      const [cardInfo, userInfo] = res;
      this.detailLoading = false;
      this.message.remove(this.msgId);
      this.modal.create({
        nzTitle: '订单详情',
        nzWidth: 1000,
        nzContent: tplContent,
        nzComponentParams: {
          orderInfo: order,
          cardInfo,
          userInfo
        }
      });
    })


  }
  ngOnInit(): void {
    this.getList();
    // for (let i = 0; i < 35; i++) {
    //   this.orderData = [...this.orderData, {
    //     order_no: (Math.random() * 100000000000000000).toFixed(0),
    //     bank_card_id: '建设银行',
    //     amount: parseInt((Math.random() * 20000).toFixed(0)),
    //     only_private: Math.random() > 0.5,
    //     only_single: Math.random() > 0.5,
    //     need_receipt: Math.random() > 0.5,
    //     memo: '备注xxxxxxxx',
    //     status: parseInt((Math.random() * 4).toFixed(0)),
    //     create_time: moment().format('YYYY-MM-DD HH:mm:ss')
    //   }]
    // }
  }
}
