import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { BankCardComponent } from './bank-card/bank-card.component';
import { BankOrderComponent } from './bank-order/bank-order.component';
import { WithdrawalOrderComponent } from './withdrawal-order/withdrawal-order.component';
import { BankOrderEditComponent } from './bank-order-edit/bank-order-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BankCardComponent,
    BankOrderComponent,
    WithdrawalOrderComponent,
    BankOrderEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
