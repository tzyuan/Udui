import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderModuleRoutingModule } from './order-routing.module';
import { BankCardOrderListComponent } from './bank-card-order-list/bank-card-order-list.component';
import { WithdrawOrderListComponent } from './withdraw-order-list/withdraw-order-list.component';
import { BankCardOrderFormComponent } from './bank-card-order-form/bank-card-order-form.component';
import { NzModule } from 'src/app/shared/nz.module';


@NgModule({
  declarations: [
    BankCardOrderListComponent,
    WithdrawOrderListComponent,
    BankCardOrderFormComponent
  ],
  imports: [
    CommonModule,
    NzModule,
    OrderModuleRoutingModule
  ]
})
export class OrderModule { }
