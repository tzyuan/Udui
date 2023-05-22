
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ... 其他需要的ng-zorro模块
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // NZ
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzTableModule,
    // ... 其他需要的ng-zorro模块
    NzDividerModule,
    NzSpaceModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzTableModule,
    // ... 其他需要的ng-zorro模块
    NzDividerModule,
    NzSpaceModule,
  ]
})
export class NzModule { }
