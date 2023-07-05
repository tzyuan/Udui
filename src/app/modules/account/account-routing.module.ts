import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPayPasswordComponent } from './reset-pay-password/reset-pay-password.component';
import { SubAccountComponent } from './sub-account/sub-account.component';
import { InviteCodeComponent } from './invite-code/invite-code.component';
import { GoogleQrcodeComponent } from './google-qrcode/google-qrcode.component';

const routes: Routes = [
  { path: '', redirectTo: 'reset-password',pathMatch:'full' },
  { path: 'reset-password', component: ResetPasswordComponent, data: { breadcrumb: '修改密码' } },
  { path: 'reset-pay-password', component: ResetPayPasswordComponent, data: { breadcrumb: '修改出款密码' } },
  { path: 'sub-account', component: SubAccountComponent, data: { breadcrumb: '账号管理' } },
  { path: 'invite-code', component: InviteCodeComponent, data: { breadcrumb: '邀请码管理' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
