
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HttpClientModule } from '@angular/common/http';
import { NzModule } from 'src/app/shared/nz.module';

const routes: Routes = [
  { path: '', component: IndexComponent },
];


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    NzModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
