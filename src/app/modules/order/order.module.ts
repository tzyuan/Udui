import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { BankCardComponent } from './bank-card/bank-card.component';
import { BankOrderComponent } from './bank-order/bank-order.component';
import { WithdrawalOrderComponent } from './withdrawal-order/withdrawal-order.component';
import { BankOrderEditComponent } from './bank-order-edit/bank-order-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BankOrderBatchComponent } from './bank-order-batch/bank-order-batch.component';
import { BankOrderBatchBankCardComponent } from './bank-order-batch-bank-card/bank-order-batch-bank-card.component';
import { FundTypeSettingComponent } from './fund-type-setting/fund-type-setting.component';


@NgModule({
  declarations: [
    BankCardComponent,
    BankOrderComponent,
    WithdrawalOrderComponent,
    BankOrderEditComponent,
    BankOrderBatchComponent,
    BankOrderBatchBankCardComponent,
    FundTypeSettingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
