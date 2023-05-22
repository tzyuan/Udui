import { Component } from '@angular/core';

@Component({
  selector: 'app-bank-card-order-list',
  templateUrl: './bank-card-order-list.component.html',
  styleUrls: ['./bank-card-order-list.component.scss']
})
export class BankCardOrderListComponent {
  orderData: BankOrder[] = [];
}
