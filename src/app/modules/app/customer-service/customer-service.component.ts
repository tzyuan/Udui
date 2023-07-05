import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.scss']
})
export class CustomerServiceComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private message: NzMessageService,
  ) { }
  kefu = '';
  one_code = '';
  loading = false;

  submit = () => {
    this.loading = true;
    this.http.post('/admin/conf/ke-fu-edit', {
      url: this.kefu,
      one_code: this.one_code
    }).subscribe(res => {
      this.loading = false;
      this.one_code = '';
    })
  }

  canSubmit = () => {
    return (this.kefu.trim() == '' || this.one_code.trim() == '')
  }

  ngOnInit(): void {
    this.loading = true;
    this.http.get<any>('/admin/conf/ke-fu').subscribe(res => {
      this.loading = false;
      this.kefu = res.attr1;
      this.one_code = '';
    })

  }
}
