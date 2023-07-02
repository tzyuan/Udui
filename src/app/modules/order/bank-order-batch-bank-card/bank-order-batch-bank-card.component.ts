import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { CommonService } from 'src/app/shared/services/common/common.service';
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
  isMerchant = this.common.isMerchant();
  constructor(
    private http: HttpClient,
    private common: CommonService,
    private drawerRef: NzDrawerRef<string>
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
    this.setOfCheckedId.clear()
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
   

  }
  onAllChecked(checked: boolean): void {
    this.bankCardData
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    console.log(this.setOfCheckedId)
    this.refreshCheckedStatus();
  }
  select = (data: any) => {
    this.drawerRef.close({
      data
    })
  }

  ngOnInit(): void {
    this.loading = true;
    this.http.get<BankCard[]>('/admin/bank-card/retrieve').subscribe({
      next: (res: BankCard[]) => {
        this.loading = false;
        this.bankCardData = res;
      },
      error: (err) => {
        this.loading = false;

      }
    })
  }
}
