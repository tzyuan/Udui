import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sub-account',
  templateUrl: './add-sub-account.component.html',
  styleUrls: ['./add-sub-account.component.scss']
})
export class AddSubAccountComponent implements OnInit {
  @Input() permissionData: { label: string, value: string, checked: boolean }[] = [];
  constructor(
    private fb: FormBuilder
  ) { }
  form = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    role: [null, [Validators.required]],
    merchant_id: [null],
  });
  ngOnInit(): void {
    // this.form.get('role')?.setValue(this.permissionData);
  }
}
