import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { UserListComponent } from './user-list/user-list.component';
import { BannerSettingComponent } from './banner-setting/banner-setting.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CustomerServiceComponent,
    UserListComponent,
    BannerSettingComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ]
})
export class AppModule { }
