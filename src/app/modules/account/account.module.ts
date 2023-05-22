import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPayPasswordComponent } from './reset-pay-password/reset-pay-password.component';
import { ChildrenAccountComponent } from './children-account/children-account.component';


@NgModule({
  declarations: [
    ResetPasswordComponent,
    ResetPayPasswordComponent,
    ChildrenAccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
