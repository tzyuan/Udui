import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { RechargeOrderDetailComponent } from '../recharge-order-detail/recharge-order-detail.component';

@Component({
    selector: 'app-recharge-order-list',
    templateUrl: './recharge-order-list.component.html',
    styleUrls: ['./recharge-order-list.component.scss']
})
export class RechargeOrderListComponent implements OnInit {
    constructor(
        private http: HttpClient,
        private drawer: NzDrawerService
    ) { }

    orderData: any[] = [];
    loading = false;
    tabIndex = 0;
    statusData = [
        { title: '全部', value: 'all' },
        { title: '未充值', value: 0, type: 'warning' },
        { title: '待审核', value: 1, type: 'processing' },
        { title: '已驳回', value: 3, type: 'error' },
        { title: '已完成', value: 2, type: 'success' },
    ];
    statusMap: any = {};
    page = {
        index: 1,
        size: 20,
        total: 0
    }
    searchData = {
        merchant_id: '',
        pay_order_no: '',
        app_user: ''
    }
    resetSearch = () => {
        this.searchData = {
            merchant_id: '',
            pay_order_no: '',
            app_user: ''
        }
    }
    search = () => {
        this.page.index = 1;
        this.getData();
    }

    getData = () => {
        this.loading = true;
        let params: any = {
            status: this.statusData[this.tabIndex].value,
            page: this.page.index
        }
        if (this.tabIndex == 0) {
            delete params.status;
        }
        if (this.searchData.merchant_id.trim() != '') {
            params.merchant_id = this.searchData.merchant_id.trim();
        }
        if (this.searchData.pay_order_no.trim() != '') {
            params.pay_order_no = this.searchData.pay_order_no.trim();
        }
        if (this.searchData.app_user.trim() != '') {
            params.app_user = this.searchData.app_user.trim();
        }


        this.http.get<any>(`/admin/recharge-orders`, { params }).subscribe({
            next: (res) => {
                this.loading = false;
                this.orderData = res.list.map((item: any) => {
                    item.uAmount = (Number(item.amount) / Number(item.exchange_rate)).toFixed(4);
                    return item;
                });
                this.page.index = res.page;
                this.page.total = parseInt(res.count);

            }
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
    showDetail = (order: any) => {
        const detail = this.drawer.create({
            nzTitle: '订单详情',
            nzWidth: '80%',
            nzContent: RechargeOrderDetailComponent,
            nzContentParams: {
                id: order.id,
                statusMap: this.statusMap
            }
        });
        detail.afterClose.subscribe(res => {
            if (res === true) {
                this.getData()
            }
        })
    }

    ngOnInit(): void {
        this.getData();
        this.statusData.forEach(item => {
            this.statusMap[item.value] = item;
        })
    }
}
