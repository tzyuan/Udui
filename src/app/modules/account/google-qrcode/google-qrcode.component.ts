import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-qrcode',
  templateUrl: './google-qrcode.component.html',
  styleUrls: ['./google-qrcode.component.scss']
})
export class GoogleQrcodeComponent implements OnInit {
  @Input() one_code = '';
  google_img = '';
  google_code = '';
  loading = true;
  constructor(
    private http: HttpClient,
  ) {
  }
  ngOnInit(): void {
    this.http.post<any>(`/admin/user/get-qr-code-url`, { one_code: this.one_code }).subscribe(res => {
      this.google_img = res.qr_code_url;
      this.loading = false;
    })
  }

}
