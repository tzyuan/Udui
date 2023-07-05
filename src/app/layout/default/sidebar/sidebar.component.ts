
interface sidebar {
  level: number;
  title: string;
  icon?: string;
  open?: boolean;
  selected?: boolean;
  disabled?: boolean;
  url?: string,
  children?: sidebar[]
}

import { Component, Injector, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout/layout.service';
import { NzIconService } from 'ng-zorro-antd/icon';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Params, Router } from '@angular/router';
import { Subject, filter, startWith, takeUntil } from 'rxjs';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';
export interface BreadcrumbOption {
  label: string;
  params: Params;
  url: string;
}
@Component({
  selector: 'app-layout-default-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class LayoutDefaultSidebarComponent implements OnInit {
  isCollapsed = this.layout.isCollapsed;
  // sidebarData: sidebar[] = [
  //   {
  //     level: 1,
  //     title: '修改密码',
  //     open: false,
  //     selected: false,
  //     disabled: false,
  //     url: '/account/reset-password'
  //   },
  //   {
  //     level: 1,
  //     title: '修改出款密码',
  //     selected: false,
  //     disabled: false,
  //     url: '/account/reset-pay-password'
  //   },
  //   {
  //     level: 1,
  //     title: '账号管理',
  //     selected: false,
  //     disabled: false,
  //     url: '/account/sub-account'
  //   },
  //   {
  //     level: 1,
  //     title: '邀请码管理',
  //     selected: false,
  //     disabled: false,
  //     url: '/account/invite-code'
  //   },
  //   {
  //     level: 1,
  //     title: '资金类型',
  //     selected: false,
  //     disabled: false,
  //     url: '/order/fund-type-setting'
  //   },
  //   {
  //     level: 1,
  //     title: '银行卡管理',
  //     open: false,
  //     selected: false,
  //     disabled: false,
  //     url: '/order/bank-card'
  //   },
  //   {
  //     level: 1,
  //     title: '银行卡订单',
  //     open: false,
  //     selected: false,
  //     disabled: false,
  //     url: '/order/bank-order'
  //   },
  //   {
  //     level: 1,
  //     title: '提现订单',
  //     selected: false,
  //     disabled: false,
  //     url: '/order/withdrawal-order'
  //   },
  //   {
  //     level: 1,
  //     title: '充值订单列表',
  //     selected: false,
  //     disabled: false,
  //     url: '/recharge-order/list'
  //   }

  // ];
  showSidebarData: sidebar[] = [];
  sidebarData: sidebar[] = [
    {
      level: 1,
      title: '账号管理',
      icon: 'bars',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: '修改密码',
          open: false,
          selected: false,
          disabled: false,
          url: '/account/reset-password'
        },
        // {
        //   level: 2,
        //   title: '修改出款密码',
        //   selected: false,
        //   disabled: false,
        //   url: '/account/reset-pay-password'
        // },
        {
          level: 2,
          title: '账号管理',
          selected: false,
          disabled: false,
          url: '/account/sub-account'
        },
        {
          level: 2,
          title: '邀请码管理',
          selected: false,
          disabled: false,
          url: '/account/invite-code'
        },

      ]
    }, {
      level: 1,
      title: '订单管理',
      icon: 'bars',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: '资金类型',
          selected: false,
          disabled: false,
          url: '/order/fund-type-setting'
        },
        {
          level: 2,
          title: '银行卡管理',
          open: false,
          selected: false,
          disabled: false,
          url: '/order/bank-card'
        },
        {
          level: 2,
          title: '银行卡订单',
          open: false,
          selected: false,
          disabled: false,
          url: '/order/bank-order'
        }, {
          level: 2,
          title: '充值订单',
          selected: false,
          disabled: false,
          url: '/recharge-order/list'
        },
        {
          level: 2,
          title: '提现订单',
          selected: false,
          disabled: false,
          url: '/order/withdrawal-order'
        }
      ]
    }, {
      level: 1,
      title: 'APP管理',
      icon: 'bars',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'APP用户',
          selected: false,
          disabled: false,
          url: '/app/user-list'
        },
        {
          level: 2,
          title: '客服设置',
          selected: false,
          disabled: false,
          url: '/app/customer-service'
        },
        {
          level: 2,
          title: 'Banner公告',
          selected: false,
          disabled: false,
          url: '/app/banner-setting'
        }
      ]
    }
  ];
  private destroy$ = new Subject<void>();
  constructor(
    private layout: LayoutService,
    private injector: Injector,
    private cookies: CookiesService
  ) {

  }
  ngOnInit() {
    try {
      const router = this.injector.get(Router);
      const activatedRoute = this.injector.get(ActivatedRoute);
      router.events
        .pipe(
          filter(e => e instanceof NavigationEnd),
          takeUntil(this.destroy$),
          startWith(true) // trigger initial render
        )
        .subscribe(() => {
          const breadcrumbs = this.getBreadcrumbs(activatedRoute.root);
          if (breadcrumbs[breadcrumbs.length - 1]) {
            const activatedUrl = breadcrumbs[breadcrumbs.length - 1].url;
            this.sidebarData.forEach(item => {
              if (item.children) {
                if (item.children.filter(menu => menu.url === activatedUrl).length === 1) {
                  item.open = true;
                }
              }
            })
          }
        });
    } catch (error) {

    }
    if (this.cookies.getCookie('permission')) {
      const permission = JSON.parse(this.cookies.getCookie('permission'));
      this.sidebarData.forEach(item => {
        console.log(item.title)
        item.children = item.children?.filter(chil => permission.includes(chil.url));
      });
      this.showSidebarData = this.sidebarData.filter(item => item.children && item.children?.length > 0);
    } else {
      this.showSidebarData = this.sidebarData;
    }

  }

  private getBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbOption[] = []
  ): BreadcrumbOption[] {
    const children: ActivatedRoute[] = route.children;

    // If there's no sub root, then stop the recurse and returns the generated breadcrumbs.
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet === PRIMARY_OUTLET) {
        // Only parse components in primary router-outlet (in another word, router-outlet without a specific name).
        // Parse this layer and generate a breadcrumb item.
        const routeUrl: string = child.snapshot.url
          .map(segment => segment.path)
          .filter(path => path)
          .join('/');

        // Do not change nextUrl if routeUrl is falsy. This happens when it's a route lazy loading other modules.
        const nextUrl = routeUrl ? `${url}/${routeUrl}` : url;
        const breadcrumbLabel = child.snapshot.data['breadcrumb']

        // If have data, go to generate a breadcrumb for it.
        if (routeUrl && breadcrumbLabel) {
          const breadcrumb: BreadcrumbOption = {
            label: breadcrumbLabel,
            params: child.snapshot.params,
            url: nextUrl
          };
          breadcrumbs.push(breadcrumb);
        }

        return this.getBreadcrumbs(child, nextUrl, breadcrumbs);
      }
    }

    return breadcrumbs;
  }

}
