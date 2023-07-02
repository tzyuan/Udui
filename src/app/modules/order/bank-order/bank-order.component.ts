import { Component, OnInit, TemplateRef } from '@angular/core';
import * as moment from 'moment';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { BankOrderBatchComponent } from '../bank-order-batch/bank-order-batch.component';
import { HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin } from 'rxjs';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
@Component({
  selector: 'app-bank-order',
  templateUrl: './bank-order.component.html',
  styleUrls: ['./bank-order.component.scss']
})
export class BankOrderComponent implements OnInit {
  constructor(
    private drawer: NzDrawerService,
    private http: HttpClient,
    private modal: NzModalService,
    private message: NzMessageService,
    private cookies: CookiesService,
    private common: CommonService,

  ) { }


  orderData: any[] = [];
  showOrderData: any[] = [];
  loading = false;
  detailLoading = false;
  tabIndex = 0;
  min = '';
  max = '';
  msgId = '';
  tabs = [
    { title: '待接单', value: 1 },
    { title: '待支付', value: 2 },
    { title: '已完成', value: 3 },
    { title: '已取消', value: 4 },
  ];
  tabs2 = [
    { title: '待审核', value: 0 },
    { title: '待接单', value: 1 },
    { title: '待支付', value: 2 },
    { title: '已完成', value: 3 },
    { title: '已取消', value: 4 },
  ]
  isMerchant = this.common.isMerchant();
  orderType = this.isMerchant;

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
    const status = this.orderType ? this.tabs2[this.tabIndex].value : this.tabs[this.tabIndex].value;
    this.http.get<any>('/admin/bank-card-orders?status=' + status).subscribe({
      next: (res) => {
        this.loading = false;
        this.orderData = res;
        this.filterList();
      },
      error: (err) => {
        this.loading = false;
      },
    })
  }
  filterList = () => {
    if (this.orderType) {
      this.showOrderData = this.orderData.filter(item => item.merchant_id != 0)
    } else {
      this.showOrderData = this.orderData.filter(item => item.merchant_id == 0)
    }
  }
  changeMerchant = () => {
    this.tabIndex = 0;
    this.getList();
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
  // 审核/拒绝
  merchantExamine = (order: any, status: 1 | 2) => {
    this.modal.confirm({
      nzTitle: status == 1 ? '通过审核' : '驳回订单',
      nzContent: status == 1 ? '确定将这笔订单通过审核吗?' : '确定驳回这笔订单吗?',
      nzOkText: status == 1 ? '通过' : '驳回',
      nzOkDanger: status == 2,
      nzOnOk: () => {
        return new Promise((resolve, reject) => {
          this.http.patch(`/admin/bank-card-orders/${order.id}`, { status: status }).subscribe({
            next: () => {
              this.message.success('审核成功');
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
    let modalParasm = {}
  }
  ngOnInit(): void {
    this.getList();
  }
}
