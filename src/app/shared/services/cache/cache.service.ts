
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(
    private http: HttpClient
  ) { }

  getCache = (url: string): Observable<any> => {
    let d = sessionStorage.getItem(url);
    const time = sessionStorage.getItem(`${url}_endDate`);
    if (d !== null && time !== null) {
      if (moment().isAfter(moment(time))) {
        d = null;
        this.clearCache(url);
      }
    }
    // 判断是否超时
    return new Observable(obser => {
      if (d === null) {
        this.http.get<any>(url, { params: { limit: '0' } }).subscribe(res => {
          this.setCache(url, JSON.stringify(res));
          obser.next(res);
          obser.complete();
        });
      } else {
        obser.next(JSON.parse(d));
        obser.complete();
      }
    });
  }

  setCache = (key: string, data: string, time: number = 60) => {
    sessionStorage.setItem(key, data);
    sessionStorage.setItem(`${key}_endDate`, (moment().add(time, 'minutes').valueOf().toString()));
  }

  clearCache = (key: string) => {
    sessionStorage.removeItem(key);
    sessionStorage.removeItem(`${key}_endDate`);
  }
}
