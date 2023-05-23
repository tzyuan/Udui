import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankCardComponent } from './bank-card/bank-card.component';
import { BankOrderComponent } from './bank-order/bank-order.component';
import { WithdrawalOrderComponent } from './withdrawal-order/withdrawal-order.component';

const routes: Routes = [
  { path: '', redirectTo: 'bank-card',pathMatch:'full' },
  { path: 'bank-card', component: BankCardComponent, data: { breadcrumb: '银行卡管理' } },
  { path: 'bank-order', component: BankOrderComponent, data: { breadcrumb: '银行卡订单' } },
  { path: 'withdrawal-order', component: WithdrawalOrderComponent, data: { breadcrumb: '提现订单' } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
