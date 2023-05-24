import { Component, OnInit, ViewChild } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { BankOrderBatchBankCardComponent } from '../bank-order-batch-bank-card/bank-order-batch-bank-card.component';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

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
    private message: NzMessageService
  ) { }
  // 银行卡订单
  orderData: any[] = [];
  pwdForm = this.fb.group({
    googleCode: [null, [Validators.required]],
    payPassword: [null, [Validators.required]]
  })
  del = (order: any) => {
    this.orderData = this.orderData.filter(item => item.card_no !== order.card_no);
  }
  submit = () => {
    let isError = false;
    this.orderData.forEach(order => {
      order.amount = order.amount ? order.amount : 0;
      if (order.amount === 0) { isError = true; }
    });

    if (!isError && this.pwdForm.valid) {
      this.drawerRef.close('submit');
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
    const setOfCheckedId = this.bankCard.setOfCheckedId;
    const checkedBankCard = bankCardData.filter(item => setOfCheckedId.has(item.id)).map(item => {
      return {
        account_name: item.account_name,
        bank_name: item.bank_name,
        card_no: item.card_no,
        bank_address: item.bank_address,
      }
    });
    this.orderData = [...this.orderData, ...checkedBankCard];
    this.bankCardVisible = false;
  }
  // 选择银行卡
  bankCardVisible = false;




  ngOnInit(): void {

  }
}
