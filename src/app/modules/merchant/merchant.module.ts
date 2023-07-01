import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { MerchantAccountComponent } from './merchant-account/merchant-account.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MerchantOrderComponent } from './merchant-order/merchant-order.component';


@NgModule({
  declarations: [
    MerchantAccountComponent,
    MerchantOrderComponent
  ],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    SharedModule
  ]
})
export class MerchantModule { }
