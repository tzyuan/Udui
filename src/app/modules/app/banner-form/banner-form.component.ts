import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.scss']
})
export class BannerFormComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private drawerRef: NzDrawerRef<string>,
    private fb: FormBuilder
  ) { }

  bannerForm = this.fb.group({
    img_url: [null, [Validators.required]],
    content: [null, [Validators.required]],
  });
  fileList: any[] = [];

  _submitForm = () => {

  }
  ngOnInit(): void {

  }

}
