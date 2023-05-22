
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemModuleRoutingModule } from './system-module-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    SystemModuleRoutingModule
  ]
})
export class SystemModule { }
