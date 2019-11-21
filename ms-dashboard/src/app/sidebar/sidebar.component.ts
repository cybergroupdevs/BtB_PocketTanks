import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    // How do we want to use the components.
    //  Do we need separate components for 3 medias or just one?
    { path: '/dashboard/twitter',     title: 'Twitter',         icon:'fa fa-twitter',       class: '' },
    { path: '/dashboard/facebook',     title: 'Facebook',         icon:'fa fa-facebook',       class: '' },
    { path: '/dashboard/instagram',     title: 'Instagram',         icon:'fa fa-instagram',       class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-icon nc-single-02',  class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
