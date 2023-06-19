import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-recharge-order-list',
    templateUrl: './recharge-order-list.component.html',
    styleUrls: ['./recharge-order-list.component.scss']
})
export class RechargeOrderListComponent implements OnInit {
    constructor(
        private http: HttpClient
    ) { }
        
    orderData = [];
    loading = false;
    getData = () => {
        this.http.get<any>(`/admin/recharge-orders?status=1`).subscribe({
            next: (res) => {
                this.orderData = res;
            }
        })
    }

    ngOnInit(): void {
        this.getData();
    }
}
