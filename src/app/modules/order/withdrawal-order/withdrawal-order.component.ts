import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CommonService } from 'src/app/shared/services/common/common.service';
import * as moment from 'moment';
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
  isAdmin = !this.common.isMerchant();
  tabs = [
    { title: '待转账', value: 0 },
    { title: '已转账', value: 1 },
    { title: '已驳回', value: 2 },
  ];
  searchData: {
    user: string;
    order_id: string;
    range: (Date | null)[],
  } = {
      user: '',
      order_id: '',
      range: [],
    }
  constructor(
    private http: HttpClient,
    private modal: NzModalService,
    private message: NzMessageService,
    private common: CommonService
  ) {

  }
  resetSearch = () => {
    this.searchData = {
      user: '',
      order_id: '',
      range: [],
    }
  }
  search = () => {
    this.page.index = 1;
    this.getData()
  }
  page = {
    index: 1,
    size: 20,
    total: 0
  }
  tabChange = (e: any) => {
    console.log(e.index);
    this.tabIndex = e.index;
    this.page.index = 1;
    this.page.total = 0;
    this.getData();
  }
  pageIndexChange = (e: any) => {
    this.page.index = e;
    this.getData();
  }
  getData = () => {
    const status = this.tabs[this.tabIndex].value
    let params: any = {
      status: status,
      page: this.page.index
    };
    if (this.searchData.user.trim() != '') {
      params.username = this.searchData.user;
    }
    if (this.searchData.order_id.trim() != '') {
      params.cash_order_no = this.searchData.order_id;
    }
    if (this.searchData.range[0] != null && this.searchData.range[1] != null) {
      params.start_date = moment(this.searchData.range[0]).format('YYYY-MM-DD');
      params.end_date = moment(this.searchData.range[1]).format('YYYY-MM-DD');
    }


    this.loading = true;
    this.http.get<any>(`/admin/cash-orders`, { params }).subscribe({
      next: (res) => {
        this.loading = false;
        this.orderData = res.list;
        this.page.index = res.page;
        this.page.total = parseInt(res.count);
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
