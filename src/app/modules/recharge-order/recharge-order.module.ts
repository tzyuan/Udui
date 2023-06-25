import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RechargeOrderRoutingModule } from './recharge-order-routing.module';
import { RechargeOrderListComponent } from './recharge-order-list/recharge-order-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RechargeOrderDetailComponent } from './recharge-order-detail/recharge-order-detail.component';


@NgModule({
  declarations: [
    RechargeOrderListComponent,
    RechargeOrderDetailComponent
  ],
  imports: [
    CommonModule,
    RechargeOrderRoutingModule,
    SharedModule
  ]
})
export class RechargeOrderModule { }
