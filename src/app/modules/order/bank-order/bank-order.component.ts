import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-bank-order',
  templateUrl: './bank-order.component.html',
  styleUrls: ['./bank-order.component.scss']
})
export class BankOrderComponent implements OnInit {

  orderData: any = [];
  min = '';
  max = '';
  constructor() { }
  ngOnInit(): void {
    for (let i = 0; i < 35; i++) {
      this.orderData = [...this.orderData, {
        order_no: (Math.random() * 100000000000000000).toFixed(0),
        bank_card_id: '建设银行',
        amount: parseInt((Math.random() * 20000).toFixed(0)),
        only_private: Math.random() > 0.5,
        only_single: Math.random() > 0.5,
        need_receipt: Math.random() > 0.5,
        memo: '备注xxxxxxxx',
        status: parseInt((Math.random() * 4).toFixed(0)),
        create_time: moment().format('YYYY-MM-DD HH:mm:ss')
      }]
    }
  }
}
