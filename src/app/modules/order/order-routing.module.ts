import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithdrawOrderListComponent } from './withdraw-order-list/withdraw-order-list.component';
import { BankCardOrderListComponent } from './bank-card-order-list/bank-card-order-list.component';
import { BankCardOrderFormComponent } from './bank-card-order-form/bank-card-order-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'bankCardOrder', pathMatch: 'full' },
  { path: 'AddBankCardOrder', component: BankCardOrderFormComponent },
  { path: 'EditBankCardOrder/:id', component: BankCardOrderFormComponent },
  { path: 'bankCardOrder', component: BankCardOrderListComponent },
  { path: 'withdrawOrder', component: WithdrawOrderListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderModuleRoutingModule { }
