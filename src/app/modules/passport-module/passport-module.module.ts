import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassportModuleRoutingModule } from './passport-module-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    PassportModuleRoutingModule
  ]
})
export class PassportModuleModule { }
