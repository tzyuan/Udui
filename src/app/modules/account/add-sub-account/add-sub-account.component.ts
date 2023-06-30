import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';

@Component({
  selector: 'app-add-sub-account',
  templateUrl: './add-sub-account.component.html',
  styleUrls: ['./add-sub-account.component.scss']
})
export class AddSubAccountComponent implements OnInit {
  @Input() permissionData: { label: string, value: string, checked: boolean }[] = [];
  constructor(
    private fb: FormBuilder,
    private cookies: CookiesService,

  ) { }
  merchant_id = this.cookies.getCookie('merchant_id');
  form = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    role: [3, [Validators.required]],
    merchant_id: [this.merchant_id],
  });
  ngOnInit(): void {
    // this.form.get('role')?.setValue(this.permissionData);
  }
}
