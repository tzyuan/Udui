import { Component, OnInit, ViewChild } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-bank-order-batch',
  templateUrl: './bank-order-batch.component.html',
  styleUrls: ['./bank-order-batch.component.scss']
})
export class BankOrderBatchComponent implements OnInit {
  @ViewChild('bankCard') bankCard: any;

  constructor(
    private drawerRef: NzDrawerRef,
    private fb: FormBuilder,
    private message: NzMessageService,
    private http: HttpClient,
  ) { }
  // 银行卡订单
  orderData: any[] = [];
  submitLoading = false;
  basedataLoading = true;
  fundTypeData = [
    { label: '大混资金', value: 1 },
    { label: 'BC资金', value: 2 },
    { label: '常规资金', value: 3 }
  ]
  pwdForm = this.fb.group({
    googleCode: [null, [Validators.required]]
  });
  del = (order: any) => {
    this.orderData = this.orderData.filter(item => item.bank_card_id !== order.bank_card_id);
  }
  submit = () => {
    let isError = false;
    this.orderData.forEach(order => {
      order.amount = order.amount ? order.amount : 0;
      if (order.amount === 0) { isError = true; }
      if (!order.fund_type) { isError = true; }
    });

    if (!isError) {
      let orderPost: Observable<any>[] = [];
      this.submitLoading = true;
      // 生成银行卡订单请求
      this.orderData.forEach(order => {
        const postData = {
          bank_card_id: order.bank_card_id,
          amount: order.amount,
          fund_type: order.fund_type,
          only_private: order.only_private ? 1 : 0,
          only_single: order.only_single ? 1 : 0,
          need_receipt: order.need_receipt ? 1 : 0,
          memo: order.memo,
          // googleCode: this.pwdForm.value.googleCode,
        }
        console.log(postData);
        orderPost.push(this.http.post('/admin/bank-card-orders', postData))
      });

      // 执行订单
      forkJoin(orderPost).subscribe({
        next: (res) => {
          console.log('res');
          console.log(res);
          this.message.success('创建成功');
          this.drawerRef.close('submit');
          this.submitLoading = false;
        },
        error: (error) => {
          console.log('error');
          console.log(error);
          this.submitLoading = false;
        },
      })

      return;
    }
    Object.values(this.pwdForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
    this.message.error('请检查必填项');
  }
  back = () => {
    this.drawerRef.close('back');
  }
  checkedBankCard = () => {
    // 读取选择的银行卡
    const bankCardData: any[] = this.bankCard.bankCardData;
    console.log(bankCardData);
    const setOfCheckedId = this.bankCard.setOfCheckedId;
    const checkedBankCard = bankCardData.filter(item => setOfCheckedId.has(item.id)).map(item => {
      return {
        bank_card_id: item.id,
        account_name: item.account_name,
        bank_name: item.bank_name,
        card_no: item.card_no,
        bank_address: item.bank_address,
      }
    });
    this.orderData = [];
    this.orderData = [...this.orderData, ...checkedBankCard];
    this.bankCardVisible = false;
  }
  // 选择银行卡
  bankCardVisible = false;



  ngOnInit(): void {
    this.http.get<any>('/admin/conf/funds').subscribe(res => {
      this.basedataLoading = false;
      this.fundTypeData = res.map((item: any) => {
        return {
          label: item.attr1,
          value: item.id
        }
      })
    });
  }
}
