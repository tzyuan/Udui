/*
 * @Date: 2019-05-31 09:46:54
 * @LastAuthor: 曹雪原
 * @lastTime: 2020-12-15 11:00:34
 */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private cookies: CookiesService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = this.cookies.getCookie('token');
    if (token) {
      return true;
    }
    this.router.navigateByUrl('/passport/login');
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ModuleActivate implements CanActivate {
  constructor(
    private cookies: CookiesService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const menu = {
      '/home': [],
      '/system': '233',
      '/account-checking': '233',
      '/account': '233',
      '/pay': '233'
    };
    return true;
  }
}
