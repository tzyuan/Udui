import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RechargeOrderRoutingModule } from './recharge-order-routing.module';
import { RechargeOrderListComponent } from './recharge-order-list/recharge-order-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RechargeOrderListComponent
  ],
  imports: [
    CommonModule,
    RechargeOrderRoutingModule,
    SharedModule
  ]
})
export class RechargeOrderModule { }
