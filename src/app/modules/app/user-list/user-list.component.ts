import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  constructor(
    private http: HttpClient
  ) { }
  appUserData: any[] = [];
  loading = false;
  sort = '';
  page = {
    index: 1,
    size: 20,
    total: 0
  }
  searchData = {
    username: ''
  }
  balanceSortChange = (e: any) => {
    if (e === 'ascend') { this.sort = 'asc'; }
    if (e === 'descend') { this.sort = 'desc'; }
    if (e === null) { this.sort = ''; }
    this.getData();
  }
  resetSearch = () => {
    this.searchData = {
      username: '',
    }
  }
  search = () => {
    this.page.index = 1;
    this.getData();
  }
  pageIndexChange = (e: any) => {
    this.page.index = e;
    this.getData();
  }
  getData = () => {
    let params: any = {
      page: this.page.index
    }
    if (this.sort != '') {
      params.sort = this.sort;
    }

    if (this.searchData.username.trim() != '') {
      params.username = this.searchData.username.trim();
    }

    this.loading = true;
    this.http.get<any>('/admin/app-users', { params }).subscribe(res => {
      this.loading = false;
      this.appUserData = res.list;
      this.page.index = res.page;
      this.page.total = parseInt(res.count);
    })

  }
  ngOnInit(): void {
    this.getData();
  }
}
