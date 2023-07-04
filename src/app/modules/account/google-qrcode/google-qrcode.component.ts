import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-google-qrcode',
  templateUrl: './google-qrcode.component.html',
  styleUrls: ['./google-qrcode.component.scss']
})
export class GoogleQrcodeComponent {
  google_img = '';
  google_code = '';
  loading = true;
  constructor(
    private http: HttpClient,
  ) {
    http.get<any>(`/admin/user/get-qr-code-url`).subscribe(res => {
      this.google_img = res.qr_code_url;
      this.loading = false;
    })
  }
}
