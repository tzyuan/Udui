import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-account',
  templateUrl: './sub-account.component.html',
  styleUrls: ['./sub-account.component.scss']
})
export class SubAccountComponent implements OnInit {
  subAccount = '';
  subName = '';
  subAaccountData: any = [];
  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      this.subAaccountData = [...this.subAaccountData, {
        subAccount: '子账号' + Number(Math.random() * 100000).toFixed(0),
        subName: '昵称' + Number(Math.random() * 100000).toFixed(0),
        lastLogin: '2023-05-05 00:00:00'
      }]

    }
  }
}
