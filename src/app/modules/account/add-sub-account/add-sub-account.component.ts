import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';

@Component({
  selector: 'app-add-sub-account',
  templateUrl: './add-sub-account.component.html',
  styleUrls: ['./add-sub-account.component.scss']
})
export class AddSubAccountComponent implements OnInit {
  @Input() permissionData: any[] = [];
  @Input() isEdit = false;
  @Input() adminInfo: any = null;
  constructor(
    private fb: FormBuilder,
    private common: CommonService,
    private cookies: CookiesService,

  ) { }
  isMerchant = this.common.isMerchant();
  form = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    role: [3, [Validators.required]]
  });
  ngOnInit(): void {
    if (this.isEdit) {
      this.form.get('username')?.disable();
      this.form.get('password')?.disable();
      this.form.get('role')?.disable();

      if (this.adminInfo && this.adminInfo.permission) {
        const permission = this.adminInfo.permission.split(',');
        this.permissionData = this.permissionData.map(item => {
          console.log(permission,item.value)
          item.checked = permission.includes(item.value.toString());
          return item;
        })
      } else {

      }
    }

    // this.form.get('role')?.setValue(this.permissionData);
  }
}
