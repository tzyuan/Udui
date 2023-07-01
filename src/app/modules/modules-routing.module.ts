
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { AuthGuard, ModuleActivate } from '../core/auth/auth.guard';
import { HomeComponent } from '../home/home.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home', component: HomeComponent, data: { breadcrumb: '首页' }, canActivate: [ModuleActivate]
      },
      {
        path: 'system', loadChildren: () => import('./system-module/system-module.module').then(mod => mod.SystemModule),
        data: { breadcrumb: '系统管理' }, canActivate: [ModuleActivate]
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule),
        canActivate: [ModuleActivate], data: { breadcrumb: '账号管理' },
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(mod => mod.OrderModule),
        canActivate: [ModuleActivate], data: { breadcrumb: '订单管理' },
      },
      {
        path: 'merchant',
        loadChildren: () => import('./merchant/merchant.module').then(mod => mod.MerchantModule),
        canActivate: [ModuleActivate], data: { breadcrumb: '商户管理' },
      },
      {
        path: 'recharge-order',
        loadChildren: () => import('./recharge-order/recharge-order.module').then(mod => mod.RechargeOrderModule),
        canActivate: [ModuleActivate], data: { breadcrumb: '充值订单' }
      }
    ]
  },
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: '', loadChildren: () => import('./passport-module/passport-module.module').then(mod => mod.PassportModuleModule), pathMatch: 'full', data: { title: '登录' } },
      { path: 'login', loadChildren: () => import('./passport-module/passport-module.module').then(mod => mod.PassportModuleModule), data: { title: '登录' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ModulesRoutingModule { }
