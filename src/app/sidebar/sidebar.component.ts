import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Dashboard',  icon: '', class: '' },
    { path: '/accounts', title: 'Accounts',  icon:'', class: '' },
    // { path: '/owner', title: 'Owners',  icon:'', class: '' },
    { path: '/store', title: 'Stores',  icon:'', class: '' }
    // { path: '/table', title: 'Table List',  icon:'', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'', class: '' },
    // { path: '/maps', title: 'Owner',  icon:'', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
