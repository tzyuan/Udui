import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { BannerSettingComponent } from './banner-setting/banner-setting.component';

const routes: Routes = [
  { path: 'user-list', component: UserListComponent, data: { breadcrumb: 'APP用户' } },
  { path: 'customer-service', component: CustomerServiceComponent, data: { breadcrumb: '客服设置' } },
  { path: 'banner-setting', component: BannerSettingComponent, data: { breadcrumb: 'Banner公告' } }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
