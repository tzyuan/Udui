import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RechargeOrderListComponent } from './recharge-order-list/recharge-order-list.component';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: RechargeOrderListComponent, data: { breadcrumb: '充值订单列表' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RechargeOrderRoutingModule implements OnInit {

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit(): void {
    
  }
}
