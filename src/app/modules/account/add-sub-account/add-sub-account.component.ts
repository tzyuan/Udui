import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-add-sub-account',
  templateUrl: './add-sub-account.component.html',
  styleUrls: ['./add-sub-account.component.scss']
})
export class AddSubAccountComponent implements OnInit {
  @Input() permissionData: { label: string, value: string, checked: boolean }[] = [];
  constructor(
    private fb: FormBuilder,
    private common: CommonService,

  ) { }
  isMerchant = this.common.isMerchant();
  form = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    role: [3, [Validators.required]]
  });
  ngOnInit(): void {
    // this.form.get('role')?.setValue(this.permissionData);
  }
}
