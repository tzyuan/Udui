import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';

@Component({
  selector: 'app-recharge-order-detail',
  templateUrl: './recharge-order-detail.component.html',
  styleUrls: ['./recharge-order-detail.component.scss']
})
export class RechargeOrderDetailComponent implements OnInit {
  @Input() id: number = 0;
  @Input() statusMap: any = {};

  loading = true;
  orderDetailData: any = {};
  memo = '';
  one_code = '';
  constructor(
    private http: HttpClient,
    private modal: NzModalService,
    private message: NzMessageService,
    private drawerRef: NzDrawerRef<string>,
    private cookies: CookiesService
  ) {
  }

  checkInOrder = (telContent: TemplateRef<{}>) => {
    this.one_code = '';
    this.modal.confirm({
      nzTitle: '审核通过',
      nzContent: telContent,
      nzOkText: '确认通过',
      nzOnOk: () => {
        return new Promise((resolve, reject) => {
          this.http.post('/admin/recharge-order/check', {
            pay_order_id: this.id,
            one_code: this.one_code,
            status: 2
          }).subscribe({
            next: (res) => {
              this.message.success('审核通过');
              this.drawerRef.close(true);
              resolve(true)
            },
            error: (err) => {
              reject(false)
            }
          })
        })
      }
    })

  }
  checkOutOrder = (telContent: TemplateRef<{}>) => {
    this.memo = '';
    this.modal.create({
      nzTitle: '请输入驳回原因',
      nzContent: telContent,
      nzOkDanger: true,
      nzOkText: '驳回',
      nzOnOk: () => {
        if (this.memo.trim() == '') {
          this.message.warning('请输入驳回原因')
          return false;
        }
        return new Promise((resolve, reject) => {
          this.http.post('/admin/recharge-order/check', {
            pay_order_id: this.id,
            status: 3,
            memo: this.memo
          }).subscribe({
            next: (res) => {
              this.message.success('驳回成功');
              this.drawerRef.close(true);
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

  isMineOrder=()=>{
    return this.orderDetailData.merchant_id == this.cookies.getCookie('merchant_id');
  }

  getList = () => {
    this.loading = true;
    this.http.get<any>(`/admin/recharge-orders/${this.id}`).subscribe({
      next: (res) => {
        this.orderDetailData = res[0];
        this.loading = false;
      }
    })
  }
  ngOnInit(): void {
    this.getList();
  }
}
