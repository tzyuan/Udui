
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookiesService } from '../cookies/cookies.service';
import { FormGroup } from '@angular/forms';
import { CacheService } from '../cache/cache.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  constructor(
    private http: HttpClient,
    private cookies: CookiesService,
    private cache: CacheService,
    private router: Router,
    private locationStrategy: LocationStrategy
  ) { }

  // form 验证
  formValid = (validateForm: FormGroup) => {
    Object.keys(validateForm.controls).map((key, item) => {
      validateForm.controls[key].markAsDirty();
      validateForm.controls[key].updateValueAndValidity();
    });
    return validateForm.valid;
  }

  // 多图片分隔
  imgSeparate = (imgData: string, url = `${environment.SERVER_URL}`) => {
    const img = imgData.split(',');
    return img.map((item, index) => {
      const label = index > 0 ? `，${item}` : item;
      return { value: `${url}/../upload/point/${item}`, label };
    });
  }

  // 去除字符串最后一个逗号,type=true，过滤相同的字符串
  deleteStringComma = (value = '', type = false) => {
    let data = '';
    value = value.replace(/(.*)[,，||:：]$/, '$1');
    if (type) {
      Array.from(new Set(value.split(','))).forEach((element) => {
        data += `${element},`;
      });
      data = data.replace(/(.*)[,，]$/, '$1');
    } else {
      data = value;
    }
    return data;
  }

  /**
   * @description:  图片路径转换为fileLIst数据
   * @param a = '/a/a.png,b/b.png'
   * @return: [{url:'',name:''}]
   */
  imgDataTransFileList = (
    imgData: string,
    url = ``,
    model = 'file'
  ) => {
    return imgData.split(/,|，|;|；|\s+/).map((item, index) => {
      const name = this.getImgName(item);
      return {
        url: `${url}/${model}/${item}`,
        name,
        status: 'done',
        uid: `${name}_${index}`,
      };
    });
  }

  /**
   * @description: 根据图片保存路径获取图片名称
   * @param a = 'a/a.png'
   * @return: a.png
   */
  getImgName = (imgData: string) => {
    const img = imgData.split('/');
    return img[img.length - 1];
  }


  // 根据角色进行Tabs组件粒度权限控制
  isTabsAuth = (roleList: string[]) => {
    const isRole = (roleValue: string) => {
      return this.cookies.getCookie('roleId').indexOf(roleValue) > -1
        ? true
        : false;
    };
    // 26487 开发人员  , 即是提交人，又是审核人已202222角色为准
    if (isRole('26487') || isRole('202222')) {
      return 'all';
    }
    // 如果存在是申请人
    if (roleList.some((item) => isRole(item))) {
      return 'apply';
    }
    return 'examine';
  }

  /**
   * @description: 添加文件上传的头部
   * @param: {type} null
   * @return: void | object
   */
  fileHeader = () =>
    this.cookies.getCookie('sign') || this.cookies.getCookie('uuid')
      ? null
      : new Object({
        Authorization: this.cookies.getCookie('sign'),
        UUID: this.cookies.getCookie('uuid'),
      })
}
