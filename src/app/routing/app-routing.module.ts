
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('../modules/login/login.module').then((m) => m.LoginModule) },
  { path: 'order', loadChildren: () => import('../modules/order/order.module').then((m) => m.OrderModule) },
  { path: 'account', loadChildren: () => import('../modules/account/account.module').then((m) => m.AccountModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
