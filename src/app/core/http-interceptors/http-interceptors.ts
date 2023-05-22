
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // 在请求头中添加token
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // 打印请求的URL和参数
    console.log(`HTTP Request: ${request.method} ${request.url}`);
    console.log(`HTTP Request Body: ${JSON.stringify(request.body)}`);

    // 继续处理请求
    return next.handle(request);
  }
}
