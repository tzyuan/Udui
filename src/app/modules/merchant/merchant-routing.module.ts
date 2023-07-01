import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantAccountComponent } from './merchant-account/merchant-account.component';
import { MerchantOrderComponent } from './merchant-order/merchant-order.component';

const routes: Routes = [
  { path: '', redirectTo: 'merchant-account',pathMatch:'full' },
  { path: 'merchant-account', component: MerchantAccountComponent, data: { breadcrumb: '商户账号' } },
  { path: 'merchant-order', component: MerchantOrderComponent, data: { breadcrumb: '商户订单' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule { }
