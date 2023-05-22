import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPayPasswordComponent } from './reset-pay-password/reset-pay-password.component';
import { ChildrenAccountComponent } from './children-account/children-account.component';

const routes: Routes = [
  { path: '', redirectTo: 'resetPassword', pathMatch: 'full' },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'resetPayPassword', component: ResetPayPasswordComponent },
  { path: 'childrenAccount', component: ChildrenAccountComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
