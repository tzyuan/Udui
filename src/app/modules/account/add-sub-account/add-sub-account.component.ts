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
    role: [this.permissionData],
    merchant_id: ['0', [Validators.required]],
  })
  ngOnInit(): void {
    this.form.get('role')?.setValue(this.permissionData);
  }
}
