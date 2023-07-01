import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';
interface BankCard {
  id: number;
  account_name: string;
  bank_name: string;
  card_no: string;
  bank_address: string;
  status: number;
  merchant_id: string;
}
@Component({
  selector: 'app-bank-order-batch-bank-card',
  templateUrl: './bank-order-batch-bank-card.component.html',
  styleUrls: ['./bank-order-batch-bank-card.component.scss']
})
export class BankOrderBatchBankCardComponent implements OnInit {
  @Input() orderData: any[] = [];
  bankCardData: BankCard[] = [];
  checked = false;
  loading = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  role = this.cookies.getCookie('role');
  constructor(
    private http: HttpClient,
    private cookies: CookiesService,
  ) { }
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  refreshCheckedStatus(): void {
    const listOfEnabledData = this.bankCardData
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }
  onAllChecked(checked: boolean): void {
    this.bankCardData
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    console.log(this.setOfCheckedId)
    this.refreshCheckedStatus();
  }

  ngOnInit(): void {
    this.loading = true;
    this.http.get<BankCard[]>('/admin/bank-cards').subscribe({
      next: (res: BankCard[]) => {
        this.loading = false;
        if (this.role == '0') {

        }
        this.bankCardData = res.filter(item => item.status == 1 && item.merchant_id == this.role)
      },
      error: (err) => {
        this.loading = false;

      }
    })
    // for (let i = 0; i < 33; i++) {
    //   this.bankCardData = [...this.bankCardData, {
    //     id: parseInt((Math.random() * 100000).toFixed(0)),
    //     bank_name: ['建设银行', '中国银行', '工商银行', '农业银行'][parseInt((Math.random() * 4).toFixed())],
    //     bank_address: `上海市黄浦区xxxx街xxxx号`,
    //     card_no: (Math.random() * 100000000).toFixed(0),
    //     account_name: `!@#$%@#!$`
    //   }]
    // }
  }
}
