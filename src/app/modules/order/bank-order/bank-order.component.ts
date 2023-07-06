import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { BankOrderBatchComponent } from '../bank-order-batch/bank-order-batch.component';
import { HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as moment from 'moment';
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
    { title: '已驳回', value: 5 },
  ]
  isMerchant = this.common.isMerchant();
  orderType = this.isMerchant;
  fundTypeData: any[] = [];
  page = {
    index: 1,
    size: 20,
    total: 0
  }
  searchData: {
    user: string;
    order_id: string;
    fund_type: number | null;
    range: (Date | null)[];
  } = {
      user: '',
      order_id: '',
      fund_type: null,
      range:[]
    }
  resetSearch = () => {
    this.searchData = {
      user: '',
      order_id: '',
      fund_type: null,
      range:[]
    }
  }
  search = () => {
    this.page.index = 1;
    this.getData();
  }

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
        this.getData();
      }
    })
  }
  getData = () => {
    this.loading = true;
    const status = this.orderType ? this.tabs2[this.tabIndex].value : this.tabs[this.tabIndex].value;
    let params: any = {
      status,
      page: this.page.index
    }

    if (this.searchData.order_id.trim() != '') {
      params.order_no = this.searchData.order_id.trim();
    }
    if (this.searchData.fund_type != null) {
      params.fund_type = this.searchData.fund_type;
    }
    if (this.searchData.range[0] != null && this.searchData.range[1] != null) {
      params.start_date = moment(this.searchData.range[0]).format('YYYY-MM-DD');
      params.end_date = moment(this.searchData.range[1]).format('YYYY-MM-DD');
    }


    this.http.get<any>('/admin/bank-card-orders', { params }).subscribe({
      next: (res) => {
        this.loading = false;
        this.orderData = res.list;
        this.page.index = res.page;
        this.page.total = parseInt(res.count);
        this.showOrderData = this.orderData;
        this.filterList();
      },
      error: (err) => {
        this.loading = false;
      },
    })
  }
  tabChange = (e: any) => {
    this.tabIndex = e.index;
    this.page.index = 1;
    this.page.total = 0;
    this.resetSearch();
    this.getData();
  }
  pageIndexChange = (e: any) => {
    this.page.index = e;
    this.getData();
  }
  filterList = () => {
    if (this.orderType) {
      this.showOrderData = this.orderData.filter(item => item.merchant_id != 1)
    } else {
      this.showOrderData = this.orderData.filter(item => item.merchant_id == 1)
    }
  }
  changeMerchant = () => {
    this.tabIndex = 0;
    this.page.index = 1;
    this.page.total = 0;
    this.getData();
  }
  showDetail = (tplContent: TemplateRef<{}>, order: any) => {
    this.detailLoading = true;
    this.message.remove(this.msgId);
    this.msgId = this.message.loading('详情加载中', { nzDuration: 0 }).messageId;
    this.http.get<any>(`/admin/bank-card-orders/${order.id}`).subscribe(res => {
      this.detailLoading = false;
      this.message.remove(this.msgId);
      console.log(res);
      this.modal.create({
        nzTitle: '订单详情',
        nzWidth: 1000,
        nzContent: tplContent,
        nzComponentParams: {
          orderInfo: order,
          cardInfo: res,
        }
      });
    })

  }
  // 审核/拒绝
  merchantExamine = (order: any, status: 1 | 5) => {
    this.modal.confirm({
      nzTitle: status == 1 ? '通过审核' : '驳回订单',
      nzContent: status == 1 ? '确定将这笔订单通过审核吗?' : '确定驳回这笔订单吗?',
      nzOkText: status == 1 ? '通过' : '驳回',
      nzOkDanger: status == 5,
      nzOnOk: () => {
        return new Promise((resolve, reject) => {
          this.http.patch(`/admin/bank-card-orders/${order.id}`, { status: status }).subscribe({
            next: () => {
              this.message.success('审核成功');
              this.getData();
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
    this.getData();
    this.http.get<any>('/admin/conf/funds').subscribe(res => {
      this.fundTypeData = res.map((item: any) => {
        return {
          label: item.attr1,
          value: item.id
        }
      })
    });
  }
}
