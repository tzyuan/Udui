import { NgModule } from '@angular/core';
import { LayoutDefaultComponent } from './default/default.component';
import { LayoutDefaultHeaderComponent } from './default/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutPassportComponent } from './passport/passport.component';
import { LayoutDefaultSidebarComponent } from './default/sidebar/sidebar.component';

const COMPONENTS = [
  LayoutDefaultComponent,
  LayoutDefaultHeaderComponent,
  LayoutPassportComponent,
  LayoutDefaultSidebarComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS
  ],
  imports: [
    SharedModule,
  ]
})
export class LayoutModule { }
