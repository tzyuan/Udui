/*
 * @Date: 2019-05-31 13:28:52
 * @LastAuthor: 曹雪原
 * @lastTime: 2019-12-03 15:27:19
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor() { }

  /**
   * 根据key值获取cookie
   */
  getCookie = (name: string): string => {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    const arr = document.cookie.match(reg);
    if (arr && arr.length > 1) {
      this.setCookie(name, arr[2]);
      return arr[2];
    } else {
      return '';
    }
  }


  /**
   * 添加cookies
   * @param name key
   * @param value 值
   * @param time 过期时间(单位:小时)
   */
  setCookie = (name: string, value: string | number, time: number = 1): void => {
    // 获取当前时间
    const date = new Date();
    // 将date设置为n天以后的时间
    const expiresDays = time;
    // 格式化为cookie识别的时间
    date.setTime(date.getTime() + expiresDays * 3600 * 1000);
    // 设置cookie
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;`;
  }


  /**
   * 根据key值删除cookie
   */
  delCookie = (name: string) => {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const d = new Date();
    d.setTime(d.getTime() + (-1 * 24 * 60 * 60 * 1000));
    const cval = this.getCookie(name);
    if (cval != null) {
      document.cookie = name + '=;expires=' + d.toUTCString();
    }
  }

  /**
   * 清除所有cookies
   */
  clearAll = () => {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);

    if (keys) {
      for (var i = keys.length; i--;) {
        this.setCookie(keys[i], '', 0);
      }
    }
  }
}
