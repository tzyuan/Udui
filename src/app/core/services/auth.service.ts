
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 这里假设用户的角色和权限信息已经存储在本地存储中
  private roles = ['admin', 'manager', 'user'];
  private permissions = {
    admin: ['admin', 'manager', 'user'],
    manager: ['manager', 'user'],
    user: ['user']
  };

  constructor() { }

  hasPermission(permission: string): boolean {
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      return false;
    }
    if (!this.roles.includes(userRole)) {
      return false;
    }
    // if ( !this.permissions[userRole].includes(permission)) {
    //   return false;
    // }

    return true;
  }
}
