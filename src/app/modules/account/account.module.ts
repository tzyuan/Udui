import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPayPasswordComponent } from './reset-pay-password/reset-pay-password.component';
import { SubAccountComponent } from './sub-account/sub-account.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddSubAccountComponent } from './add-sub-account/add-sub-account.component';
import { InviteCodeComponent } from './invite-code/invite-code.component';
import { GoogleQrcodeComponent } from './google-qrcode/google-qrcode.component';


@NgModule({
  declarations: [
    ResetPasswordComponent,
    ResetPayPasswordComponent,
    SubAccountComponent,
    AddSubAccountComponent,
    InviteCodeComponent,
    GoogleQrcodeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
